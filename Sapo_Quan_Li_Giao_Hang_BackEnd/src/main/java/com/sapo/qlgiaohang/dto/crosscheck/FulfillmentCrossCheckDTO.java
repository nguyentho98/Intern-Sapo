package com.sapo.qlgiaohang.dto.crosscheck;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class FulfillmentCrossCheckDTO {
    private Long id;
    private String code;
    private BigDecimal codMoney;
    private BigDecimal transportFee;
    private int personPayShip;
    private String name;
}
