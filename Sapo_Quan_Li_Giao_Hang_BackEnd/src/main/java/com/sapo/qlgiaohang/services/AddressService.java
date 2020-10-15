package com.sapo.qlgiaohang.services;

import com.sapo.qlgiaohang.dto.address.AddressDTO;
import com.sapo.qlgiaohang.dto.address.AddressReq;
import com.sapo.qlgiaohang.dto.address.AddressResponse;
import com.sapo.qlgiaohang.entity.AddressEntity;

import java.util.List;

public interface AddressService {
    AddressResponse getAllShippingTo();
    AddressResponse getAllShippingFrom(Long id);
    AddressEntity createShippingTo(AddressReq addressReq);
    AddressEntity createShippingFrom(AddressReq addressReq);
}
