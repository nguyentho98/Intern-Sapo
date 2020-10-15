package com.sapo.qlgiaohang.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RefundDTO {
    private String code;
    private String note;
    private Long partnerId;
    private List<ProductRefundDTO> productRefundDTOS;
}
