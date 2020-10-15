package com.sapo.qlgiaohang.dto.crosscheck;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CrossCheckDTO {
    private String code;
    private String description;
    private Integer paymentMethod;
    private BigDecimal moneyPaid;
    private String userName;
    private Long shipper;

}
