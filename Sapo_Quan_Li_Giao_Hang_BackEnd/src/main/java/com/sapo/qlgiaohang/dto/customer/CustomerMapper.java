package com.sapo.qlgiaohang.dto.customer;

import com.sapo.qlgiaohang.entity.CustomerEntity;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.NameTokenizers;
import org.springframework.stereotype.Component;

@Component
public class CustomerMapper {

    public CustomerDTO convertCustomerDTO(CustomerEntity customerEntity){
        ModelMapper modelMapper=new ModelMapper();
        modelMapper.getConfiguration().setSourceNameTokenizer(NameTokenizers.CAMEL_CASE);
        CustomerDTO customerDTO =modelMapper.map(customerEntity, CustomerDTO.class);
        return customerDTO;
    }

    public CustomerEntity convertCustomerEntity(CustomerDTO customerDTO){
        ModelMapper modelMapper=new ModelMapper();
        CustomerEntity customerEntity =modelMapper.map(customerDTO, CustomerEntity.class);
        return customerEntity;
    }

    public CustomerDTO convertCustomerDto(CustomerEntity customerEntity){
        CustomerDTO customerDTO =new CustomerDTO();
        customerDTO.setId(customerEntity.getId());
        customerDTO.setCode(customerEntity.getCode());
        customerDTO.setActive(customerEntity.isActive());
        customerDTO.setAddressEntity(customerEntity.getAddressEntity());
        customerDTO.setPhone(customerEntity.getPhone());
        customerDTO.setName(customerEntity.getName());
        customerDTO.setEmail(customerEntity.getEmail());
        return customerDTO;
    }
    public CustomerEntity convertCustomerToEntity(CustomerDTO customerDTO){
        CustomerEntity customerEntity =new CustomerEntity();
        customerEntity.setId(customerDTO.getId());
        customerEntity.setCode(customerDTO.getCode());
        customerEntity.setActive(customerDTO.isActive());
        customerEntity.setAddressEntity(customerDTO.getAddressEntity());
        customerEntity.setPhone(customerDTO.getPhone());
        customerEntity.setName(customerDTO.getName());
        customerEntity.setEmail(customerDTO.getEmail());
        return customerEntity;
    }
}
