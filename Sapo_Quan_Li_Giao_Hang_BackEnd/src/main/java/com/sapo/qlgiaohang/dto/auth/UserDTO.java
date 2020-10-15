package com.sapo.qlgiaohang.dto.auth;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.sapo.qlgiaohang.entity.FulfillmentEntity;
import com.sapo.qlgiaohang.entity.ShipperEntity;
import com.sapo.qlgiaohang.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    private Long id;
    
    private Long createdOn;
    
    private Long updatedOn;
    
    private String fullName;
    
    private String email;
    
    private String password;
    
    private boolean isActive;
    
    private ShipperEntity shipperEntity;
    
    private List<FulfillmentEntity> fulfillmentEntities;
    
    public UserDTO(UserEntity entity) {
        this.id = entity.getId();
        this.createdOn = entity.getUpdatedOn();
        this.updatedOn = entity.getCreatedOn();
        this.fullName = entity.getFullName();
        this.email = entity.getEmail();
        this.password = entity.getPassword();
        this.isActive = entity.isActive();
        this.shipperEntity = entity.getShipperEntity();
        this.fulfillmentEntities = entity.getFulfillmentEntities();
    }
}
