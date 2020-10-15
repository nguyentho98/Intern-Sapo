package com.sapo.qlgiaohang.dto.fulfillment;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.sapo.qlgiaohang.dto.auth.UserResDTO;
import com.sapo.qlgiaohang.dto.customer.CustomerDTO;
import com.sapo.qlgiaohang.dto.fulfillmentAddress.FulfillmentAdressDTO;
import com.sapo.qlgiaohang.dto.fulfillmentDetail.FulfillmentDetailDTO;
import com.sapo.qlgiaohang.dto.shipper.ShipperDTO;
import com.sapo.qlgiaohang.entity.FulfillmentTrackingEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FulfillmentFilterDTO {
    private Long id;

    private Long createdOn;

    private Long updatedOn;

    private String code;

    private BigDecimal totalMoney;

    private BigDecimal codMoney;

    private String description;

    private Long deliveryDate;

    private Long cancelationDate;

    private Long successDeliveryDate;

    private int shippingStatus;

    private int paymentStatus;

    private int paymentMethod;

    private int shippingMethod;

    private BigDecimal transportFee;

    private int shippingPaymentObject;

    private ShipperDTO shipperDTO;

    private CustomerDTO customerDTO;

    private UserResDTO userResDTO;

    private Long shippingTo;

    private FulfillmentAdressDTO shippingToOB;
}