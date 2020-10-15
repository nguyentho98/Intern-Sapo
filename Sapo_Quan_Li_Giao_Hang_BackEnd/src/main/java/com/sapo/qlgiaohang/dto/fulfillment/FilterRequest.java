package com.sapo.qlgiaohang.dto.fulfillment;

import lombok.Data;

@Data
public class FilterRequest {

    private String code;

    private Integer status;

    private Integer shippingMethod;

    private Integer accountingStatus;

    private Long customer;

    private Long shipper;

    private Long fromDate;

    private Long toDate;
}
