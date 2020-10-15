package com.sapo.qlgiaohang.dto.shipper;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.sapo.qlgiaohang.repositoties.ShipperRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ShipperFulfillmentDTO implements ShipperRepository.SS {
    private Long id;

    private String code;

    private String email;

    private String name;

    private String address;

    private String chargeArea;

    private String phone;

    private Long count;
}
