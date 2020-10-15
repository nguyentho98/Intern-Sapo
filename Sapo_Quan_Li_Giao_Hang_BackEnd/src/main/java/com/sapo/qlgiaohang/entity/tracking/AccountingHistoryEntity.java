package com.sapo.qlgiaohang.entity.tracking;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sapo.qlgiaohang.entity.AccountingEntity;
import com.sapo.qlgiaohang.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Entity
@Table(name = "accounting_history")
@Getter
@Setter
public class AccountingHistoryEntity extends BaseEntity {
    @Column(name = "functions")
    private String functions;

    @Column(name = "action")
    private String action;

    @Column(name = "operator")
    private String operator;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "accounting_id")
    private AccountingEntity accountingEntity;
}
