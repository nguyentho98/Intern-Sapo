package com.sapo.qlgiaohang.dto.acounting;

import com.sapo.qlgiaohang.entity.AccountingEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AccountingResponse {
    private List<AccountingEntity> accountingEntities;
    private Long total;
}
