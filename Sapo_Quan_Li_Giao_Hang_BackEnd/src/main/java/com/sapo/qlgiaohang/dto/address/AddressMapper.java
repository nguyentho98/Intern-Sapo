package com.sapo.qlgiaohang.dto.address;
import com.sapo.qlgiaohang.entity.AddressEntity;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {

    public static AddressDTO toAddressDTO(AddressEntity entity){
        AddressDTO tmp= new AddressDTO();
        tmp.setId(entity.getId());
        tmp.setName(entity.getName());
        tmp.setPhone(entity.getPhone());
        tmp.setAddress(entity.getAddress());
        tmp.setProvince(entity.getProvince());
        tmp.setWard(entity.getWard());
        tmp.setDistrict(entity.getDistrict());
        tmp.setStatus(entity.getStatus());
        return tmp;
    }
}
