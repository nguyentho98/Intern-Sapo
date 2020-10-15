package com.sapo.qlgiaohang.repositoties.accounting;

import com.sapo.qlgiaohang.entity.AccountingEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AccountingRepository extends JpaRepository<AccountingEntity, Long> {
    @Query("select a from AccountingEntity a where a.id = :id")
    AccountingEntity findOneCustom(@Param("id") Long id);

    @Query("select a from AccountingEntity a order by a.id desc ")
    List<AccountingEntity> findAllWithPage(Pageable pageable);

    @Query(value = "select convert(subString_index(code,'DSKH',-1), UNSIGNED INTEGER) as code_max\n" +
            " from accounting where code like 'DSKH%' order by code_max desc limit 0,1", nativeQuery = true)
    Long getCodeAccountingMax();
}
