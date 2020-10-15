package com.sapo.qlgiaohang.dto;

import lombok.Data;

@Data
public class StatisticDTOResponse {
    private int totalFULSuccess;
    private int totalFULCancel;
    private int totalCUS;
    private long totalMoney;
}
