package com.sapo.qlgiaohang.repositoties;

import com.sapo.qlgiaohang.entity.CustomerEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface CustomerRepository extends JpaRepository<CustomerEntity,Long> {

    CustomerEntity findByPhone(String phone);

    @Query(value="select * from customer where is_Active = :status",nativeQuery = true)
    Page<CustomerEntity> findAllByIsActive(@Param("status") int status, Pageable pageable);

    @Query(value="select c from CustomerEntity c where c.name like :name and c.isActive = :status")
    Page<CustomerEntity> searchCustomer(@Param("status") Boolean status,@Param("name") String name, Pageable pageable);

    @Query("select p from  CustomerEntity  p where p.id = :id")
    CustomerEntity findOneCustom(@Param("id") Long id);

    CustomerEntity findByCode(String code);

    @Query("select c from CustomerEntity c where c.name like :name" )
    Page<CustomerEntity> searchName(@Param("name") String name, Pageable pageable);

    @Query("select count(p) from CustomerEntity p")
    int totalItem();

    @Query(value="select count(*) from customer where is_Active = :status",nativeQuery=true)
    int totalItemS(@Param("status") int status);

    @Modifying
    @Transactional
    @Query(value="update customer set is_active = :active where id = :id",nativeQuery=true)
    void remove(@Param("active") Boolean active,@Param("id") long id);

    @Query(value = "select convert(SUBSTRING_INDEX(code,'CUS',-1) , UNSIGNED INTEGER) as c from customer where code like '%CUS%'  order by c desc limit 0,1",nativeQuery = true)
    Long getCodeMax();
}
