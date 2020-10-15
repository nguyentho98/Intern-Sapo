package com.sapo.qlgiaohang.dto.acounting;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerAccountingDTO {
    private long id;
    private String code;
    private String address;
    private String phone;
    private String name;
    private Boolean isActive;
    private String email;
}
