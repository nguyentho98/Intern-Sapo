package com.sapo.qlgiaohang.dto.fulfillment;

import com.sapo.qlgiaohang.entity.FulfillmentAddressEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FulfillmentCustomerDTO {
    private Long id;

    private String code;

    private BigDecimal totalMoney;

    private String description;

    private Long deliveryDate;

    private int shippingStatus;
    
    private int shippingMethod;

    private int paymentStatus;

    private int paymentMethod;

    private BigDecimal transportFee;

    private int shippingPaymentMethod;

    private long shipperId;

    private String shipperName;

    private long customerId;

    private String customerName;

    private String userName;

    private FulfillmentAddressEntity shippingTo;

    private FulfillmentAddressEntity shippingFrom;

//    private String province;
//
//    private String district;
//
//    private String ward;

//    private int addressReceipt;

}
