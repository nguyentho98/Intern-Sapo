package com.sapo.qlgiaohang.services.impl;

import com.sapo.qlgiaohang.dto.acounting.*;
import com.sapo.qlgiaohang.entity.AccountingEntity;
import com.sapo.qlgiaohang.entity.CustomerEntity;
import com.sapo.qlgiaohang.entity.FulfillmentEntity;
import com.sapo.qlgiaohang.entity.tracking.AccountingHistoryEntity;
import com.sapo.qlgiaohang.exception.NotFoundException;
import com.sapo.qlgiaohang.repositoties.CustomerRepository;
import com.sapo.qlgiaohang.repositoties.FulfillmentRepository;
import com.sapo.qlgiaohang.repositoties.accounting.AccountingRepository;
import com.sapo.qlgiaohang.repositoties.accounting.CustomerForAccountingRepository;
import com.sapo.qlgiaohang.repositoties.history.AccountingHistoryRepository;
import com.sapo.qlgiaohang.services.AccountingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import utils.ConvertCode;

import javax.persistence.LockModeType;
import java.math.BigDecimal;
import java.util.*;

@Service
public class AccountingServiceImpl implements AccountingService {
    private AccountingRepository accountingRepository;
    private CustomerRepository customerRepository;
    private FulfillmentRepository fulfillmentRepository;
    private AccountingHistoryRepository accountingHistoryRepository;
    private CustomerForAccountingRepository customerForAccountingRepository;
    private Long codeMax;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public AccountingServiceImpl(AccountingRepository accountingRepository, CustomerRepository customerRepository, FulfillmentRepository fulfillmentRepository, AccountingHistoryRepository accountingHistoryRepository, CustomerForAccountingRepository customerForAccountingRepository) {
        try {
            this.accountingRepository = accountingRepository;
            this.customerRepository = customerRepository;
            this.fulfillmentRepository = fulfillmentRepository;
            this.accountingHistoryRepository = accountingHistoryRepository;
            this.customerForAccountingRepository = customerForAccountingRepository;
        } finally {
            codeMax = accountingRepository.getCodeAccountingMax();
            if (codeMax == null) {
                codeMax = 0L;
            }
        }
    }

    @Override
    public AccountingResponse findAllAccounting(int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        return new AccountingResponse(accountingRepository.findAllWithPage(pageable), accountingRepository.count());
    }

    @Override
    public AccountingDTOResponse findOne(Long id, int page) {
        AccountingDTOResponse accountingDTO = customerForAccountingRepository.findOneAccounting(id);
        accountingDTO.setFulfillment(customerForAccountingRepository.getFulfillmentForAccounting(accountingDTO.getId(), ((page - 1) * 5)));
        accountingDTO.setCustomer(customerForAccountingRepository.getCustomerForAccounting(accountingDTO.getCustomerId()));
        return accountingDTO;
    }

    @Transactional
    @Override
    public AccountingEntity save(AccountingDTO accountingDTO) {
        BigDecimal moneyForCustomer = new BigDecimal(0);
        BigDecimal transportFee = new BigDecimal(0);
        AccountingEntity accountingEntity = new AccountingEntity();
        CustomerEntity customerEntity = customerRepository.findOneCustom(accountingDTO.getCustomer());
        if (customerEntity == null) {
            throw new NotFoundException("Không tìm thấy khách hàng!!!");
        }
        List<FulfillmentEntity> fulfillmentEntities = new ArrayList<>();
        if (!customerEntity.getFulfillmentEntities().isEmpty()) {
            // lấy những phiếu giao chưa đối soát của khách hàng
            for (FulfillmentEntity fulfillmentEntity : customerEntity.getFulfillmentEntities()) {
                if (fulfillmentEntity.getAccountingStatus() == 0 && fulfillmentEntity.getPaymentStatus() == 1 && fulfillmentEntity.getAccountingEntity() == null) {
                    fulfillmentEntity.setAccountingStatus(1);
                    if (fulfillmentEntity.getShippingPaymentObject() == 0) {
                        moneyForCustomer = moneyForCustomer.add(fulfillmentEntity.getCodMoney());
                    } else {
                        moneyForCustomer = moneyForCustomer.add(fulfillmentEntity.getCodMoney().subtract(fulfillmentEntity.getTransportFee()));
                    }
                    fulfillmentEntity.setAccountingStatus(0);
                    transportFee = transportFee.add(fulfillmentEntity.getTransportFee());
                    fulfillmentEntity.setAccountingEntity(accountingEntity);
                    fulfillmentEntities.add(fulfillmentEntity);
                    fulfillmentRepository.save(fulfillmentEntity);
                }
            }
        }
        if (!fulfillmentEntities.isEmpty()) {
            if (ConvertCode.convertCode(codeMax, accountingDTO.getCode(), "DSKH").startsWith("DSKH")) {
                codeMax += 1;
            }
            accountingEntity.setCode(ConvertCode.convertCode(codeMax, accountingDTO.getCode(), "DSKH"));
            accountingEntity.setStatus(false);
            accountingEntity.setCustomerName(customerEntity.getName());
            accountingEntity.setNumberOfFulfillment((long) fulfillmentEntities.size());
            accountingEntity.setMoneyPaid(new BigDecimal(0));
            accountingEntity.setPaymentStatus(0);
            accountingEntity.setIsActive(true);
            accountingEntity.setMoneyForCustomers(moneyForCustomer);
            accountingEntity.setTransportFee(transportFee);
            accountingEntity.setMaker(accountingDTO.getUserName());
            accountingEntity.setCreatedOn(new Date().getTime());
            accountingEntity.setDescription(accountingDTO.getDescription());
            accountingEntity.setCustomerEntity(customerEntity);
            accountingRepository.save(accountingEntity);
            saveHistory(accountingDTO.getUserName(), "Tạo phiếu thành công", "Tạo phiếu", accountingEntity);
        }
        return accountingEntity;
    }

