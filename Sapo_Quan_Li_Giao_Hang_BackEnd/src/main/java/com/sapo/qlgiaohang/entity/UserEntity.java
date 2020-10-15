package com.sapo.qlgiaohang.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "user")
@Getter
@Setter
public class UserEntity extends BaseEntity {
    
    @Column(name = "fullName" ,columnDefinition = "varchar(150)",unique = true)
    private String fullName;
    
    @Column(name = "email" ,columnDefinition = "varchar(30)",unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "is_active" ,columnDefinition = "boolean default false")
    private boolean isActive;

    @JsonIgnore
    @OneToOne(mappedBy = "userEntity")
    private ShipperEntity shipperEntity;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<RoleEntity> roles = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "userEntity")
    private List<FulfillmentEntity> fulfillmentEntities;
}
