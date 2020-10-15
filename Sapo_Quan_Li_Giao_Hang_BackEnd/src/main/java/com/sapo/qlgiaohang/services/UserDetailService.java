package com.sapo.qlgiaohang.services;

import com.sapo.qlgiaohang.configs.UserDetail;
import com.sapo.qlgiaohang.dto.auth.UserResDTO;
import com.sapo.qlgiaohang.repositoties.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UserDetailService implements UserDetailsService {
    @Autowired
    UserRepository repository;
    
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserResDTO user = new UserResDTO(repository.findUserEntityByEmail(email));
        if (user == null) {
            throw new UsernameNotFoundException("User " + email + " not found.");
        }
        return UserDetail.build(user);
    }
}
