package com.sapo.qlgiaohang.dto.shipper;

import com.sapo.qlgiaohang.dto.auth.UserDTO;
import com.sapo.qlgiaohang.entity.ShipperEntity;
import com.sapo.qlgiaohang.entity.UserEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ShipperMapper {
    public ShipperDTO convertToDTO(ShipperEntity entity) {
        ShipperDTO shipperDTO = new ShipperDTO();
        shipperDTO.setId(entity.getId());
        shipperDTO.setCode(entity.getCode());
        shipperDTO.setPhone(entity.getPhone());
        shipperDTO.setAddress(entity.getAddress());
        shipperDTO.setChargeArea(entity.getChargeArea());
        shipperDTO.setEmail(entity.getUserEntity().getEmail());
        shipperDTO.setName(entity.getUserEntity().getFullName());
        shipperDTO.setIsActive(entity.getIsActive());
        shipperDTO.setNote(entity.getDescription());
//        shipperDTO.setFulfillmentEntityList(entity.getFulfillmentEntities());
        return shipperDTO;
    }
}
