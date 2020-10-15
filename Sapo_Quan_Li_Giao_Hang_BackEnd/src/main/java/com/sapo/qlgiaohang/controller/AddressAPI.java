package com.sapo.qlgiaohang.controller;

import com.sapo.qlgiaohang.dto.address.AddressReq;
import com.sapo.qlgiaohang.dto.address.AddressResponse;
import com.sapo.qlgiaohang.entity.AddressEntity;
import com.sapo.qlgiaohang.services.impl.AddressServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/address")
public class AddressAPI {
    private AddressServiceImpl addressService;

    @Autowired
    public AddressAPI(AddressServiceImpl addressService) {
        this.addressService = addressService;
    }

    @GetMapping("/receipt")
    public AddressResponse getAllAddressReceipt (@RequestParam long id){
        return addressService.getAllShippingFrom(id);
    }

    @GetMapping("/shipping")
    public AddressResponse getAllAddressShipping (){
        return addressService.getAllShippingTo();
    }

    @PostMapping("/shipping")
    public ResponseEntity<?> createShippingTo(@RequestBody AddressReq req) {
        AddressEntity result = addressService.createShippingTo(req);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/receipt")
    public ResponseEntity<?> createShippingFrom(@RequestBody AddressReq req) {
        AddressEntity result = addressService.createShippingFrom(req);
        return ResponseEntity.ok(result);
    }
}
