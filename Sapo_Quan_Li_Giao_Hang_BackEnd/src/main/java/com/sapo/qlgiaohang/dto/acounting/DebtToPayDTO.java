package com.sapo.qlgiaohang.dto.acounting;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DebtToPayDTO {
    private BigDecimal totalCod;
    private BigDecimal totalTransportFee;
    private Integer personPayShip;

}
