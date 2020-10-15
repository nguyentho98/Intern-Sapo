package com.sapo.qlgiaohang.services;

import com.sapo.qlgiaohang.dto.crosscheck.CrossCheckDTO;
import com.sapo.qlgiaohang.entity.CrossCheckEntity;
import com.sapo.qlgiaohang.entity.tracking.CrossCheckHistoryEntity;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface CrossCheckService {
    Map<String, Object> findAll(int page, int limit);

    CrossCheckEntity findOne(Long id);

    Map<String, Object> findShipper(String value, int page);

    BigDecimal getTotalDebtOfShipper(Long shipperId);

    Map<String, Object> getFulfillmentOfShipper(String value, Long shipperId, int page);

    CrossCheckEntity create(CrossCheckDTO crossCheckDTO);

    CrossCheckEntity update(CrossCheckDTO crossCheckDTO, Long id, int status);

    Map<String, Object> getFulfillmentOfCross(Long id, String value, int page);

    List<CrossCheckHistoryEntity> findHistoryOfCross(Long id);
}
