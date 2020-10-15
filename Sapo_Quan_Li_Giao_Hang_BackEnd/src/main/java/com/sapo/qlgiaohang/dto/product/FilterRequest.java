package com.sapo.qlgiaohang.dto.product;

import lombok.Data;

@Data
public class FilterRequest {
    private String name;

    private Integer status;

    private String category;

    private String brand;

    private Long fromDate;

    private Long toDate;

    private String[] tags;

    private Integer classify;
}
