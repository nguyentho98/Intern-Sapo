package com.sapo.qlgiaohang.services;

import com.sapo.qlgiaohang.dto.product.*;
import com.sapo.qlgiaohang.entity.ProductEntity;

public interface ProductService {
    ProductResponse findAll(int page, int limit, FilterRequest filterRequest);

    ProductEntity findOne(Long id);

    Long save(ProductDTO productDTO);

    Long update(ProductDTO productDTO,Long id);

    void delete(Long id);

    ProductBrandResponse getBrand(String brand, long page);

    ProductCategoryResponse getCategory(String cate, long page);

    String[] getTags(String tag);
}
