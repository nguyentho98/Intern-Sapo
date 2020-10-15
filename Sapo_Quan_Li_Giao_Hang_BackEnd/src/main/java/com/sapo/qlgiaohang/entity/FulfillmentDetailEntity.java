package com.sapo.qlgiaohang.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "fulfillment_detail")
@Getter
@Setter
public class FulfillmentDetailEntity extends BaseEntity{
    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "quantity")
    private Long quantity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private ProductEntity product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fullfilment_id")
    private FulfillmentEntity fulfillmentEntity;
}
