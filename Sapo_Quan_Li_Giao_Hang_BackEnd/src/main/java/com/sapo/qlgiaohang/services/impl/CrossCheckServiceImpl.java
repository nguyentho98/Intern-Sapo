package com.sapo.qlgiaohang.services.impl;

import com.sapo.qlgiaohang.dto.acounting.DebtToPayDTO;
import com.sapo.qlgiaohang.dto.crosscheck.CrossCheckDTO;
import com.sapo.qlgiaohang.dto.crosscheck.FulfillmentCrossCheckDTO;
import com.sapo.qlgiaohang.entity.CrossCheckEntity;
import com.sapo.qlgiaohang.entity.FulfillmentEntity;
import com.sapo.qlgiaohang.entity.ShipperEntity;
import com.sapo.qlgiaohang.entity.tracking.CrossCheckHistoryEntity;
import com.sapo.qlgiaohang.exception.NotFoundException;
import com.sapo.qlgiaohang.repositoties.FulfillmentRepository;
import com.sapo.qlgiaohang.repositoties.ShipperRepository;
import com.sapo.qlgiaohang.repositoties.crosscheck.CrossCheckRepository;
import com.sapo.qlgiaohang.repositoties.crosscheck.JdbcCrossCheckRepository;
import com.sapo.qlgiaohang.repositoties.history.CrossCheckHistoryRepository;
import com.sapo.qlgiaohang.services.CrossCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import utils.ConvertCode;

import javax.persistence.LockModeType;
import java.math.BigDecimal;
import java.util.*;

@Service
public class CrossCheckServiceImpl implements CrossCheckService {
    private CrossCheckRepository crossCheckRepository;
    private JdbcCrossCheckRepository jdbc;
    private ShipperRepository shipperRepository;
    private FulfillmentRepository fulfillmentRepository;
    private CrossCheckHistoryRepository crossCheckHistoryRepository;
    private Long codeMax;

    @Autowired
    public CrossCheckServiceImpl(CrossCheckRepository crossCheckRepository, JdbcCrossCheckRepository jdbc, ShipperRepository shipperRepository, FulfillmentRepository fulfillmentRepository, CrossCheckHistoryRepository crossCheckHistoryRepository) {
        try {
            this.crossCheckRepository = crossCheckRepository;
            this.jdbc = jdbc;
            this.shipperRepository = shipperRepository;
            this.fulfillmentRepository = fulfillmentRepository;
            this.crossCheckHistoryRepository = crossCheckHistoryRepository;
        } finally {
            codeMax = crossCheckRepository.getCodeMax();
            if (codeMax == null) {
                codeMax = 0L;
            }
        }
    }

    @Override
    public Map<String, Object> findAll(int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        Map<String, Object> map = new HashMap<>();
        map.put("crossChecks", crossCheckRepository.findAllWithPageable(pageable));
        map.put("total", crossCheckRepository.count());
        return map;
    }

    @Override
    public CrossCheckEntity findOne(Long id) {
        CrossCheckEntity crossCheckEntity = crossCheckRepository.getOneCrossCheck(id);
//        List<FulfillmentCrossCheckDTO> list = jdbc.getFulfillmentOfCross(id)
        return crossCheckEntity;
    }

    @Override
    public Map<String, Object> findShipper(String value, int page) {
        String filter = "%" + value + "%";
        Map<String, Object> map = new HashMap<>();
        map.put("shippers", jdbc.findShipper(filter, (page - 1) * 5));
        map.put("total", jdbc.findTotalShipper(filter));
        return map;
    }

    @Override
    public BigDecimal getTotalDebtOfShipper(Long shipperId) {
        BigDecimal debt = new BigDecimal(0);
        List<DebtToPayDTO> list = jdbc.DebtOfShipper(shipperId);
        for (DebtToPayDTO debtToPayDTO : list) {
            if (debtToPayDTO.getPersonPayShip() == 0) {
                debt = debt.add(debtToPayDTO.getTotalCod().add(debtToPayDTO.getTotalTransportFee()));
            } else {
                debt = debt.add(debtToPayDTO.getTotalCod());
            }
        }
        BigDecimal debtCrossCheck = new BigDecimal(0);

        if (jdbc.DebtOfShipperCrossCheck(shipperId) != null) {
            debtCrossCheck = new BigDecimal(jdbc.DebtOfShipperCrossCheck(shipperId));
        }
        debt = debt.add(debtCrossCheck);
        return debt;
    }

