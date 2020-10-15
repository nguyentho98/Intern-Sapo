package com.sapo.qlgiaohang.dto.auth;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.sapo.qlgiaohang.entity.RoleEntity;
import com.sapo.qlgiaohang.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResDTO {
    protected long id;
    protected String fullName;
    protected String username;
    protected String password;
    protected Set<RoleDTO> role;
    
    public UserResDTO(UserEntity us) {
        this.id = us.getId();
        this.fullName = us.getFullName();
        this.username = us.getEmail();
        this.password = us.getPassword();
        Set<RoleDTO> roleDTOS = new HashSet<>();
        for (RoleEntity ro: us.getRoles()) {
            roleDTOS.add(new RoleDTO(ro));
        }
        this.role = roleDTOS;
    }
}
