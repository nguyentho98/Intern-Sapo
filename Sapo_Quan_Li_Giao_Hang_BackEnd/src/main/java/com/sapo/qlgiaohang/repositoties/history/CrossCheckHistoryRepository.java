package com.sapo.qlgiaohang.repositoties.history;

import com.sapo.qlgiaohang.entity.tracking.CrossCheckHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CrossCheckHistoryRepository extends JpaRepository<CrossCheckHistoryEntity, Long> {
    @Query("select h from CrossCheckHistoryEntity h where h.crossCheckEntity.id = :id")
    List<CrossCheckHistoryEntity> findHistoryOfCross(@Param("id") Long id);
}
