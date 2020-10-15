package com.sapo.qlgiaohang.controller;

import com.sapo.qlgiaohang.dto.StatisticDTO;
import com.sapo.qlgiaohang.dto.StatisticDTOResponse;
import com.sapo.qlgiaohang.repositoties.StatisticRepository;
import com.sapo.qlgiaohang.services.StatisticServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/statistic")
public class StatisticController {
    
    @Qualifier("statisticServicesImpl")
    @Autowired
    StatisticServices services;
    @Autowired
    StatisticRepository statisticRepository;
    
    @GetMapping("")
    public StatisticDTO count() {
        return services.countStatus();
    }

    @GetMapping("/report")
    public ResponseEntity<StatisticDTOResponse> report() {
        StatisticDTOResponse s=new StatisticDTOResponse();
        s.setTotalCUS(statisticRepository.countCustomer());
        s.setTotalFULSuccess(statisticRepository.countFulfillmentSuccess());
        s.setTotalFULCancel(statisticRepository.countFulfillmentCancel());
        s.setTotalMoney(statisticRepository.totalMoney());
        return ResponseEntity.ok(s);
    }
}
