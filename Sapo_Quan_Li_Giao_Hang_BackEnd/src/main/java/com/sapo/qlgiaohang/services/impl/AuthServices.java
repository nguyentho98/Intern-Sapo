package com.sapo.qlgiaohang.services.impl;

import com.sapo.qlgiaohang.configs.jwt.JwtProvider;
import com.sapo.qlgiaohang.dto.auth.UserDTO;
import com.sapo.qlgiaohang.dto.auth.authResCheckLogin;
import com.sapo.qlgiaohang.repositoties.UserRepository;
import com.sapo.qlgiaohang.services.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class AuthServices {
    
    @Autowired
    JwtProvider tokenProvider;
    
    @Autowired
    UserRepository repository;
    
    @Autowired
    UserDetailService service;
    
    public authResCheckLogin getRole(String email) {
        authResCheckLogin auth = new authResCheckLogin();
        UserDetails userDetails = service.loadUserByUsername(email);
        UserDTO userDTO = new UserDTO(repository.findUserEntityByEmail(email));
        if (userDTO.getShipperEntity() != null) {
            auth.setShipperID(userDTO.getShipperEntity().getId());
        } else {
            auth.setShipperID(0L);
        }
        auth.setAuthorities(userDetails.getAuthorities());
        return auth;
    }
}
