package com.sapo.qlgiaohang.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "statistics")
@Data
public class StatisticsEntity extends BaseEntity {
    
    @Column(name = "month")
    private String month;
    
    @Column(name = "was_delivered")
    private int wasDelivered;
    
    @Column(name = "canceled")
    private int canceled;
    
    @Column(name = "total_money")
    private long totalMoney;
}
