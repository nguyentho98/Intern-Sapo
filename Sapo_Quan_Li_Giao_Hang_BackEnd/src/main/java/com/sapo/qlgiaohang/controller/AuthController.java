package com.sapo.qlgiaohang.controller;

import com.sapo.qlgiaohang.dto.auth.UserReqDTO;
import com.sapo.qlgiaohang.configs.jwt.JwtProvider;
import com.sapo.qlgiaohang.dto.auth.authResCheckLogin;
import com.sapo.qlgiaohang.dto.auth.authResDTO;
import com.sapo.qlgiaohang.repositoties.UserRepository;
import com.sapo.qlgiaohang.services.impl.AuthServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Objects;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtProvider tokenProvider;
    
    @Autowired
    UserRepository repository;
    
    @Autowired
    AuthServices authServices;
    
    @PostMapping("/signin")
    public authResDTO getLogin(@RequestBody UserReqDTO reqDTO) throws Exception {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            reqDTO.getEmail(),
                            reqDTO.getPassword()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception e) {
            throw new Exception("Inavalid username/password: " + e);
        }
        return tokenProvider.generateToken(reqDTO.getEmail());
    }
    
    @PostMapping("/checklogin")
    public authResCheckLogin checkAuth() {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        return authServices.getRole(authentication.getName());
    }
    
}
