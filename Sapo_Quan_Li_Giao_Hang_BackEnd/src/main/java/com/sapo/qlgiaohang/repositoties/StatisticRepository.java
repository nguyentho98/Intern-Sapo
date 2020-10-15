package com.sapo.qlgiaohang.repositoties;

import com.sapo.qlgiaohang.entity.FulfillmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StatisticRepository extends JpaRepository<FulfillmentEntity, Long> {
    
    @Query(value = "SELECT COUNT(fulfillment.id) FROM fulfillment WHERE fulfillment.shipping_status = :status AND SUBSTRING(FROM_unixtime(fulfillment.created_on/1000), 1, 10) = :time", nativeQuery = true)
    int countStatus(@Param("status") int status, @Param("time") String time);

    @Query(value = "select count(*) as fulsuccess from fulfillment where shipping_status=4 and (created_on>='1602428779059' and updated_on<='1602553554927')",nativeQuery = true)
    int countFulfillmentSuccess();

    @Query(value = "select count(*) as fulsuccess from fulfillment where shipping_status=6 and (created_on>='1602428779059' and updated_on<='1602553554927')",nativeQuery = true)
    int countFulfillmentCancel();

    @Query(value = "select count(*) as cus from customer ",nativeQuery = true)
    int countCustomer();

    @Query(value ="select sum(total_money) as totalMoney from fulfillment where shipping_status=4 and (created_on>='1602428779059' and updated_on<='1602553554927')",nativeQuery = true)
    long totalMoney();
}
