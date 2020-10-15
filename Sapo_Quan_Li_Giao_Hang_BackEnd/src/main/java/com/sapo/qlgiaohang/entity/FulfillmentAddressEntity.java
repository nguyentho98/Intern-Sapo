package com.sapo.qlgiaohang.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Table(name = "fulfillment_address")
@Entity
@Data
@Getter
@Setter
public class FulfillmentAddressEntity extends BaseEntity{
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

    @OneToMany(mappedBy = "fulfillmentShippingFrom", fetch = FetchType.LAZY)
    private List<FulfillmentEntity> fulfillmentShippingFromEntities;

    @OneToMany(mappedBy = "fulfillmentShippingTo", fetch = FetchType.LAZY)
    private List<FulfillmentEntity> fulfillmentShippingToEntities;
}
