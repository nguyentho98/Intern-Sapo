package com.sapo.qlgiaohang.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sapo.qlgiaohang.entity.tracking.AccountingHistoryEntity;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "accounting")
@Data
public class AccountingEntity extends BaseEntity {
    @Column(name = "code")
    private String code;

    @Column(name = "money_for_customers")
    private BigDecimal moneyForCustomers;

    @Column(name = "money_paid")
    private BigDecimal moneyPaid;

    @Column(name = "transport_fee")
    private BigDecimal transportFee;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "payment_status")
    private Integer paymentStatus;

    @Column(name = "maker")
    private String maker;

    @Column(name = "number_of_fulfillment")
    private Long numberOfFulfillment;

    @Column(name = "description", columnDefinition = "text(2000)")
    private String description;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "is_active")
    private Boolean isActive;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private CustomerEntity customerEntity;

    @JsonIgnore
    @OneToMany(mappedBy = "accountingEntity")
    private List<FulfillmentEntity> fulfillmentEntities;


    @OneToMany(mappedBy = "accountingEntity")
    private List<AccountingHistoryEntity> accountingHistoryEntities;
}
