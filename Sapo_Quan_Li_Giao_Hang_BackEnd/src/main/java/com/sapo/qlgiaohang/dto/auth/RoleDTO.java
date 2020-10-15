package com.sapo.qlgiaohang.dto.auth;

import com.sapo.qlgiaohang.entity.RoleEntity;
import lombok.Data;


@Data
public class RoleDTO {
    
    private String name;
    
    private String code;
    
    public RoleDTO(RoleEntity role) {
        this.name = role.getName();
        this.code = role.getCode();
    }
}
