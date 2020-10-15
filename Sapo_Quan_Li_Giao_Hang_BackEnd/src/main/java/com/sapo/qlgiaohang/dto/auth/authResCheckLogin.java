package com.sapo.qlgiaohang.dto.auth;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
@Getter
@Setter
public class authResCheckLogin {
    private Long shipperID;
    private Collection<? extends GrantedAuthority> authorities;
}
