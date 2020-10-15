package com.sapo.qlgiaohang.dto.acounting;

import com.sapo.qlgiaohang.entity.CustomerEntity;
import com.sapo.qlgiaohang.entity.FulfillmentEntity;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class AccountingDTO {
//    private Long id;
    private String code;
    private Integer paymentMethod;
    private BigDecimal moneyPaid;
    private String description;
    private Long customer;
    private String userName;
}
