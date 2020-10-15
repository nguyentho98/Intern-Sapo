package com.sapo.qlgiaohang.repositoties;

import com.sapo.qlgiaohang.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    
//    @Query("select u from UserEntity u where u.email = :email")
    UserEntity findUserEntityByEmail(@Param("email") String email);

    @Query("select s from UserEntity s where s.id = :id")
    UserEntity getOneCus(@Param("id") long id);
}
