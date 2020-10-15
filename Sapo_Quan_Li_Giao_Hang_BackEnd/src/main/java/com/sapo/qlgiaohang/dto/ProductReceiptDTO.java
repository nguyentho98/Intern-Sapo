package com.sapo.qlgiaohang.dto;


import com.sapo.qlgiaohang.dto.product.ProductDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductReceiptDTO {
    private Long id;

    private Integer  quantity;

    private ProductDTO productDTO;

    private Long productId;

    private ReceiptDTO receiptDTO;
}
