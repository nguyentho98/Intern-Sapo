package com.sapo.qlgiaohang.services;

import com.sapo.qlgiaohang.dto.customer.CustomerDTO;
import com.sapo.qlgiaohang.dto.customer.CustomerRes;
import com.sapo.qlgiaohang.dto.customer.CustomerResponse;
import com.sapo.qlgiaohang.dto.fulfillment.FulfillmentCustomerDTO;
import com.sapo.qlgiaohang.dto.fulfillment.FulfillmentDTO;
import com.sapo.qlgiaohang.entity.CustomerEntity;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CustomerService {
    List<CustomerDTO> fillAll(int page, int limit);
    List<CustomerDTO> filterByStatus(int page, int limit,int status);
    CustomerDTO fillOne(long id);
    CustomerDTO saveOrUpdate(CustomerDTO customerDTO);
    void delete(long[] ids);
    void remove(CustomerDTO[] remove);
    CustomerResponse detailCustomer(long id, int page, int limit);
    FulfillmentDTO detailFulfillment(long id);
    CustomerRes search(int page, int limit, String name);
    CustomerRes searchCustomer(int page, int limit,String name,Boolean status);
    ResponseEntity<?> checkPhone(String phone);
}
