package com.sapo.qlgiaohang.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
public class ReceiptDTO {
    private String note;

    private String tag;

    private String code;

    private int payStatus;

    private int importStatus;

    private Long customerId;

    private List<ProductReceiptDTO> productReceiptDTOS = new ArrayList<>();
}
