package com.sapo.qlgiaohang.dto.fulfillment;

import com.sapo.qlgiaohang.dto.fulfillmentAddress.FulfillmentAddressReq;
import com.sapo.qlgiaohang.dto.fulfillmentAddress.FulfillmentAdressDTO;
import com.sapo.qlgiaohang.dto.fulfillmentDetail.FulfillmentDetailReq;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FulfillmentReq {
    private String code;

    private BigDecimal totalMoney;

    private BigDecimal codMoney;

    private String description;

    private Date deliveryDate;

    private BigDecimal transportFee;

    private int shippingMethod;

    private int shippingStatus;

    private int shippingPaymentObject;

    private Long shipper_id;

    private Long customer_id;

    private Long user_id;

    private String userName;

    private FulfillmentAddressReq shippingFrom;

    private FulfillmentAddressReq shippingTo;

    private List<FulfillmentDetailReq> fulfillmentDetailReqs;

}
