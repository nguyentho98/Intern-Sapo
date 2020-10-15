package com.sapo.qlgiaohang.services.impl;

import com.sapo.qlgiaohang.entity.CustomerEntity;
import com.sapo.qlgiaohang.entity.ProductEntity;
import com.sapo.qlgiaohang.entity.product.ProductOfCustomerEntity;
import com.sapo.qlgiaohang.repositoties.AmountCustomerProductRepository;
import com.sapo.qlgiaohang.repositoties.CustomerRepository;
import com.sapo.qlgiaohang.repositoties.ProductRepository;
import com.sapo.qlgiaohang.services.AmountCustomerProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class AmountCustomerProductServiceImpl implements AmountCustomerProductService {
    private AmountCustomerProductRepository amcpr;
    private ProductRepository productRepository;
    private CustomerRepository customerRepository;

    @Autowired
    public AmountCustomerProductServiceImpl(AmountCustomerProductRepository amcpr, ProductRepository productRepository, CustomerRepository customerRepository) {
        this.amcpr = amcpr;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
    }

    @Override
    public ProductOfCustomerEntity findByProductIdAndCustomerId(Long productId, Long customerId) {
        return amcpr.findByProductAndCustomer(productId, customerId);
    }

    @Transactional
    @Override
    public int save(Long productId, Long customerId, Long amount) {
        int stt = -1;
        ProductOfCustomerEntity entity = findByProductIdAndCustomerId(productId, customerId);
        if (entity != null) {
            entity.setQuantity(entity.getQuantity() + amount);
            stt = 0;

        } else {
            try {
                entity = new ProductOfCustomerEntity();
                ProductEntity productEntity = productRepository.findOneCustom(productId);
                CustomerEntity customerEntity = customerRepository.findOneCustom(customerId);
                if (productEntity.getId() == null || customerEntity.getId() == null) {
                    return -1;
                }
                entity.setProductEntity(productEntity);
                entity.setCustomerEntity(customerEntity);
                entity.setCreatedOn(new Date().getTime());
                entity.setQuantity(amount);
                stt = 1;
            } catch (NullPointerException e) {
//               ("Ko co khach hang");
                return -1;
            }

        }
        amcpr.save(entity);
        return stt;
    }
}
