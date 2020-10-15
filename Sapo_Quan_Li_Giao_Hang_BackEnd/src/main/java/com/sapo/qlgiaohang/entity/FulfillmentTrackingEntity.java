package com.sapo.qlgiaohang.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Table(name = "fulfillment_tracking")
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FulfillmentTrackingEntity extends BaseEntity {
    @Column(name = "action")
    private String action;

    @Column(name = "note")
    private String note;

    @Column(name = "name")
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fulfillment_id")
    private FulfillmentEntity fulfillmentEntity;
}
