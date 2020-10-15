package com.sapo.qlgiaohang.dto.product;

import com.sapo.qlgiaohang.entity.ProductEntity;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {

    private List<ProductEntity> products;
    private Long totalProducts;
}
