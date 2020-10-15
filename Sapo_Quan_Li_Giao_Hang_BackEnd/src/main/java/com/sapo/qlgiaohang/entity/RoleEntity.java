package com.sapo.qlgiaohang.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "role")
@Getter
@Setter
public class RoleEntity extends BaseEntity {
    @Column(name = "name", columnDefinition = "varchar(50)")
    private String name;

    @Column(name = "code", unique = true, columnDefinition = "varchar(15)")
    private String code;

    @JsonIgnore
    @ManyToMany(mappedBy = "roles")
    private List<UserEntity> users = new ArrayList<>();

}
