package com.sapo.qlgiaohang.repositoties;

import com.sapo.qlgiaohang.entity.ProductEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    @Query("select  p from ProductEntity p where  p.id = :id")
    ProductEntity findOneCustom(@Param("id") Long id);

    @Query("select p from ProductEntity p order by p.id desc")
    List<ProductEntity> findAllCustom(Pageable pageable);

    @Query(value = "select distinct p.brand from products p where p.brand is not null and p.brand <> '' and p.brand like :value limit :page,5" ,nativeQuery = true)
    String[] getBrand(@Param("value")String value,@Param("page") long page);

    @Query(value = "select count(distinct p.brand) from products p where p.brand is not null and p.brand <> '' and p.brand like :value" ,nativeQuery = true)
    Long getTotalBrand(@Param("value")String value);

    @Query(value = "select distinct p.category from products p where p.category is not null and p.category <> '' and p.category like :value limit :page,5" ,nativeQuery = true)
    String[] getCategory(@Param("value")String value,@Param("page") long page);

    @Query(value = "select count(distinct p.category) from products p where p.category is not null and p.category <> '' and p.category like :value" ,nativeQuery = true)
    Long getTotalCategory(@Param("value")String value);

        @Query(value = "select convert(SUBSTRING_INDEX(code,'SP',-1) , UNSIGNED INTEGER) as pz from products where code like 'SP%'  order by pz desc limit 0,1 " ,nativeQuery = true)
    Long getCodeMax();
}
