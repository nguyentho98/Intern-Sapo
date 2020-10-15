package com.sapo.qlgiaohang.repositoties;

import com.sapo.qlgiaohang.entity.FulfillmentDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FulfillmentDetailRepository extends JpaRepository<FulfillmentDetailEntity,Long> {
    @Query("select f from FulfillmentDetailEntity f where f.id = :id")
    FulfillmentDetailEntity findOneCustom(@Param("id")Long id);
}
