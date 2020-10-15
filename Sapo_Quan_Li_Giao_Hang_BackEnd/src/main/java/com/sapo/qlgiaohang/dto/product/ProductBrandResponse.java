package com.sapo.qlgiaohang.dto.product;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductBrandResponse {
    private String[] brand;

    private Long total;
}
