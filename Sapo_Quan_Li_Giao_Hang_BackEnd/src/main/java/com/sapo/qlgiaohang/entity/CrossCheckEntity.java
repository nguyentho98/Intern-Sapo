package com.sapo.qlgiaohang.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sapo.qlgiaohang.entity.tracking.CrossCheckHistoryEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "cross_check")
@Getter
@Setter
public class CrossCheckEntity extends BaseEntity {
    @Column(name = "code")
    private String code;

    @Column(name = "maker")
    private String maker;

    @Column(name = "description", columnDefinition = "TEXT(2000)")
    private String description;

    @Column(name = "total_money")
    private BigDecimal totalMoney;

    @Column(name = "money_paid")
    private BigDecimal moneyPaid;

    @Column(name = "status")
    private int status;

    @Column(name = "number_of_fulfillment")
    private Integer numberOfFulfillment;

    @Column(name = "payment_status")
    private int paymentStatus;

    @Column(name = "payment_method")
    private int paymentMethod;

    @Column(name = "date_of_payment")
    private Long dateOfPayment;

    @ManyToOne
    @JoinColumn(name = "shipper_id")
    private ShipperEntity shipperEntity;

    @JsonIgnore
    @OneToMany(mappedBy = "crossCheckEntity")
    private List<FulfillmentEntity> fulfillmentEntities;

    @OneToMany(mappedBy = "crossCheckEntity")
    private List<CrossCheckHistoryEntity> crossCheckHistoryEntities;
}