    @Override
    public Map<String, Object> getFulfillmentOfShipper(String value, Long shipperId, int page) {
        value = "%" + value + "%";
        List<FulfillmentCrossCheckDTO> list = jdbc.getFulfillment(value, shipperId, (page - 1) * 5);
        Long total = jdbc.getTotalFulfillment(value, shipperId);
        Map<String, Object> map = new HashMap<>();
        map.put("fulfillment", list);
        map.put("total", total);
        return map;
    }

    @Transactional
    @Override
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    public CrossCheckEntity create(CrossCheckDTO crossCheckDTO) {
        BigDecimal totalMoney = new BigDecimal(0);
        CrossCheckEntity crossCheckEntity = new CrossCheckEntity();
        ShipperEntity shipperEntity = shipperRepository.getOneCus(crossCheckDTO.getShipper());
        if (shipperEntity == null) {
            throw new NotFoundException("Không tìm nhân viên!!!");
        }
        List<FulfillmentEntity> fulfillmentEntities = new ArrayList<>();
        for (FulfillmentEntity fulfillmentEntity : shipperEntity.getFulfillmentEntities()) {
            if (fulfillmentEntity.getCrossCheckEntity() == null
                    && fulfillmentEntity.getShippingStatus() == 4
                    && fulfillmentEntity.getPaymentStatus() == 0
            ) {
                if (fulfillmentEntity.getShippingPaymentObject() == 0) {
                    totalMoney = totalMoney.add(fulfillmentEntity.getCodMoney().add(fulfillmentEntity.getTransportFee()));
                } else {
                    totalMoney = totalMoney.add(fulfillmentEntity.getCodMoney());
                }
                fulfillmentEntity.setPaymentStatus(0);
                fulfillmentEntity.setCrossCheckEntity(crossCheckEntity);
                fulfillmentEntities.add(fulfillmentEntity);
                fulfillmentRepository.save(fulfillmentEntity);
            }
        }
        if (!fulfillmentEntities.isEmpty()) {
            crossCheckEntity.setMoneyPaid(new BigDecimal(0));
            crossCheckEntity.setTotalMoney(totalMoney);
            if (ConvertCode.convertCode(codeMax, crossCheckDTO.getCode(), "DSNV").startsWith("DSNV")) {
                codeMax += 1;
            }
            crossCheckDTO.setCode(ConvertCode.convertCode(codeMax, crossCheckDTO.getCode(), "DSNV"));
            crossCheckEntity.setShipperEntity(shipperEntity);
            crossCheckEntity.setNumberOfFulfillment(fulfillmentEntities.size());
            crossCheckEntity.setCode(crossCheckDTO.getCode());
            crossCheckEntity.setDescription(crossCheckDTO.getDescription());
            crossCheckEntity.setStatus(0);
            crossCheckEntity.setPaymentStatus(0);
            crossCheckEntity.setMaker(crossCheckDTO.getUserName());
            crossCheckEntity.setCreatedOn(new Date().getTime());
            saveHistory(crossCheckEntity, "Tạo phiếu", crossCheckDTO.getUserName(), "Tạo phiếu thành công.");
            crossCheckRepository.save(crossCheckEntity);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nhân viên chưa có phiếu giao nào cần đối soát");
        }


        return crossCheckEntity;
    }

