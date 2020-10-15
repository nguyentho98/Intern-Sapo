package com.sapo.qlgiaohang.repositoties;

import com.sapo.qlgiaohang.entity.product.ProductOfCustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AmountCustomerProductRepository extends JpaRepository<ProductOfCustomerEntity, Long> {

    @Query("select a from ProductOfCustomerEntity a where a.productEntity.id = :productId" +
            " and a.customerEntity.id = :partnerId")
    ProductOfCustomerEntity findByProductAndCustomer(@Param("productId") Long productId,
                                                     @Param("partnerId") Long partnerId);
}
