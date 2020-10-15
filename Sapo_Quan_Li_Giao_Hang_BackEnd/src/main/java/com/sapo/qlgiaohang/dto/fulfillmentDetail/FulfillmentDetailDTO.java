package com.sapo.qlgiaohang.dto.fulfillmentDetail;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.sapo.qlgiaohang.dto.fulfillment.FulfillmentDTO;
import com.sapo.qlgiaohang.dto.product.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FulfillmentDetailDTO {
    private Long id;
    private BigDecimal price;
    private Long quantity;
    private ProductDTO productDTO;
    private FulfillmentDTO orderDTO;
}
