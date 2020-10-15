package com.sapo.qlgiaohang.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "shipper")
@Getter
@Setter
public class ShipperEntity extends BaseEntity {

    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "address")
    private String address;

    @Column(name = "charge_area")
    private String chargeArea;

    @Column(name = "phone")
    private String phone;

    @Column(name = "is_active")
    private String isActive;

    @Column(name = "description", columnDefinition = "text(2000)")
    private String description;


    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;
    
    @JsonIgnore
    @OneToMany(mappedBy = "shipperEntity", fetch = FetchType.LAZY)
    private List<FulfillmentEntity> fulfillmentEntities;

    @JsonIgnore
    @OneToMany(mappedBy = "shipperEntity")
    private List<CrossCheckEntity> crossCheckEntities;
}