    @Transactional
    @Override
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    public AccountingEntity update(AccountingDTO accountingDTO, Long id, int status) {
        AccountingEntity accountingEntity = accountingRepository.findOneCustom(id);
        if (status == 1) {
            if (!accountingEntity.getStatus() && accountingEntity.getIsActive()) {
                accountSuccess(accountingEntity, accountingDTO);
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Không thể đối soát phiếu " + accountingEntity.getCode() + ".");
            }
        }
        if (status == 2) {
            String paymentMethod = paymentMethodString(accountingDTO);
            updateAccounting(accountingEntity, accountingDTO, paymentMethod);
        }
        if (status == 3) {
            accountingEntity.setDescription(accountingDTO.getDescription());
        }
        if (status != 1 && status != 2 && status != 3) {
            throw new NotFoundException("chọn sai yêu cầu !!!");
        }
        accountingRepository.save(accountingEntity);
        return accountingEntity;
    }

    @Override
    public Map<String, Object> getCustomerForAccounting(String value, int page) {
        String value1 = "%" + value + "%";
        List<CustomerAccountingDTO> list = customerForAccountingRepository.getAllCustomForAccounting(value1, page);
        Long total = customerForAccountingRepository.getTotalCustomers(value1);
        Map<String, Object> map = new HashMap<>();
        map.put("customers", list);
        map.put("total", total);
        return map;
    }

    @Override
    public Map<String, Object> getTotalDebtToPay(long customerId) {
        BigDecimal totalDebtToPay = new BigDecimal(0);
        BigDecimal totalCod = new BigDecimal(0);
        BigDecimal shopFee = new BigDecimal(0);
        BigDecimal receiverFee = new BigDecimal(0);
        List<DebtToPayDTO> list = customerForAccountingRepository.getTotalDebtToPay(customerId);
        for (DebtToPayDTO debtToPayDTO : list) {
            totalCod = totalCod.add(debtToPayDTO.getTotalCod());
            if (debtToPayDTO.getPersonPayShip() == 0) {
                receiverFee = receiverFee.add(debtToPayDTO.getTotalTransportFee());
                totalDebtToPay = totalDebtToPay.add(debtToPayDTO.getTotalCod());
            } else {
                shopFee = shopFee.add(debtToPayDTO.getTotalTransportFee());
                totalDebtToPay = totalDebtToPay.add(debtToPayDTO.getTotalCod().
                        subtract(debtToPayDTO.getTotalTransportFee()));
            }
        }
        Long total = customerForAccountingRepository.getTotalFulfillment(customerId);
        BigDecimal totalDebtAccounting = customerForAccountingRepository.getTotalDebtAccounting(customerId);
        if (totalDebtAccounting != null) {
            totalDebtToPay = totalDebtToPay.add(totalDebtAccounting);
        }
        Map<String, Object> map = new HashMap<>();
        map.put("totalDebtToPay", totalDebtToPay);
        map.put("totalFulfillment", total);
        map.put("shopFee", shopFee);
        map.put("receiverFee", receiverFee);
        map.put("totalCod", totalCod);
        return map;
    }

    @Override
    public List<FulfillmentAccountingDTO> getFulfillment(long customerId, int page) {
        try {
            List<FulfillmentAccountingDTO> list = customerForAccountingRepository.getFulfillment(customerId, page);
            return list;
        } catch (BadSqlGrammarException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Lỗi server");
        }
    }

    @Override
    public List<AccountingHistoryEntity> findHistoryByAccounting(Long id) {
        return accountingHistoryRepository.findHistoryByAccounting(id);
    }

    @Transactional
    @Override
    public Long cancelAccounting(Long id, String userName) {
        AccountingEntity accountingEntity = accountingRepository.findOneCustom(id);
        if (accountingEntity == null || !accountingEntity.getIsActive()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không có phiếu giao này.");
        }
        if (accountingEntity.getStatus()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Phiếu giao đã được đối soát.");
        }
        for (FulfillmentEntity fulfillmentEntity : accountingEntity.getFulfillmentEntities()) {
            fulfillmentEntity.setAccountingStatus(0);
            fulfillmentEntity.setAccountingEntity(null);
            fulfillmentRepository.save(fulfillmentEntity);
        }
        accountingEntity.setIsActive(false);
        accountingEntity.setMoneyForCustomers(new BigDecimal(0));
        saveHistory(userName,  "Hủy phiếu thành công","Hủy phiếu", accountingEntity);
        accountingRepository.save(accountingEntity);
        return 1L;
    }

