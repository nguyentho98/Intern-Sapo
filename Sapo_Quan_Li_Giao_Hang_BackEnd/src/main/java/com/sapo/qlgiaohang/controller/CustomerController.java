package com.sapo.qlgiaohang.controller;

import com.sapo.qlgiaohang.dto.customer.CustomerDTO;
import com.sapo.qlgiaohang.dto.customer.CustomerRes;
import com.sapo.qlgiaohang.dto.customer.CustomerResponse;
import com.sapo.qlgiaohang.dto.fulfillment.FulfillmentCustomerDTO;
import com.sapo.qlgiaohang.dto.fulfillment.FulfillmentDTO;
import com.sapo.qlgiaohang.entity.CustomerEntity;
import com.sapo.qlgiaohang.repositoties.CustomerRepository;
import com.sapo.qlgiaohang.services.impl.CustomerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerServiceImpl customerService;

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("")
    public List<CustomerDTO> listCustomer(@RequestParam("page") Optional<Integer> page, @RequestParam("limit") Optional<Integer> limit){
        List<CustomerDTO> list=customerService.fillAll(page.orElse(0),limit.orElse(0));
        return list;
    }

    @GetMapping("/status")
    public List<CustomerDTO> listCustomerByIsActive(@RequestParam("page") Optional<Integer> page, @RequestParam("limit") Optional<Integer> limit, @RequestParam("status") int status){
        List<CustomerDTO> list=customerService.filterByStatus(page.orElse(0),limit.orElse(0),status);
        return list;
    }

    @GetMapping("/id/{id}")
    public CustomerDTO getCustomer(@PathVariable("id") int id){
        CustomerDTO customerDTO =customerService.fillOne(id);
        return customerDTO;
    }

    @GetMapping("/search")
    public ResponseEntity<CustomerRes> searchCustomer(@RequestParam("page") Optional<Integer> page, @RequestParam("limit") Optional<Integer> limit, @RequestParam("name") String name){
        return ResponseEntity.ok(customerService.search(page.orElse(0),limit.orElse(0),name));
    }

    @GetMapping("/totalItem")
    public int totalItem(@RequestParam("status") int status){
        if(status==0){
            int total= customerRepository.totalItemS(status);
            return total;
        }else if(status==1){
            int total= customerRepository.totalItemS(status);
            return total;
        }else {
            int total = customerRepository.totalItem();
            return total;
        }
    }

    @PostMapping()
    public ResponseEntity<CustomerDTO> newCustomer(@RequestBody CustomerDTO model){
                return ResponseEntity.ok(customerService.saveOrUpdate(model));
    }

    @PutMapping()
    public ResponseEntity<CustomerDTO> updateCustomer(@RequestBody CustomerDTO model){
        CustomerDTO customerDTO =customerService.saveOrUpdate(model);
        if(customerDTO !=null ){
            return ResponseEntity.ok(customerDTO);
        }else
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping()
    public void deleteCustomer(@RequestBody long[] ids){
        customerService.delete(ids);
    }

    @PutMapping("/remove")
    public void removeCUS(@RequestBody CustomerDTO[] remove){
        customerService.remove(remove);
    }

    @GetMapping("/idP/{id}")
    public CustomerResponse listOrderDTO(@PathVariable("id") int id, @RequestParam("page") Optional<Integer> page, @RequestParam("limit") Optional<Integer> limit){
        return customerService.detailCustomer(id,page.orElse(0),limit.orElse(0));
    }

    @GetMapping("/fulfillment/{id}")
    public FulfillmentDTO getOrderDTO(@PathVariable("id") int id){
        FulfillmentDTO orderDTO=customerService.detailFulfillment(id);
        return orderDTO;
    }

    @GetMapping("/searchAll")
    public CustomerRes searchCustomerAll(@RequestParam("status") Boolean status,@RequestParam("value") String value,@RequestParam("page") Optional<Integer> page,@RequestParam("limit") Optional<Integer> limit){
        return customerService.searchCustomer(page.orElse(0),limit.orElse(0),value,status);
    }

    @GetMapping("/checkPhone")
    public ResponseEntity<?> checkPhoneCustomer(@RequestParam("phone") String phone){
        return customerService.checkPhone(phone);
    }
}
