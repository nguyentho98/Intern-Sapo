package com.sapo.qlgiaohang.controller;

import com.sapo.qlgiaohang.dto.fulfillment.*;
import com.sapo.qlgiaohang.entity.FulfillmentEntity;
import com.sapo.qlgiaohang.repositoties.FulfillmentRepository;
import com.sapo.qlgiaohang.services.impl.FulfillmentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/fulfillments")
public class FulfillmentAPI {
    
    private FulfillmentServiceImpl fulfillmentService;
    
    @Autowired
    public FulfillmentAPI(FulfillmentServiceImpl orderService) {
        this.fulfillmentService = orderService;
    }
    
    @GetMapping("")
    public FulfillmentResponse getAll(@RequestParam("status") Optional<Integer> status,
                                      @RequestParam("name") Optional<String> name,
                                      @RequestParam("page") Optional<Integer> page,
                                      @RequestParam("limit") Optional<Integer> limit,
                                      @RequestParam("shipperId") Optional<Long> id
    ) {
        if (id.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request");
        }
        return fulfillmentService.findAllByStatus(page.orElse(0), limit.orElse(10), status.orElse(0), name.orElse(""),id.orElse(0L));
    }
    @PostMapping("/filter")
    public FulfillmentFilterResponse filterFulfillment(@RequestParam int page, @RequestParam int limit, @RequestBody FilterRequest filterRequest) {
        return fulfillmentService.filterFulfillment(page, limit, filterRequest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFulfillmentById(@PathVariable long id) {
        FulfillmentDTO result = fulfillmentService.getOrderById(id);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/receive")
    public ResponseEntity<?> toReceiveFulfilment(@RequestParam("idFulfillment") Long idFulfillment,@RequestParam("idShipper") Long idShipper) {
        Long result = fulfillmentService.toReceiveFulfilment(idFulfillment,idShipper);
        return ResponseEntity.ok(result);
    }

    @PutMapping("/deliver")
    public ResponseEntity<?> toDeliverFulfilment(@RequestParam("idFulfillment") Long idFulfillment,@RequestParam("idShipper") Long idShipper) {
        Long result = fulfillmentService.toDeliverFulfilment(idFulfillment,idShipper);
        return ResponseEntity.ok(result);
    }
    
    @PostMapping("")
    public ResponseEntity<?> createFulfillment(@RequestBody FulfillmentReq req) {
        FulfillmentEntity result = fulfillmentService.createFulfilment(req);
        return ResponseEntity.ok(result);
    }

    @PutMapping("update/status")
    public  ResponseEntity<?> updateStatusFulfillment(@RequestParam("status") int status,@RequestParam("id") Long id,@RequestParam("note") String note){
        FulfillmentDTO fulfillmentDTO =fulfillmentService.updateStatusFulfillment(id,status,note);
        return  ResponseEntity.ok(fulfillmentDTO);
    }

    @PutMapping("update")
    public  ResponseEntity<?> updateFulfillment(@RequestBody FulfillmentDTO fulfillmentDTO){
        FulfillmentDTO result =fulfillmentService.updateFulfillment(fulfillmentDTO);
        return  ResponseEntity.ok(result);
    }

    @PutMapping("update-shipper-fulfillment")
    public  ResponseEntity<?> updateshipperFulfillment(@RequestParam("idFulfillment") Long idFulfillment,@RequestParam("idShipper") Long idShipper){
        FulfillmentDTO result =fulfillmentService.updateshipperFulfillment(idFulfillment,idShipper);
        return  ResponseEntity.ok(result);
    }

    @PutMapping("hand-over-shipping-now")
    public  ResponseEntity<?> handOverShippingNow(@RequestParam("idFulfillment") Long idFulfillment,@RequestParam("note") String note){
        FulfillmentDTO result =fulfillmentService.handOverShippingNow(idFulfillment,note);
        return  ResponseEntity.ok(result);
    }
    @GetMapping("/regulate")
    public FulfillmentResponse regulateFulfillment(@RequestParam("page") int page, @RequestParam("limit") int limit){
        return fulfillmentService.listFulfillmentRegulate(page,limit);
    }

    @GetMapping("/regulate/{id}")
    public FulfillmentDTO getOneRegulateFulfillment(@PathVariable("id") long id){
        return fulfillmentService.getFulfillmentRegulate(id);
    }
}
