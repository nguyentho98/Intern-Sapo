package com.sapo.qlgiaohang.repositoties;

import com.sapo.qlgiaohang.entity.FulfillmentAddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FulfillmentAddressRepository extends JpaRepository<FulfillmentAddressEntity, Long> {
}
