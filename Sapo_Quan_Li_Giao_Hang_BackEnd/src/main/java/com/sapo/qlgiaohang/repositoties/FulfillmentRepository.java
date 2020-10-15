package com.sapo.qlgiaohang.repositoties;

import com.sapo.qlgiaohang.entity.FulfillmentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FulfillmentRepository extends JpaRepository<FulfillmentEntity, Long> {
    FulfillmentEntity findByCode(String code);

    @Query("select o from FulfillmentEntity o where o.id = :id")
    FulfillmentEntity getOne(@Param("id") long id);
    
    @Query("select o from FulfillmentEntity o where o.fulfillmentShippingTo.name like %:name%")
    Page<FulfillmentEntity> findAll(@Param("name") String name, Pageable pageable);
    
    @Query("select o from FulfillmentEntity o where o.shippingStatus = :status and o.fulfillmentShippingTo.name like %:name%")
    Page<FulfillmentEntity> getAllByStatus(@Param("status") int status, @Param("name") String name, Pageable pageable);
    //Shipper function
    @Query("select o from FulfillmentEntity o where o.shipperEntity.id = :shipperId and o.fulfillmentShippingTo.name like %:name%")
    Page<FulfillmentEntity> findAllByShipper(@Param("name") String name,@Param("shipperId") Long shipperId, Pageable pageable);
    
    @Query("select o from FulfillmentEntity o where o.shipperEntity.id = :shipperId and o.shippingStatus = :status and o.fulfillmentShippingTo.name like %:name%")
    Page<FulfillmentEntity> findAllStatusByShipper(@Param("status") int status, @Param("name") String name,@Param("shipperId") Long shipperId, Pageable pageable);
    //End
   
    
    @Query(value = "select p from FulfillmentEntity as p where p.customerEntity.id = :customerId")
    Page<FulfillmentEntity> getOneByCustomerId(@Param("customerId") long customerId,Pageable pageable);

    @Query(value = "select sum(p.totalMoney) from FulfillmentEntity as p where p.customerEntity.id = :customerId")
    Double totalMoney(@Param("customerId") long customerId);

    @Query(value="select count(*) from fulfillment where shipper_id= :id and shipping_status=3",nativeQuery = true)
    int totalFulfillment(@Param("id") long id);

    @Query(value = "select convert(SUBSTRING_INDEX(code,'FUL',-1) , UNSIGNED INTEGER) as c from fulfillment where code like '%FUL%'  order by c desc limit 0,1",nativeQuery = true)
    Long getCodeMax(); 

    @Query(value = "select * from fulfillment where (shipping_status=2 or shipping_status=1) and shipper_id is null order by id desc ",nativeQuery = true)
    Page<FulfillmentEntity> getFulfillmentRegulate(Pageable pageable);

    @Query(value = "select * from fulfillment where (shipping_status=2 or shipping_status=1) and shipper_id is null and id=:id",nativeQuery = true)
    FulfillmentEntity getOneFulfillmentRegulate(@Param("id") long id);
}
