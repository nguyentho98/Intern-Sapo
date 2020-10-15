package com.sapo.qlgiaohang.dto.fulfillment;

import com.sapo.qlgiaohang.dto.address.AddressDTO;
import com.sapo.qlgiaohang.dto.auth.UserResDTO;
import com.sapo.qlgiaohang.dto.customer.CustomerDTO;
import com.sapo.qlgiaohang.dto.fulfillmentDetail.FulfillmentDetailDTO;
import com.sapo.qlgiaohang.dto.fulfillmentAddress.FulfillmentAdressDTO;
import com.sapo.qlgiaohang.dto.product.ProductDTO;
import com.sapo.qlgiaohang.dto.shipper.ShipperDTO;
import com.sapo.qlgiaohang.entity.FulfillmentAddressEntity;
import com.sapo.qlgiaohang.entity.FulfillmentDetailEntity;
import com.sapo.qlgiaohang.entity.FulfillmentEntity;
import com.sapo.qlgiaohang.entity.FulfillmentTrackingEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class FulfillmentMapper {

    public static FulfillmentDTO toFulfillmentDTO(FulfillmentEntity entity) {
        FulfillmentDTO tmp = new FulfillmentDTO();
        tmp.setId(entity.getId());
        tmp.setCreatedOn(entity.getCreatedOn());
        if (entity.getUpdatedOn() != null){
            tmp.setUpdatedOn(entity.getUpdatedOn());
        }else{
            tmp.setUpdatedOn(null);
        }
        tmp.setCode(entity.getCode());
        tmp.setTotalMoney(entity.getTotalMoney());
        tmp.setCodMoney(entity.getCodMoney());
        tmp.setDescription(entity.getDescription());
        tmp.setDeliveryDate(entity.getDeliveryDate());
        tmp.setShippingMethod(entity.getShippingMethod());

        if(entity.getCancelDate() != null){
            tmp.setCancelationDate(entity.getCancelDate());
        }else{
            tmp.setCancelationDate(null);
        }
        if(entity.getSuccessDeliveryDate() != null){
            tmp.setSuccessDeliveryDate(entity.getSuccessDeliveryDate());
        }else{
            tmp.setSuccessDeliveryDate(null);
        }
        tmp.setShippingStatus(entity.getShippingStatus());
        tmp.setPaymentMethod(entity.getPaymentMethod());
        tmp.setPaymentStatus(entity.getPaymentStatus());
        tmp.setTransportFee(entity.getTransportFee());
        tmp.setShippingPaymentObject(entity.getShippingPaymentObject());

        if(entity.getShipperEntity() != null){
            ShipperDTO shipperDTO = new ShipperDTO();
            shipperDTO.setId(entity.getShipperEntity().getId());
            shipperDTO.setCode(entity.getShipperEntity().getCode());
            shipperDTO.setEmail(entity.getShipperEntity().getUserEntity().getEmail());
            shipperDTO.setName(entity.getShipperEntity().getUserEntity().getFullName());
            shipperDTO.setAddress(entity.getShipperEntity().getAddress());
            shipperDTO.setChargeArea(entity.getShipperEntity().getChargeArea());
            shipperDTO.setPhone(entity.getShipperEntity().getPhone());
            shipperDTO.setIsActive(entity.getShipperEntity().getIsActive());
            tmp.setShipperDTO(shipperDTO);
        }else{
            tmp.setShipperDTO(null);
        }
        FulfillmentAdressDTO fulfillmentShippingFrom = new FulfillmentAdressDTO();
        fulfillmentShippingFrom.setId(entity.getFulfillmentShippingFrom().getId());
        fulfillmentShippingFrom.setAddress(entity.getFulfillmentShippingFrom().getAddress());
        fulfillmentShippingFrom.setWard(entity.getFulfillmentShippingFrom().getWard());
        fulfillmentShippingFrom.setDistrict(entity.getFulfillmentShippingFrom().getDistrict());
        fulfillmentShippingFrom.setProvince(entity.getFulfillmentShippingFrom().getProvince());
        fulfillmentShippingFrom.setPhone(entity.getFulfillmentShippingFrom().getPhone());
        fulfillmentShippingFrom.setName(entity.getFulfillmentShippingFrom().getName());
        tmp.setShippingFrom(fulfillmentShippingFrom);

        FulfillmentAdressDTO fulfillmentShippingTo = new FulfillmentAdressDTO();
        fulfillmentShippingTo.setId(entity.getFulfillmentShippingTo().getId());
        fulfillmentShippingTo.setAddress(entity.getFulfillmentShippingTo().getAddress());
        fulfillmentShippingTo.setWard(entity.getFulfillmentShippingTo().getWard());
        fulfillmentShippingTo.setDistrict(entity.getFulfillmentShippingTo().getDistrict());
        fulfillmentShippingTo.setProvince(entity.getFulfillmentShippingTo().getProvince());
        fulfillmentShippingTo.setPhone(entity.getFulfillmentShippingTo().getPhone());
        fulfillmentShippingTo.setName(entity.getFulfillmentShippingTo().getName());
        tmp.setShippingTo(fulfillmentShippingTo);


        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setId(entity.getCustomerEntity().getId());
        customerDTO.setCode(entity.getCustomerEntity().getCode());
        customerDTO.setPhone(entity.getCustomerEntity().getPhone());
        customerDTO.setName(entity.getCustomerEntity().getName());
        tmp.setCustomerDTO(customerDTO);

        UserResDTO userResDTO = new UserResDTO();
        userResDTO.setId(entity.getUserEntity().getId());
        userResDTO.setFullName(entity.getUserEntity().getFullName());
        tmp.setUserResDTO(userResDTO);


        List<FulfillmentDetailDTO> fulfillmentDetailDTOS = new ArrayList<>();
        for (FulfillmentDetailEntity fulfillmentDetailEntity : entity.getFulfillmentDetails()) {
            FulfillmentDetailDTO fulfillmentDetailDTO = new FulfillmentDetailDTO();
            fulfillmentDetailDTO.setQuantity(fulfillmentDetailEntity.getQuantity());
            fulfillmentDetailDTO.setPrice(fulfillmentDetailEntity.getPrice());

            ProductDTO productDTO = new ProductDTO();
            productDTO.setCode(fulfillmentDetailEntity.getProduct().getCode());
            productDTO.setName(fulfillmentDetailEntity.getProduct().getName());
            productDTO.setProductPrice(fulfillmentDetailEntity.getProduct().getProductPrice());
            productDTO.setMass(fulfillmentDetailEntity.getProduct().getMass());
            fulfillmentDetailDTO.setProductDTO(productDTO);

            fulfillmentDetailDTOS.add(fulfillmentDetailDTO);
        }
        tmp.setFulfillmentDetailDTOList(fulfillmentDetailDTOS);
        List<FulfillmentTrackingEntity> historyDialogEntities = new ArrayList<>();
        for (FulfillmentTrackingEntity fulfillmentTrackingEntity : entity.getFulfillmentTrackingEntities()) {
            FulfillmentTrackingEntity fulfillmentTrackingEntity1 = new FulfillmentTrackingEntity();
            fulfillmentTrackingEntity1.setId(fulfillmentTrackingEntity.getId());
            fulfillmentTrackingEntity1.setName(fulfillmentTrackingEntity.getName());
            fulfillmentTrackingEntity1.setAction(fulfillmentTrackingEntity.getAction());
            fulfillmentTrackingEntity1.setNote(fulfillmentTrackingEntity.getNote());
            fulfillmentTrackingEntity1.setCreatedOn(fulfillmentTrackingEntity.getCreatedOn());
            historyDialogEntities.add(fulfillmentTrackingEntity1);
        }
        tmp.setFulfillmentTrackingEntities(historyDialogEntities);
        return tmp;
    }

    public FulfillmentDTO toFulfillmentDto(FulfillmentEntity entity) {
        FulfillmentDTO tmp = new FulfillmentDTO();
        tmp.setId(entity.getId());
        tmp.setCreatedOn(entity.getCreatedOn());
        if (entity.getUpdatedOn() != null){
            tmp.setUpdatedOn(entity.getUpdatedOn());
        }else{
            tmp.setUpdatedOn(null);
        }
        tmp.setCode(entity.getCode());
        tmp.setTotalMoney(entity.getTotalMoney());
        tmp.setCodMoney(entity.getCodMoney());
        tmp.setDescription(entity.getDescription());
        tmp.setDeliveryDate(entity.getDeliveryDate());
        tmp.setShippingMethod(entity.getShippingMethod());
        if(entity.getCancelDate() != null){
            tmp.setCancelationDate(entity.getCancelDate());
        }else{
            tmp.setCancelationDate(null);
        }
        if(entity.getSuccessDeliveryDate() != null){
            tmp.setSuccessDeliveryDate(entity.getSuccessDeliveryDate());
        }else{
            tmp.setSuccessDeliveryDate(null);
        }
        tmp.setShippingStatus(entity.getShippingStatus());
        tmp.setPaymentMethod(entity.getPaymentMethod());
        tmp.setPaymentStatus(entity.getPaymentStatus());
        tmp.setTransportFee(entity.getTransportFee());
        tmp.setShippingPaymentObject(entity.getShippingPaymentObject());

        if(entity.getShipperEntity() != null){
            ShipperDTO shipperDTO = new ShipperDTO();
            shipperDTO.setId(entity.getShipperEntity().getId());
            shipperDTO.setCode(entity.getShipperEntity().getCode());
            shipperDTO.setName(entity.getShipperEntity().getUserEntity().getFullName());
            tmp.setShipperDTO(shipperDTO);
        }else{
            tmp.setShipperDTO(null);
        }
        entity.getFulfillmentShippingTo().setFulfillmentShippingToEntities(null);
        entity.getFulfillmentShippingFrom().setFulfillmentShippingToEntities(null);
        entity.getFulfillmentShippingTo().setFulfillmentShippingFromEntities(null);
        entity.getFulfillmentShippingFrom().setFulfillmentShippingFromEntities(null);
        tmp.setShippingFromEntity(entity.getFulfillmentShippingFrom());
        tmp.setShippingToEntity(entity.getFulfillmentShippingTo());
        return tmp;
    }
}
