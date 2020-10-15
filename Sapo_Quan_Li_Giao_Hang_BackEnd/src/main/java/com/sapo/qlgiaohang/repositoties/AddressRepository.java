package com.sapo.qlgiaohang.repositoties;

import com.sapo.qlgiaohang.dto.address.AddressDTO;
import com.sapo.qlgiaohang.entity.AddressEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AddressRepository extends JpaRepository<AddressEntity,Long> {
    @Query("select p from  AddressEntity p where p.customerEntity.id = :id and p.status=0")
    Page<AddressEntity> getAllShippingFrom(@Param("id") Long id, Pageable pageable);

    @Query("select p from  AddressEntity p where p.status=1")
    Page<AddressEntity> getAllShippingTo(Pageable pageable);

    @Query("select p from  AddressEntity p where p.id=:id")
    AddressEntity getOneCustom(@Param("id")Long id);
}
