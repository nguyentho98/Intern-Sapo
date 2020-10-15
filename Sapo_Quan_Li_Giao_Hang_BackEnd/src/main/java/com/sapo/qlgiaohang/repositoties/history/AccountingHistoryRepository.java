package com.sapo.qlgiaohang.repositoties.history;

import com.sapo.qlgiaohang.entity.tracking.AccountingHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AccountingHistoryRepository extends JpaRepository<AccountingHistoryEntity, Long> {
    @Query("select a from AccountingHistoryEntity a where a.accountingEntity.id = :id")
    List<AccountingHistoryEntity> findHistoryByAccounting(@Param("id")Long id);
}
