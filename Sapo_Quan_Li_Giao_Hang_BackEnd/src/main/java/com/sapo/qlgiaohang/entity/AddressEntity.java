package com.sapo.qlgiaohang.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Table(name = "address")
@Entity
@Data
@Getter
@Setter
public class AddressEntity extends BaseEntity{
    @Column(name = "ward")
    private String ward;

    @Column(name = "district")
    private String district;

    @Column(name = "province")
    private String province;

    @Column(name = "address")
    private String address;

    @Column(name = "phone")
    private String phone;

    @Column(name = "name")
    private String name;

    @Column(name = "status")
    private int status;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private CustomerEntity customerEntity;

    @JsonIgnore
    @OneToOne(mappedBy = "addressEntity")
    private CustomerEntity customerDefaultAddress;


}
