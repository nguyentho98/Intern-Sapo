package com.sapo.qlgiaohang.dto.address;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class AddressResponse {
    private long totalElement;
    private List<AddressDTO> addressDTOList;

    public AddressResponse(long totalElement, List<AddressDTO> addressDTOList) {
        this.totalElement = totalElement;
        this.addressDTOList = addressDTOList;
    }
}
