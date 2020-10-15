package com.sapo.qlgiaohang.services;

import com.sapo.qlgiaohang.dto.acounting.AccountingDTO;
import com.sapo.qlgiaohang.dto.acounting.AccountingDTOResponse;
import com.sapo.qlgiaohang.dto.acounting.AccountingResponse;
import com.sapo.qlgiaohang.dto.acounting.FulfillmentAccountingDTO;
import com.sapo.qlgiaohang.entity.AccountingEntity;
import com.sapo.qlgiaohang.entity.tracking.AccountingHistoryEntity;

import java.util.List;
import java.util.Map;

public interface AccountingService {
    AccountingResponse findAllAccounting(int page, int limit);

    AccountingDTOResponse findOne(Long id,int page);

    AccountingEntity save(AccountingDTO accountingDTO);

    AccountingEntity update(AccountingDTO accountingDTO, Long id, int status);

    Map<String, Object> getCustomerForAccounting(String value, int page);

    Map<String, Object> getTotalDebtToPay(long customerId);

    List<FulfillmentAccountingDTO> getFulfillment(long customerId, int page);
    List<AccountingHistoryEntity> findHistoryByAccounting(Long id);
    Long cancelAccounting(Long id,String userName);
}
