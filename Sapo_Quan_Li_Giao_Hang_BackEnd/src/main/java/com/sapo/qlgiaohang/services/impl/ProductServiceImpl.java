package com.sapo.qlgiaohang.services.impl;

import com.sapo.qlgiaohang.dto.product.*;
import com.sapo.qlgiaohang.entity.ImageEntity;
import com.sapo.qlgiaohang.entity.ProductEntity;
import com.sapo.qlgiaohang.entity.TagsEntity;
import com.sapo.qlgiaohang.repositoties.ImageRepository;
import com.sapo.qlgiaohang.repositoties.ProductRepository;
import com.sapo.qlgiaohang.repositoties.TagRepository;
import com.sapo.qlgiaohang.repositoties.product.ProductRepositorySqlSearch;
import com.sapo.qlgiaohang.services.ProductService;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import utils.ConvertCode;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;
    private ProductRepositorySqlSearch productRepositorySqlSearch;
    private TagRepository tagRepository;
    private Long codeMax;
    private ImageRepository ima;


    @Autowired
    public ProductServiceImpl(ImageRepository ima, ProductRepository productRepository, ProductRepositorySqlSearch productRepositorySqlSearch, TagRepository tagRepository) {
        try {
            this.productRepository = productRepository;
            this.productRepositorySqlSearch = productRepositorySqlSearch;
            this.tagRepository = tagRepository;
            this.ima = ima;
        } finally {
            codeMax = productRepository.getCodeMax();
            if (codeMax == null) {
                codeMax = 0L;
            }

        }
    }

    @Override
    public ProductResponse findAll(int page, int limit, FilterRequest filterRequest) {
        return productRepositorySqlSearch.filterProducts(filterRequest, page, limit);
    }

    @Override
    public ProductEntity findOne(Long id) {
        return productRepository.findOneCustom(id);

    }

    @Transactional
    @Override
    public Long save(ProductDTO productDTO) {
        ProductEntity productEntity = new ProductEntity();
        BeanUtils.copyProperties(productDTO, productEntity);
        setProductTags(productDTO, productEntity);
        if (ConvertCode.convertCode(codeMax, productDTO.getCode(), "SP").startsWith("SP")) {
            codeMax += 1;
        }
        productEntity.setCode(ConvertCode.convertCode(codeMax, productDTO.getCode(), "SP"));
        productEntity.setCreatedOn(new Date().getTime());
        SetImageProduct(productDTO, productEntity);
        productEntity.setIsActive(true);
        productEntity.setTransactionStatus(true);
        productEntity.setQuantity(0L);
        try {
            productRepository.save(productEntity);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mã sản phẩm bị trùng");
        }

        return productEntity.getId();
    }

    @Transactional
    @Override
    public Long update(ProductDTO productDTO, Long id) {
        ProductEntity productEntity = productRepository.findOneCustom(id);
        if (productEntity == null) {
            return -1L;
        }
        BeanUtils.copyProperties(productDTO, productEntity);
        for (ImageEntity imageEntity : productEntity.getImageEntity()) {
            ima.delete(imageEntity);
        }

        setProductTags(productDTO, productEntity);
        SetImageProduct(productDTO, productEntity);
        productEntity.setUpdatedOn(new Date().getTime());
        productEntity.setIsActive(true);
        productEntity.setTransactionStatus(true);
        productEntity.setQuantity(0L);

        productRepository.save(productEntity);
        return id;
    }

    private void SetImageProduct(ProductDTO productDTO, ProductEntity productEntity) {
        if (ArrayUtils.isNotEmpty(productDTO.getImages())) {
            productEntity.setPicturePath(productDTO.getImages()[0]);

            for (String str : productDTO.getImages()) {
                ImageEntity imageEntity = new ImageEntity();
                imageEntity.setPath(str);
                imageEntity.setProduct(productEntity);
                ima.save(imageEntity);
            }
        }
    }

    private void setProductTags(ProductDTO productDTO, ProductEntity productEntity) {
        List<TagsEntity> tagsEntities = new ArrayList<>();
        if (ArrayUtils.isNotEmpty(productDTO.getTags())) {
            for (String tagDTO : productDTO.getTags()) {
                TagsEntity tagsEntity = tagRepository.findTagByValue(tagDTO);
                if (tagsEntity == null) {
                    tagsEntity = new TagsEntity();
                    tagsEntity.setValue(tagDTO);
                    tagsEntity.setCreatedOn(new Date().getTime());
                    tagRepository.save(tagsEntity);
                }
                tagsEntities.add(tagsEntity);
            }
            for (int i = 0; i < tagsEntities.size(); i++) {
                for (int j = i + 1; j < tagsEntities.size(); j++) {
                    if (tagsEntities.get(i).getValue().compareToIgnoreCase(tagsEntities.get(j).getValue()) == 0) {
                        tagsEntities.remove(tagsEntities.get(j));
                    }
                }
            }
        }
        productEntity.setTagsEntities(tagsEntities);
    }

    @Override
    public void delete(Long id) {
        try {
            ProductEntity productEntity = productRepository.findOneCustom(id);
            productEntity.setIsActive(false);
            productEntity.setTagsEntities(null);
            productRepository.save(productEntity);
        } catch (EmptyResultDataAccessException e) {
            System.out.println(e.getClass().getCanonicalName());
        }
    }

    @Override
    public ProductBrandResponse getBrand(String brand, long page) {
        String value = "%" + brand + "%";
        Long total = productRepository.getTotalBrand(value);
        return new ProductBrandResponse(productRepository.getBrand(value, (page - 1) * 5), total);
    }

    @Override
    public ProductCategoryResponse getCategory(String cate, long page) {
        String value = "%" + cate + "%";
        String[] category = productRepository.getCategory(value, (page - 1) * 5);
        Long total = productRepository.getTotalCategory(value);
        return new ProductCategoryResponse(category, total);
    }

    @Override
    public String[] getTags(String tag) {
        String value = "%" + tag + "%";
        return tagRepository.getTagsValue(value);
    }

}
