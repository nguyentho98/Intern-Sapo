package com.sapo.qlgiaohang.repositoties.crosscheck;

import com.sapo.qlgiaohang.entity.CrossCheckEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CrossCheckRepository extends JpaRepository<CrossCheckEntity, Long> {
    @Query("SELECT  c from CrossCheckEntity c order by c.id desc")
    List<CrossCheckEntity> findAllWithPageable(Pageable pageable);

    @Query("SELECT  c from CrossCheckEntity c where c.id = :id")
    CrossCheckEntity getOneCrossCheck(@Param("id") Long id);

    @Query(value = "select convert(subString_index(code,'DSNV',-1), UNSIGNED INTEGER) as code_max " +
            " from cross_check where code like 'DSNV%' order by code_max desc limit 0,1", nativeQuery = true)
    Long getCodeMax();
}
