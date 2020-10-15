package com.sapo.qlgiaohang.services;

import com.sapo.qlgiaohang.dto.fulfillment.*;
import com.sapo.qlgiaohang.entity.FulfillmentDetailEntity;
import com.sapo.qlgiaohang.entity.FulfillmentEntity;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public interface FulfillmentService {
    
    FulfillmentResponse findAll(int page, int limit, String name);

    FulfillmentFilterResponse filterFulfillment(int page, int limit, FilterRequest filterRequest);

    FulfillmentDTO getOrderById(long id);

    FulfillmentEntity createFulfilment(FulfillmentReq req);
    
    FulfillmentResponse findAllByStatus(int page, int limit, int status, String name, Long shipperId);

    Long toReceiveFulfilment(Long idFulfillment,Long idShipper);

//    Long updateQuantity(Long idFulfillment);

    Long toDeliverFulfilment(Long idFulfillment,Long idShipper);

    FulfillmentDTO updateStatusFulfillment(Long id,int status,String note);

    FulfillmentDTO updateFulfillment(FulfillmentDTO fulfillmentDTO);

    FulfillmentDTO handOverShippingNow(Long idFulfillmet,String note);

    FulfillmentResponse listFulfillmentRegulate(int page,int limit);

    FulfillmentDTO updateshipperFulfillment(Long idFulfillmet,Long idShipper);

    FulfillmentDTO getFulfillmentRegulate(long id);

}
