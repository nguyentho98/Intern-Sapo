package com.sapo.qlgiaohang.dto.fulfillment;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.sapo.qlgiaohang.dto.address.AddressDTO;
import com.sapo.qlgiaohang.dto.auth.UserResDTO;
import com.sapo.qlgiaohang.dto.customer.CustomerDTO;
import com.sapo.qlgiaohang.dto.fulfillmentDetail.FulfillmentDetailDTO;
import com.sapo.qlgiaohang.dto.fulfillmentAddress.FulfillmentAdressDTO;
import com.sapo.qlgiaohang.dto.shipper.ShipperDTO;
import com.sapo.qlgiaohang.entity.*;
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
public class FulfillmentDTO {
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
    
    private int shippingMethod;

    private int paymentStatus;

    private int paymentMethod;

    private BigDecimal transportFee;

    private int shippingPaymentObject;

    private ShipperDTO shipperDTO;

    private CustomerDTO customerDTO;

    private List<FulfillmentDetailDTO> fulfillmentDetailDTOList;

    private UserResDTO userResDTO;

    private List<FulfillmentTrackingEntity> fulfillmentTrackingEntities;

    private FulfillmentAdressDTO shippingFrom;

    private FulfillmentAddressEntity shippingFromEntity;

    private FulfillmentAdressDTO shippingTo;

    private FulfillmentAddressEntity shippingToEntity;

    //    private AccountingEntity accountingEntity;
}