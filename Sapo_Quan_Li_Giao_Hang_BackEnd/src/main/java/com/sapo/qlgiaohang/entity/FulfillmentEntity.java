package com.sapo.qlgiaohang.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Table(name = "fulfillment")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FulfillmentEntity extends BaseEntity{
    @Column(name = "code",unique = true)
    private String code;

    @Column(name = "total_money")
    private BigDecimal totalMoney;

    @Column(name = "cod_money")
    private BigDecimal codMoney;

    @Column(name = "description", columnDefinition = "text(2000)")
    private String description;

    @Column(name = "delivery_date")
    private Long deliveryDate;

    @Column(name = "cancelation_date")
    private Long cancelDate;

    @Column(name = "success_delivery_date")
    private Long successDeliveryDate;

    @Column(name = "shipping_status")
    private int shippingStatus;

    @Column(name = "payment_status")
    private int paymentStatus;

    @Column(name = "payment_method")
    private int paymentMethod;

    @Column(name = "shipping_method")
    private int shippingMethod;

    @Column(name = "transport_fee")
    private BigDecimal transportFee;

    @Column(name = "shipping_payment_object")
    private int shippingPaymentObject;

    @Column(name = "accounting_status")
    private int accountingStatus;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shipper_id")
    private ShipperEntity shipperEntity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
    private CustomerEntity customerEntity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shipping_to")
    private FulfillmentAddressEntity fulfillmentShippingTo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shipping_from")
    private FulfillmentAddressEntity fulfillmentShippingFrom;

    @OneToMany(mappedBy = "fulfillmentEntity", fetch = FetchType.LAZY)
    private List<FulfillmentDetailEntity> fulfillmentDetails;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "accounting_id")
    private AccountingEntity accountingEntity;

    @JsonIgnore
    @OneToMany(mappedBy = "fulfillmentEntity", fetch = FetchType.LAZY)
    private List<FulfillmentTrackingEntity> fulfillmentTrackingEntities;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "cross_check_id")
    private CrossCheckEntity crossCheckEntity;
}
