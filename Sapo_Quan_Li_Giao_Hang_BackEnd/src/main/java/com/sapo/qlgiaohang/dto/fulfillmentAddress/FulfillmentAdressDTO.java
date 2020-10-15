package com.sapo.qlgiaohang.dto.fulfillmentAddress;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.sapo.qlgiaohang.dto.address.AddressDTO;
import com.sapo.qlgiaohang.dto.fulfillment.FulfillmentDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FulfillmentAdressDTO {
    private  Long id;

    private String address;

    private String ward;

    private String district;

    private String province;

    private String phone;

    private String name;
}
