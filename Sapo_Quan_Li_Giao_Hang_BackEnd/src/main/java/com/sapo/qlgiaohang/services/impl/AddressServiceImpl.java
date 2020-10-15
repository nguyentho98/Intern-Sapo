package com.sapo.qlgiaohang.services.impl;

import com.sapo.qlgiaohang.dto.address.AddressDTO;
import com.sapo.qlgiaohang.dto.address.AddressMapper;
import com.sapo.qlgiaohang.dto.address.AddressReq;
import com.sapo.qlgiaohang.dto.address.AddressResponse;
import com.sapo.qlgiaohang.entity.AddressEntity;
import com.sapo.qlgiaohang.entity.CustomerEntity;
import com.sapo.qlgiaohang.repositoties.AddressRepository;
import com.sapo.qlgiaohang.services.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {
    private AddressRepository addressRepository;
    @Autowired
    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }
    @Override
    public AddressResponse getAllShippingTo() {
        Pageable pageable = PageRequest.of(0,30);
        Page<AddressEntity> addressEntities=addressRepository.getAllShippingTo(pageable);

        List<AddressDTO> result=new ArrayList<AddressDTO>();
        for (AddressEntity category:addressEntities){
            result.add(AddressMapper.toAddressDTO(category));
        }
        return new AddressResponse(addressEntities.getTotalElements(), result);
    }

    @Override
    public AddressResponse getAllShippingFrom(Long id) {
        Pageable pageable = PageRequest.of(0,30);
        Page<AddressEntity> addressEntities=addressRepository.getAllShippingFrom(id,pageable);
        List<AddressDTO> result=new ArrayList<AddressDTO>();
        for (AddressEntity category:addressEntities){
            result.add(AddressMapper.toAddressDTO(category));
        }
        return new AddressResponse(addressEntities.getTotalElements(), result);
    }
    @Override
    public AddressEntity createShippingTo(AddressReq addressReq){
        AddressEntity tmp= new AddressEntity();
        tmp.setCreatedOn(new Date().getTime());
        tmp.setUpdatedOn(new Date().getTime());
        tmp.setWard(addressReq.getWard());
        tmp.setDistrict(addressReq.getDistrict());
        tmp.setProvince(addressReq.getProvince());
        tmp.setAddress(addressReq.getAddress());
        tmp.setName(addressReq.getName());
        tmp.setPhone(addressReq.getPhone());
        tmp.setStatus(1);
        addressRepository.save(tmp);
        return tmp;
    }
    @Override
    public AddressEntity createShippingFrom(AddressReq addressReq){
        AddressEntity tmp= new AddressEntity();
        tmp.setWard(addressReq.getWard());
        tmp.setDistrict(addressReq.getDistrict());
        tmp.setProvince(addressReq.getProvince());
        tmp.setAddress(addressReq.getAddress());
        tmp.setName(addressReq.getName());
        tmp.setPhone(addressReq.getPhone());
        if(addressReq.getCustomer_id() != null){
            CustomerEntity customerEntity= new CustomerEntity();
            customerEntity.setId(addressReq.getCustomer_id());
            tmp.setCustomerEntity(customerEntity);
        }else{
            tmp.setCustomerEntity(null);
        }
        tmp.setStatus(0);
        addressRepository.save(tmp);
        return tmp;
    }
}
