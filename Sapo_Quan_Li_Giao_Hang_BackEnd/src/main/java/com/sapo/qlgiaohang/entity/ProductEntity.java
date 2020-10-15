package com.sapo.qlgiaohang.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sapo.qlgiaohang.entity.product.ProductOfCustomerEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
public class ProductEntity extends BaseEntity {
    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "picture_path")
    private String picturePath;

    @Column(name = "product_price")
    private BigDecimal productPrice;

    @Column(name = "description", columnDefinition = "text(2000)")
    private String description;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "transaction_status")
    private Boolean transactionStatus;

    @Column(name = "category")
    private String category;

    @Column(name = "brand")
    private String brand;

    @Column(name = "mass")
    private String mass;

    @OneToMany(mappedBy = "product")
    private List<ImageEntity> imageEntity;

    @JsonIgnore
    @OneToMany(mappedBy = "productEntity")
    private List<ProductOfCustomerEntity> amountCustomerProductEntities;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "product_tags",
            joinColumns = @JoinColumn(name = "product_id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "tag_id", nullable = false))
    private List<TagsEntity> tagsEntities;

    public void addImage(ImageEntity image) {
        this.imageEntity.add(image);
        image.setProduct(this);
    }
}
