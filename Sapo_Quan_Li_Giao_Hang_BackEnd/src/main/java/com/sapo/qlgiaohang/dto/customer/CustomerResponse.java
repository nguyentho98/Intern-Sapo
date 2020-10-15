package com.sapo.qlgiaohang.dto.customer;

import com.sapo.qlgiaohang.dto.fulfillment.FulfillmentCustomerDTO;
import lombok.Data;

import java.util.List;

@Data
public class CustomerResponse {
    private long totalItem;
    private double totalMoney;
    private List<FulfillmentCustomerDTO> fulfillmentCustomerDTOList;

    public CustomerResponse(long totalItem, double totalMoney, List<FulfillmentCustomerDTO> fulfillmentCustomerDTOList) {
        this.totalItem = totalItem;
        this.totalMoney=totalMoney;
        this.fulfillmentCustomerDTOList = fulfillmentCustomerDTOList;
    }
}
