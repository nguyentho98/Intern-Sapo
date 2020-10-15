package com.sapo.qlgiaohang.repositoties.crosscheck;

import com.sapo.qlgiaohang.dto.acounting.DebtToPayDTO;
import com.sapo.qlgiaohang.dto.acounting.FulfillmentAccountingDTO;
import com.sapo.qlgiaohang.dto.crosscheck.FulfillmentCrossCheckDTO;
import com.sapo.qlgiaohang.dto.crosscheck.ShipperCrossCheckDTO;

import java.util.List;

public interface JdbcCrossCheckRepository {
    List<ShipperCrossCheckDTO> findShipper(String value, int page);

    Long findTotalShipper(String value);

    List<DebtToPayDTO> DebtOfShipper(Long shipperId);
    Long DebtOfShipperCrossCheck(Long shipperId);

    List<FulfillmentCrossCheckDTO> getFulfillment(String value, Long shipperId, int page);

    Long getTotalFulfillment(String value, Long shipperId);

    List<FulfillmentCrossCheckDTO> getFulfillmentOfCross(Long id, String value, int page);

    Long getTotalFulfillmentOfCross(Long id, String value);

}
