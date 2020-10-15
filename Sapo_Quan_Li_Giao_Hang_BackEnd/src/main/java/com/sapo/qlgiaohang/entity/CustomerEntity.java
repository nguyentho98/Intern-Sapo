package com.sapo.qlgiaohang.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sapo.qlgiaohang.entity.product.ProductOfCustomerEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "customer")
@Getter
@Setter
public class CustomerEntity extends BaseEntity{
    @Column(name = "code",unique = true)
    private String code;

    @Column(name = "phone",unique = true)
    private String phone;

    @Column(name = "name")
    private String name;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "email")
    private String email;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "default_address")
    private AddressEntity addressEntity;


    @OneToMany(mappedBy = "customerEntity",fetch = FetchType.LAZY)
    private List<FulfillmentEntity> fulfillmentEntities;

    @JsonIgnore
    @OneToMany(mappedBy = "customerEntity",fetch = FetchType.LAZY)
    private List<ProductOfCustomerEntity> amountCustomerProductEntities;

    @JsonIgnore
    @OneToMany(mappedBy = "customerEntity")
    private List<AddressEntity> addressEntities = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "customerEntity")
    private List<AccountingEntity> accountingEntities;
}
