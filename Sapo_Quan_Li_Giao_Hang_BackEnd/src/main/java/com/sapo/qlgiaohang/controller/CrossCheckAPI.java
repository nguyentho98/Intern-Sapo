package com.sapo.qlgiaohang.controller;

import com.sapo.qlgiaohang.dto.crosscheck.CrossCheckDTO;
import com.sapo.qlgiaohang.entity.CrossCheckEntity;
import com.sapo.qlgiaohang.entity.tracking.CrossCheckHistoryEntity;
import com.sapo.qlgiaohang.services.CrossCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CrossCheckAPI {
    private CrossCheckService crossCheckService;

    @Autowired
    public CrossCheckAPI(CrossCheckService crossCheckService) {
        this.crossCheckService = crossCheckService;
    }

    @GetMapping("/cross-checks")
    public Map<String, Object> findAll(@RequestParam int page, @RequestParam int limit) {
        return crossCheckService.findAll(page, limit);
    }

    @GetMapping("/cross-checks/{id}")
    public CrossCheckEntity findAll(@PathVariable Long id) {
        return crossCheckService.findOne(id);
    }

    @GetMapping("/cross-checks/shippers")
    public Map<String, Object> findShipper(@RequestParam String value, @RequestParam int page) {
        return crossCheckService.findShipper(value, page);
    }

    @GetMapping("/cross-checks/debt")
    public BigDecimal getTotalDebtOfShipper(@RequestParam Long shipperId) {
        return crossCheckService.getTotalDebtOfShipper(shipperId);
    }

    @GetMapping("/cross-checks/fulfillment/{shipperId}")
    public Map<String, Object> getFulfillmentOfShipper(@PathVariable Long shipperId, @RequestParam String value, @RequestParam int page) {
        return crossCheckService.getFulfillmentOfShipper(value, shipperId, page);
    }

    @GetMapping("/cross-checks/fulfillment-cross/{id}")
    public Map<String, Object> getFulfillmentOfCross(@PathVariable Long id, @RequestParam String value, @RequestParam int page) {
        return crossCheckService.getFulfillmentOfCross(id, value, page);
    }

    @PostMapping("/cross-checks")
    public CrossCheckEntity create(@RequestBody CrossCheckDTO crossCheckDTO) {
        return crossCheckService.create(crossCheckDTO);
    }

    @PutMapping("/cross-checks/{id}")
    public CrossCheckEntity create(@RequestBody CrossCheckDTO crossCheckDTO, @PathVariable Long id, @RequestParam int status) {
        return crossCheckService.update(crossCheckDTO, id, status);
    }

    @GetMapping("/cross-checks/history/{id}")
    public List<CrossCheckHistoryEntity> findHistoryOfCross(@PathVariable Long id) {
        return crossCheckService.findHistoryOfCross(id);
    }
}
