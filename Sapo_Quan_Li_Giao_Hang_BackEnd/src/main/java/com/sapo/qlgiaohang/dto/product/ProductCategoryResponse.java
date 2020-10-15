package com.sapo.qlgiaohang.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductCategoryResponse {
    private String[] category;
    private Long total;
}
