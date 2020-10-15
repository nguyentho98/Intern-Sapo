package com.sapo.qlgiaohang.dto.fulfillment;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FulfillmentResponse {
    private long totalElement;
    private List<FulfillmentDTO> fulfillmentDTOS;

    public FulfillmentResponse(long totalElement, List<FulfillmentDTO> fulfillmentDTOS) {
        this.totalElement = totalElement;
        this.fulfillmentDTOS = fulfillmentDTOS;
    }
}
