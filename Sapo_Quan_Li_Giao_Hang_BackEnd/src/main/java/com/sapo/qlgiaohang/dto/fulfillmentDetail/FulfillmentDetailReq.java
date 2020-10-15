package com.sapo.qlgiaohang.dto.fulfillmentDetail;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FulfillmentDetailReq {
    private BigDecimal price;
    private Long quantity;
    private long product_id;
    private long fulfillment_id;
}
