package com.sapo.qlgiaohang.dto.shipper;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.sapo.qlgiaohang.dto.auth.UserDTO;
import com.sapo.qlgiaohang.entity.FulfillmentEntity;
import com.sapo.qlgiaohang.entity.UserEntity;
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
public class ShipperDTO {

    private long id;

    private String code;

    private String email;

    private String name;

    private String address;

    private String chargeArea;

    private String phone;

    private String isActive;

    private String note;

    private int count;

    private List<FulfillmentEntity> fulfillmentEntityList;
    
}
