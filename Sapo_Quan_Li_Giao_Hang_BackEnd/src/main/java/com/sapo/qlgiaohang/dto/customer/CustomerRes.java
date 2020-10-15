package com.sapo.qlgiaohang.dto.customer;

import lombok.Data;

import java.util.List;
@Data
public class CustomerRes {
    private long totalItem;
    private List<CustomerDTO> dataListCUS;

    public CustomerRes(long totalItem, List<CustomerDTO> dataListCUS) {
        this.totalItem = totalItem;
        this.dataListCUS = dataListCUS;
    }
}
