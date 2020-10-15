package com.sapo.qlgiaohang.dto.address;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.sapo.qlgiaohang.entity.CustomerEntity;
import com.sapo.qlgiaohang.entity.FulfillmentEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AddressDTO {
    private Long id;

    private String address;

    private String ward;

    private String district;

    private String province;

    private String phone;

    private String name;

    private int status;

    private CustomerEntity customerEntity;
}
