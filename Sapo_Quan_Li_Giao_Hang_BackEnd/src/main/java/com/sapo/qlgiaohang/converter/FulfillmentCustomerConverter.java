package com.sapo.qlgiaohang.converter;

import com.sapo.qlgiaohang.dto.fulfillment.FulfillmentDTO;
import com.sapo.qlgiaohang.entity.FulfillmentEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class FulfillmentCustomerConverter {

    public FulfillmentDTO converteToDTO(FulfillmentEntity fulfillmentEntity){
        ModelMapper modelMapper=new ModelMapper();
        FulfillmentDTO orderDTO=modelMapper.map(fulfillmentEntity,FulfillmentDTO.class);
        return orderDTO;
    }
    public FulfillmentDTO converteToDTO1(FulfillmentEntity fulfillmentEntity){
        FulfillmentDTO orderDTO=new FulfillmentDTO();
        return orderDTO;
    }
}
