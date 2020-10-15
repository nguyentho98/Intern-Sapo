package com.sapo.qlgiaohang.dto.address;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddressReq {
    private String address;

    private String ward;

    private String district;

    private String province;

    private String phone;

    private String name;

    private Long customer_id;
}
