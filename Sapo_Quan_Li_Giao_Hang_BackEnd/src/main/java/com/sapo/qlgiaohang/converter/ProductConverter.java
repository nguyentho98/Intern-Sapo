package com.sapo.qlgiaohang.converter;

import com.sapo.qlgiaohang.dto.product.ProductDTO;
import com.sapo.qlgiaohang.entity.ProductEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ProductConverter {

    public ProductDTO convertToDTO(ProductEntity entity) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(entity, ProductDTO.class);
    }
}
