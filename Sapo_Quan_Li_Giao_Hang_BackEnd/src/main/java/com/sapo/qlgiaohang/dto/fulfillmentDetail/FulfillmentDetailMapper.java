package com.sapo.qlgiaohang.dto.fulfillmentDetail;

import com.sapo.qlgiaohang.dto.fulfillment.FulfillmentDTO;
import com.sapo.qlgiaohang.dto.product.ProductDTO;
import com.sapo.qlgiaohang.entity.FulfillmentDetailEntity;

public class FulfillmentDetailMapper {
    public static FulfillmentDetailDTO listProductOrderDTO(FulfillmentDetailEntity entity){
        FulfillmentDetailDTO tmp= new FulfillmentDetailDTO();
        tmp.setPrice(entity.getPrice());
        tmp.setQuantity(entity.getQuantity());

        ProductDTO productDTO= new ProductDTO();
        productDTO.setCode(entity.getProduct().getCode());
        productDTO.setName(entity.getProduct().getName());
        tmp.setProductDTO(productDTO);

        FulfillmentDTO orderDTO= new FulfillmentDTO();
        orderDTO.setCode(entity.getFulfillmentEntity().getCode());
        tmp.setOrderDTO(orderDTO);
        return tmp;
    }
}