    private void saveHistory(String userName, String function, String action, AccountingEntity accountingEntity) {
        AccountingHistoryEntity accountingHistoryEntity = new AccountingHistoryEntity();
        accountingHistoryEntity.setOperator(userName);
        accountingHistoryEntity.setFunctions(function);
        accountingHistoryEntity.setAccountingEntity(accountingEntity);
        accountingHistoryEntity.setAction(action);
        accountingHistoryEntity.setCreatedOn(new Date().getTime());
        accountingHistoryRepository.save(accountingHistoryEntity);
    }

    private String paymentMethodString(AccountingDTO accountingDTO) {
        String paymentMethod = "";
        if (accountingDTO.getPaymentMethod() == 1) {
            paymentMethod = "Chuyển khoản";
        }
        if (accountingDTO.getPaymentMethod() == 0) {
            paymentMethod = "Tiền mặt";
        }
        return paymentMethod;
    }

    private void accountSuccess(AccountingEntity accountingEntity, AccountingDTO accountingDTO) {
        if (!accountingEntity.getStatus()) {
            accountingEntity.setStatus(true);
            accountingEntity.setPaymentStatus(0);
            for (FulfillmentEntity fulfillmentEntity : accountingEntity.getFulfillmentEntities()) {
                fulfillmentEntity.setAccountingStatus(1);
                fulfillmentRepository.save(fulfillmentEntity);
            }
            accountingEntity.setUpdatedOn(new Date().getTime());
            saveHistory(accountingDTO.getUserName(), "Đối soát thành công", "Đối soát", accountingEntity);
        }
    }

    private void updateAccounting(AccountingEntity accountingEntity, AccountingDTO accountingDTO, String paymentMethod) {
        if (accountingEntity.getStatus()) {
            if (accountingEntity.getPaymentStatus() != 2) {
                if (accountingDTO.getMoneyPaid().compareTo(new BigDecimal(0)) <= 0) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tiền thanh toán phải lớn hơn 0.");
                }
                int checkMoney = accountingDTO.getMoneyPaid().add(accountingEntity.getMoneyPaid()).compareTo(accountingEntity.getMoneyForCustomers());
                if (checkMoney == 0) {
                    accountingEntity.setPaymentStatus(2);
                    accountingEntity.setMoneyPaid(accountingEntity.getMoneyPaid().add(accountingDTO.getMoneyPaid()));
                    saveHistory(accountingDTO.getUserName(), "Thanh toán " + accountingDTO.getMoneyPaid() +
                            " đồng  với phương thức thanh toán là " + paymentMethod, "Thanh toán", accountingEntity);
                } else if (checkMoney < 0) {
                    accountingEntity.setPaymentStatus(1);
                    accountingEntity.setMoneyPaid(accountingEntity.getMoneyPaid().add(accountingDTO.getMoneyPaid()));
                    saveHistory(accountingDTO.getUserName(), "Thanh toán " + accountingDTO.getMoneyPaid() +
                            " đồng  với phương thức thanh toán là " + paymentMethod, "Thanh toán", accountingEntity);
                } else {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tiền thanh toán không lớn hơn tiền đối soát!!!");
                }

            }
        } else {
            throw new NotFoundException("Phải hạch toán trước khi thanh toán!!!");
        }
    }

    private void checkPaymentStatus(AccountingEntity accountingEntity) {
        if (accountingEntity.getMoneyPaid()
                .compareTo(accountingEntity.getMoneyForCustomers()) < 0) {
            accountingEntity.setPaymentStatus(1);
        } else if (accountingEntity.getMoneyPaid()
                .compareTo(accountingEntity.getMoneyForCustomers()) == 0) {
            accountingEntity.setPaymentStatus(2);
        }
    }


    //
    @Scheduled(cron = "* 1 * * * ?")
    @Transactional
    public void createAccounting() {

        List<CustomerEntity> customerEntities = customerRepository.findAll();
        long count = 0;
        for (CustomerEntity customerEntity : customerEntities) {
            Long total = customerForAccountingRepository.getTotalFulfillment(customerEntity.getId());
            if (total > 0) {
                AccountingDTO accountingDTO = new AccountingDTO();
                accountingDTO.setCustomer(customerEntity.getId());
                accountingDTO.setUserName("Hệ Thống");
                codeMax += 1;
                accountingDTO.setCode(ConvertCode.convertCode(codeMax, accountingDTO.getCode(), "DSKH"));

                save(accountingDTO);
                count += 1;
            }
        }
        if (count != 0) {
            Map<String, Object> map = new HashMap<>();
            map.put("path", "/admin/accounting");
            map.put("message", "Đã tạo " + count + " phiếu đối soát khách hàng!");
            simpMessagingTemplate.convertAndSend("/topic/group", map);
        }

    }
}
