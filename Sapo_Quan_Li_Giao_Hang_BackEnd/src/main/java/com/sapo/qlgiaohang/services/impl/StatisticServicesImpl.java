package com.sapo.qlgiaohang.services.impl;

import com.sapo.qlgiaohang.dto.StatisticDTO;
import com.sapo.qlgiaohang.repositoties.StatisticRepository;
import com.sapo.qlgiaohang.services.StatisticServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class StatisticServicesImpl implements StatisticServices {
    @Autowired
    StatisticRepository repository;
    
    @Override
    public StatisticDTO countStatus() {
        LocalDate date = LocalDate.now();
        String time = date.toString();
        return new StatisticDTO(
                repository.countStatus(2, time),
                repository.countStatus(4, time),
                repository.countStatus(3, time),
                repository.countStatus(6, time)
        );
    }
}
