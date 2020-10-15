package com.sapo.qlgiaohang.entity.tracking;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sapo.qlgiaohang.entity.AccountingEntity;
import com.sapo.qlgiaohang.entity.BaseEntity;
import com.sapo.qlgiaohang.entity.CrossCheckEntity;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "cross_check_history")
@Data
public class CrossCheckHistoryEntity extends BaseEntity {
    @Column(name = "functions")
    private String functions;

    @Column(name = "action")
    private String action;

    @Column(name = "operator")
    private String operator;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "cross_check_id")
    private CrossCheckEntity crossCheckEntity;
}
