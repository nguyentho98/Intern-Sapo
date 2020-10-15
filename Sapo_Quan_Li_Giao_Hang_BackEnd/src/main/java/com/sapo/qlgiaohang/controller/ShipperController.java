package com.sapo.qlgiaohang.controller;

import com.sapo.qlgiaohang.dto.shipper.ShipperDTO;
import com.sapo.qlgiaohang.dto.shipper.ShipperDTOResponse;
import com.sapo.qlgiaohang.dto.shipper.ShipperFulfillmentDTO;
import com.sapo.qlgiaohang.entity.ShipperEntity;
import com.sapo.qlgiaohang.repositoties.FulfillmentRepository;
import com.sapo.qlgiaohang.repositoties.ShipperRepository;
import com.sapo.qlgiaohang.services.FulfillmentService;
import com.sapo.qlgiaohang.services.ShipperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/shipper")
public class ShipperController {
    @Autowired
    @Qualifier("shipperServiceImpl")
    ShipperService service;

    @Autowired
    FulfillmentService fulfillmentService;

    @Autowired
    ShipperRepository shipperRepository;

    @GetMapping("")
    public List<ShipperDTO> getAll(@RequestParam("page") Optional<Integer> page, @RequestParam("limit") Optional<Integer> limit) {
        return service.findAll(page.orElse(0), limit.orElse(10));
    }

    @GetMapping("/count/fulfillment")
    public ShipperDTOResponse findAllByIsFulfillment(@RequestParam("page") Optional<Integer> page, @RequestParam("limit") Optional<Integer> limit) {
        return service.findAllByIsFulfillment(page.orElse(0), limit.orElse(10));
    }

    @GetMapping("/list")
    public ShipperDTOResponse getListAllShipper(@RequestParam("page") Optional<Integer> page, @RequestParam("limit") Optional<Integer> limit) {
        return service.listAllShipper(page.orElse(0), limit.orElse(10));
    }

    @GetMapping("/{id}")
    public ShipperRepository.SS getOne(@PathVariable long id) {
        return service.findOne(id);
    }

    @PostMapping("")
    public ShipperEntity create(@RequestBody ShipperDTO shipperDTO) {
        return service.save(shipperDTO);
    }
    
    @PutMapping("/{id}")
    public Long update(@PathVariable long id, @RequestBody ShipperDTO shipperDTO) {
        return service.update(shipperDTO, id);
    }

    @DeleteMapping("/{id}")
    public void deleteOne(@PathVariable long id) {
        service.delete(id);
    }

    @GetMapping("/getOne/{id}")
    public ShipperEntity getOneShipper(@PathVariable long id) {
        return shipperRepository.findById(id).get();
    }
}
