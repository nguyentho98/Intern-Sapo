package com.sapo.qlgiaohang.controller;

import com.sapo.qlgiaohang.dto.acounting.AccountingDTO;
import com.sapo.qlgiaohang.dto.acounting.AccountingDTOResponse;
import com.sapo.qlgiaohang.dto.acounting.FulfillmentAccountingDTO;
import com.sapo.qlgiaohang.entity.AccountingEntity;
import com.sapo.qlgiaohang.entity.tracking.AccountingHistoryEntity;
import com.sapo.qlgiaohang.services.AccountingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AccountingAPI {

    private AccountingService accountingService;

    @Autowired
    public AccountingAPI(AccountingService accountingService) {
        this.accountingService = accountingService;
    }

    @GetMapping("/accounting")
    public ResponseEntity<?> findAll(@RequestParam int page, @RequestParam int limit) {
        return new ResponseEntity<>(accountingService.findAllAccounting(page, limit), HttpStatus.OK);
    }

    @GetMapping("/accounting/{id}")
    public AccountingDTOResponse findOne(@PathVariable Long id, @RequestParam int page) {
        return accountingService.findOne(id, page);
    }

    @DeleteMapping("/accounting/{id}")
    public Long cancel(@PathVariable Long id, @RequestParam String userName) {
        return accountingService.cancelAccounting(id, userName);
    }

    @PostMapping("/accounting")
    public AccountingEntity create(@RequestBody AccountingDTO accountingDTO) {
        return accountingService.save(accountingDTO);
    }

    @PutMapping("/accounting/{id}")
    public AccountingEntity update(@RequestBody AccountingDTO accountingDTO, @PathVariable Long id, @RequestParam int status) {
        return accountingService.update(accountingDTO, id, status);
    }

    @GetMapping("/customers")
    public Map<String, Object> get(@RequestParam String value, @RequestParam int page) {
        return accountingService.getCustomerForAccounting(value, page);
    }

    @GetMapping("/total-debt-to-pay")
    public Map<String, Object> getTotalDebtToPay(@RequestParam int customerId) {
        return accountingService.getTotalDebtToPay(customerId);
    }

    @GetMapping("/fulfillment")
    public List<FulfillmentAccountingDTO> getFulfillment(@RequestParam int customerId, @RequestParam int page) {
        return accountingService.getFulfillment(customerId, page);
    }

    @GetMapping("/accounting/history/{id}")
    public List<AccountingHistoryEntity> findHistory(@PathVariable Long id) {
        return accountingService.findHistoryByAccounting(id);
    }

}
