package com.sapo.qlgiaohang.dto.acounting;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class FulfillmentAccountingDTO {
    private Long id;
    private String code;
    private BigDecimal codMoney;
    private BigDecimal transportFee;
    private int personPayShip;
}
