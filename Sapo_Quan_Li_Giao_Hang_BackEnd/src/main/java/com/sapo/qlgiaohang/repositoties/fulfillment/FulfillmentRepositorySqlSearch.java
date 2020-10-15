package com.sapo.qlgiaohang.repositoties.fulfillment;

import com.sapo.qlgiaohang.dto.fulfillment.FilterRequest;
import com.sapo.qlgiaohang.dto.fulfillment.FulfillmentFilterResponse;
import com.sapo.qlgiaohang.dto.fulfillment.FulfillmentResponse;

public interface FulfillmentRepositorySqlSearch {
    FulfillmentFilterResponse filterFulfillments(FilterRequest filterRequest, int page, int limit);
}
