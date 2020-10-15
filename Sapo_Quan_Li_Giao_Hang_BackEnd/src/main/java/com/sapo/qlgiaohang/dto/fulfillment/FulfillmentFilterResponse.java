package com.sapo.qlgiaohang.dto.fulfillment;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FulfillmentFilterResponse {
    private long totalElement;
    private List<FulfillmentFilterDTO> fulfillmentDTOS;

    public FulfillmentFilterResponse(long totalElement, List<FulfillmentFilterDTO> fulfillmentFilterDTOS) {
        this.totalElement = totalElement;
        this.fulfillmentDTOS = fulfillmentFilterDTOS;
    }
}
