package com.sapo.qlgiaohang.repositoties;

import com.sapo.qlgiaohang.dto.shipper.ShipperDTO;
import com.sapo.qlgiaohang.dto.shipper.ShipperFulfillmentDTO;
import com.sapo.qlgiaohang.entity.ShipperEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
public interface ShipperRepository extends JpaRepository<ShipperEntity, Long> {
    @Query(value = "select shipper.id AS id, shipper.code AS code,shipper.charge_area as chargeArea, user.full_name AS name, shipper.phone AS phone, user.email AS email, shipper.address AS address, count(fulfillment.id) as count " +
            "from shipper " +
            "INNER JOIN user ON shipper.user_id = user.id " +
            "left join fulfillment on shipper.id = fulfillment.shipper_id " +
            "where shipping_status<>4 AND shipping_status<>6 " +
            "group by fulfillment.shipper_id", nativeQuery = true)
    List<SS> findAllByIsFulfillment(Pageable pageable);
    
    @Query(value = "select shipper.id AS id, shipper.code AS code,shipper.charge_area as chargeArea, user.full_name AS name, shipper.phone AS phone, user.email AS email, shipper.address AS address, " +
            "(select COUNT(fulfillment.id) from fulfillment where shipping_status<>4 AND shipping_status<>6 AND SUBSTRING(FROM_unixtime(fulfillment.created_on/1000), 1, 10) = :time AND shipper_id = :id) as count " +
            "from shipper " +
            "INNER JOIN user ON shipper.user_id = user.id " +
            "left join fulfillment on shipper.id=fulfillment.shipper_id " +
            "where shipper.id = :id", nativeQuery = true)
    SS findOneShipper(@Param("id") long id, @Param("time") String time);
    
    @Query("select s from ShipperEntity s where s.id = :id")
    ShipperEntity getOneCus(@Param("id") long id);

    interface SS{
        Long getId();
        String getName();
        String getCode();
        String getAddress();
        String getChargeArea();
        String getEmail();
        String getPhone();
        Long getCount();
    }
}
