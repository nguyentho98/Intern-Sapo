package com.sapo.qlgiaohang.dto.acounting;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class AccountingDTOResponse {
    private Long id;

    private String code;

    private BigDecimal moneyPaid;

    private String description;

    private Long customerId;

    private String maker;

    private Integer paymentStatus;

    private Long numberOfFulfillment;

    private BigDecimal moneyForCustomers;

    private Boolean status;

    private Boolean isActive;

    private Long createdOn;

    private Long updatedOn;

    private List<FulfillmentAccountingDTO> fulfillment;

    private CustomerAccountingDTO customer;
}
