package com.sapo.qlgiaohang.repositoties.coordination;

import com.sapo.qlgiaohang.entity.FulfillmentEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FulfillmentCoordinationRepository extends JpaRepository<FulfillmentEntity,Long> {
    @Query("select f from FulfillmentEntity f where f.shipperEntity is null and f.shippingStatus <> 4")
    List<FulfillmentEntity> findFulfillmentEntitiesNonCoordination(Pageable pageable);

    @Query("select count(f) from FulfillmentEntity f where f.shipperEntity is null and f.shippingStatus <> 4")
    Long findCountNonCoordination();
}
