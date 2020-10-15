package com.sapo.qlgiaohang.entity.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sapo.qlgiaohang.entity.BaseEntity;
import com.sapo.qlgiaohang.entity.CustomerEntity;
import com.sapo.qlgiaohang.entity.ProductEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "product_of_customer")
@Getter
@Setter
public class ProductOfCustomerEntity extends BaseEntity {
    @Column(name = "quantity")
    private Long quantity;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity productEntity;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private CustomerEntity customerEntity;
}
