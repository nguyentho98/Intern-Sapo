package com.sapo.qlgiaohang.dto.customer;

import com.sapo.qlgiaohang.entity.AddressEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {
    private long id;
    private String code;
    private String address;
    private String ward;
    private String district;
    private String province;
    private String phone;
    private String name;
    private boolean active;
    private String email;
    private int totalOrder;
    private int totalItem;
    private long totalElements;

    private Boolean activeU;
    private AddressEntity addressEntity;
    private List<AddressEntity> addressEntityList;
}
