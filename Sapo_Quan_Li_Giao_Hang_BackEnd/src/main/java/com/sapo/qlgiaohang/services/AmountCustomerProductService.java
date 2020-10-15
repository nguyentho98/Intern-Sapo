package com.sapo.qlgiaohang.services;

import com.sapo.qlgiaohang.entity.product.ProductOfCustomerEntity;

public interface AmountCustomerProductService {
    ProductOfCustomerEntity findByProductIdAndCustomerId(Long productId, Long customerId);

//    AmountCustomerProductEntity findByPartner(Long productId, Long customerId);

    int save(Long productId, Long customerId, Long amount);
}
