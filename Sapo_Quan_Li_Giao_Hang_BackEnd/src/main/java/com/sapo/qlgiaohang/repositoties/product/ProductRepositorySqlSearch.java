package com.sapo.qlgiaohang.repositoties.product;

import com.sapo.qlgiaohang.dto.product.FilterRequest;
import com.sapo.qlgiaohang.dto.product.ProductDTO;
import com.sapo.qlgiaohang.dto.product.ProductResponse;
import org.springframework.data.domain.Pageable;

public interface ProductRepositorySqlSearch {
   ProductResponse filterProducts(FilterRequest filterRequest, int page,int limit);

   ProductDTO findOne(Long id);
}
