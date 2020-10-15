package com.sapo.qlgiaohang.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class StatisticDTO {
    private int storage;
    private int delivered;
    private int delivering;
    private int cancel;
    
    public StatisticDTO(int storage, int delivered, int delivering, int cancel) {
        this.storage = storage;
        this.delivered = delivered;
        this.delivering = delivering;
        this.cancel = cancel;
    }
    
    
}
