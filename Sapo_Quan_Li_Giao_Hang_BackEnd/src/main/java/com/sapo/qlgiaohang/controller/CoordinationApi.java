package com.sapo.qlgiaohang.controller;

import com.sapo.qlgiaohang.services.FulfillmentCoordinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CoordinationApi {
    FulfillmentCoordinationService fulfillmentCoordinationService;

    @Autowired
    public CoordinationApi(FulfillmentCoordinationService fulfillmentCoordinationService) {
        this.fulfillmentCoordinationService = fulfillmentCoordinationService;
    }

    @GetMapping("/coor")
    public void g(){
        fulfillmentCoordinationService.fastCoordinate();
    }
}
