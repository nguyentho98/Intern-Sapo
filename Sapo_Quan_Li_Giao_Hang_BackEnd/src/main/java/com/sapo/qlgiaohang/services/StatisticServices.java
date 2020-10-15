package com.sapo.qlgiaohang.services;

import com.sapo.qlgiaohang.dto.StatisticDTO;
import org.springframework.stereotype.Service;

@Service
public interface StatisticServices {
    StatisticDTO countStatus();
}