    @Transactional
    @Override
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    public CrossCheckEntity update(CrossCheckDTO crossCheckDTO, Long id, int status) {
        CrossCheckEntity crossCheckEntity = crossCheckRepository.getOneCrossCheck(id);

        if (crossCheckEntity.getId() == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "cross check not found!!!");
        }
        if (status == 1) {
            if (crossCheckEntity.getStatus() == 0) {
                crossCheckEntity.setStatus(1);
                crossCheckEntity.setUpdatedOn(new Date().getTime());
                saveHistory(crossCheckEntity, "Đối soát", crossCheckDTO.getUserName(), "Đối soát thành công.");
            } else {
                throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, "Phiếu đã được đối soát.");
            }
        } else if (status == 2) {
            if (crossCheckEntity.getStatus() != 1 || crossCheckEntity.getPaymentStatus() == 2) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sai yêu cầu!!");
            } else {
                if (crossCheckDTO.getMoneyPaid().compareTo(new BigDecimal(0)) <= 0) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Số tiền thanh toán phải lớn hơn 0đ.");
                }
                if (crossCheckDTO.getMoneyPaid().add(crossCheckEntity.getMoneyPaid()).compareTo(crossCheckEntity.getTotalMoney()) == 0) {
                    crossCheckEntity.setPaymentStatus(2);
                    crossCheckEntity.setPaymentMethod(crossCheckDTO.getPaymentMethod());
                    crossCheckEntity.setDateOfPayment(new Date().getTime());
                    crossCheckEntity.setMoneyPaid(crossCheckEntity.getMoneyPaid().add(crossCheckDTO.getMoneyPaid()));
                    for (FulfillmentEntity fulfillmentEntity : crossCheckEntity.getFulfillmentEntities()) {
                        if (fulfillmentEntity.getPaymentStatus() == 0) {
                            fulfillmentEntity.setPaymentStatus(1);
                            fulfillmentRepository.save(fulfillmentEntity);
//                            createAccountingKafka.sendMessage("{\"customer\":" + fulfillmentEntity.getCustomerEntity().getId() + " , \"total\":" + totalAcc + "}");
                        }
                    }
                    saveHistory(crossCheckEntity, "Thanh toán", crossCheckDTO.getUserName(),
                            "Xác nhận thanh toán " + crossCheckDTO.getMoneyPaid()
                                    + " đ thành công với phường thức thanh toán " +
                                    (crossCheckDTO.getPaymentMethod() == 0 ? "Tiền mặt" : "Chuyển khoản"));
                } else if (crossCheckEntity.getMoneyPaid().add(crossCheckDTO.getMoneyPaid()).compareTo(crossCheckEntity.getTotalMoney()) < 0) {
                    crossCheckEntity.setPaymentStatus(1);
                    crossCheckEntity.setPaymentMethod(crossCheckDTO.getPaymentMethod());
                    crossCheckEntity.setMoneyPaid(crossCheckEntity.getMoneyPaid().add(crossCheckDTO.getMoneyPaid()));
                    saveHistory(crossCheckEntity, "Thanh toán", crossCheckDTO.getUserName(),
                            "Xác nhận thanh toán " + crossCheckDTO.getMoneyPaid()
                                    + " đ thành công với phường thức thanh toán " +
                                    (crossCheckDTO.getPaymentMethod() == 0 ? "Tiền mặt" : "Chuyển khoản"));
                } else {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Số tiền thanh toán không được lớn hơn tổng tiền đối soát!!");
                }
            }
        } else if (status == 3) {
            if (crossCheckDTO.getDescription() != null) {
                crossCheckEntity.setDescription(crossCheckDTO.getDescription());
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad Request!!");
        }
        crossCheckRepository.save(crossCheckEntity);
        return crossCheckEntity;
    }

    @Override
    public Map<String, Object> getFulfillmentOfCross(Long id, String value, int page) {
        value = "%" + value + "%";
        Map<String, Object> map = new HashMap<>();
        List<FulfillmentCrossCheckDTO> list = jdbc.getFulfillmentOfCross(id, value, (page - 1) * 5);
        Long total = jdbc.getTotalFulfillmentOfCross(id, value);
        map.put("fulfillment", list);
        map.put("total", total);
        return map;
    }

    @Override
    public List<CrossCheckHistoryEntity> findHistoryOfCross(Long id) {
        return crossCheckHistoryRepository.findHistoryOfCross(id);
    }

    private void saveHistory(CrossCheckEntity crossCheckEntity, String action, String operator, String function) {
        CrossCheckHistoryEntity crossCheckHistoryEntity = new CrossCheckHistoryEntity();
        crossCheckHistoryEntity.setAction(action);
        crossCheckHistoryEntity.setCrossCheckEntity(crossCheckEntity);
        crossCheckHistoryEntity.setOperator(operator);
        crossCheckHistoryEntity.setFunctions(function);
        crossCheckHistoryEntity.setCreatedOn(new Date().getTime());
        crossCheckHistoryRepository.save(crossCheckHistoryEntity);
    }

}
