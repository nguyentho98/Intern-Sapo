package com.sapo.qlgiaohang.dto.shipper;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ShipperDTOResponse {

    private long totalItem;
    private List<ShipperDTO> shipperDTOList=new ArrayList<>();

    public ShipperDTOResponse(long totalItem, List<ShipperDTO> shipperDTOList) {
        this.totalItem = totalItem;
        this.shipperDTOList = shipperDTOList;
    }
}
