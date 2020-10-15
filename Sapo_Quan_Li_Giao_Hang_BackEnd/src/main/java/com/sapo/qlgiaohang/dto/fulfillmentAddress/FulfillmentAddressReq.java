package com.sapo.qlgiaohang.dto.fulfillmentAddress;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FulfillmentAddressReq {
    private String address;

    private String ward;

    private String district;

    private String province;

    private String phone;

    private String name;
}
