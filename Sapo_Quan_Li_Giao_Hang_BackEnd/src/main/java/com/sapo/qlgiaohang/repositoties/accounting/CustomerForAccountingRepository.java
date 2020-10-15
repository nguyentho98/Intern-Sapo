package com.sapo.qlgiaohang.repositoties.accounting;

import com.sapo.qlgiaohang.dto.acounting.AccountingDTOResponse;
import com.sapo.qlgiaohang.dto.acounting.CustomerAccountingDTO;
import com.sapo.qlgiaohang.dto.acounting.DebtToPayDTO;
import com.sapo.qlgiaohang.dto.acounting.FulfillmentAccountingDTO;

import java.math.BigDecimal;
import java.util.List;

public interface CustomerForAccountingRepository {
    List<CustomerAccountingDTO> getAllCustomForAccounting(String value, int page);

    Long getTotalCustomers(String value);

    List<DebtToPayDTO> getTotalDebtToPay(long customerId);

    BigDecimal getTotalDebtAccounting(long customerId);

    Long getTotalFulfillment(long customerId);

    List<FulfillmentAccountingDTO> getFulfillment(long customerId,int page);

    AccountingDTOResponse findOneAccounting(Long id);

    List<FulfillmentAccountingDTO> getFulfillmentForAccounting(long accountingId,int page);

    CustomerAccountingDTO getCustomerForAccounting(Long customerId);
}
