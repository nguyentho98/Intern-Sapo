package com.sapo.qlgiaohang.dto.product;

import com.sapo.qlgiaohang.entity.ImageEntity;
import com.sapo.qlgiaohang.entity.TagsEntity;
import com.sapo.qlgiaohang.entity.product.ProductOfCustomerEntity;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ProductItem {
    private String productCode;

    private String productName;

    private Long quantity;

    private String picturePath;

    private List<BigDecimal> prices = new ArrayList<>();

    private String description;

    private boolean isActive;

    private String category;

    private String brand;

    private String mass;

    private List<ImageEntity> imageEntity;

    private List<ProductOfCustomerEntity> amountCustomerProductEntities;

    private List<TagsEntity> tagsEntities ;
}
