package com.sapo.qlgiaohang.converter;

import com.sapo.qlgiaohang.dto.fulfillment.FulfillmentCustomerDTO;
import com.sapo.qlgiaohang.entity.FulfillmentAddressEntity;
import com.sapo.qlgiaohang.entity.FulfillmentEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class FulfillmentConverter {
    public FulfillmentCustomerDTO converterToDTO(FulfillmentEntity fulfillmentEntity) {
        ModelMapper modelMapper = new ModelMapper();
        FulfillmentCustomerDTO fulfillmentCustomerDTO = modelMapper.map(fulfillmentEntity, FulfillmentCustomerDTO.class);
        if (fulfillmentEntity.getShipperEntity() != null) {
            fulfillmentCustomerDTO.setShipperId(fulfillmentEntity.getShipperEntity().getId());
            fulfillmentCustomerDTO.setShipperName(fulfillmentEntity.getShipperEntity().getUserEntity().getFullName());
        } else {
            fulfillmentCustomerDTO.setShipperId(0);
            fulfillmentCustomerDTO.setShipperName(null);
        }
        fulfillmentCustomerDTO.setCustomerId(fulfillmentEntity.getCustomerEntity().getId());
        fulfillmentCustomerDTO.setCustomerName(fulfillmentEntity.getCustomerEntity().getName());
        fulfillmentCustomerDTO.setUserName(fulfillmentEntity.getUserEntity().getFullName());
        fulfillmentEntity.getFulfillmentShippingFrom().setFulfillmentShippingFromEntities(null);
        fulfillmentEntity.getFulfillmentShippingFrom().setFulfillmentShippingToEntities(null);
        fulfillmentEntity.getFulfillmentShippingTo().setFulfillmentShippingFromEntities(null);
        fulfillmentEntity.getFulfillmentShippingTo().setFulfillmentShippingToEntities(null);
        fulfillmentCustomerDTO.setShippingFrom(fulfillmentEntity.getFulfillmentShippingFrom());
        fulfillmentCustomerDTO.setShippingTo(fulfillmentEntity.getFulfillmentShippingTo());
        return fulfillmentCustomerDTO;
    }
}
