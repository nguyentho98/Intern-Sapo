package com.sapo.qlgiaohang.repositoties.product.impl;

import com.sapo.qlgiaohang.dto.product.FilterRequest;
import com.sapo.qlgiaohang.dto.product.ProductDTO;
import com.sapo.qlgiaohang.dto.product.ProductResponse;
import com.sapo.qlgiaohang.entity.ProductEntity;
import com.sapo.qlgiaohang.repositoties.product.ProductRepositorySqlSearch;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
public class ProductRepositorySqlSearchImpl implements ProductRepositorySqlSearch {

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Override
    public ProductResponse filterProducts(FilterRequest filterRequest, int page, int limit) {
        StringBuilder builder = new StringBuilder(" from products p left join product_tags pt on p.id = pt.product_id left join tags t on pt.tag_id = t.id where 1 = 1 ");
        if (filterRequest.getStatus() != null) {
            checkStatusSearch(builder, filterRequest.getStatus());
        }
        if (filterRequest.getName() != null) {
            builder.append("and (p.name like '%").append(filterRequest.getName()).
                    append("%' or p.code like '%").append(filterRequest.getName()).append("%') ");
        }
        if (StringUtils.isNotBlank(filterRequest.getCategory())) {
            builder.append("and p.category = '").append(filterRequest.getCategory()).append("' ");
        }
        if (StringUtils.isNotBlank(filterRequest.getBrand())) {
            builder.append("and p.brand = '").append(filterRequest.getBrand()).append("' ");
        }
        if (filterRequest.getFromDate() != null && filterRequest.getFromDate() != 0) {
            builder.append("and p.created_on >= '").append(filterRequest.getFromDate()).append("' ");
        }
        if (filterRequest.getToDate() != null && filterRequest.getToDate() != 0) {
            builder.append("and p.created_on <= '").append(filterRequest.getToDate()).append("' ");
        }
        if (ArrayUtils.isNotEmpty(filterRequest.getTags())) {
            String[] arrTag = filterRequest.getTags();
            if (arrTag.length == 1) {
                builder.append(" and (t.value = '").append(arrTag[0]).append("') ");
            } else {
                for (int i = 0; i < filterRequest.getTags().length; i++) {
                    if (i == 0) {
                        builder.append(" and (t.value = '").append(arrTag[i]).append("' ");
                    } else {
                        builder.append(" or t.value = '").append(arrTag[i]).append("') ");
                    }
                }
            }
        }

        if (filterRequest.getClassify() != null) {
            checkClassify(builder, filterRequest.getClassify());
        }
        List<ProductEntity> productEntityList = jdbcTemplate.query("select p.* " + builder + " and is_active = true group by p.id order by p.id desc limit " + (page * limit) + "," + limit, new BeanPropertyRowMapper<>(ProductEntity.class));
        Query query = entityManager.createNativeQuery("select count(distinct p.id) " + builder);
        Long total = Long.valueOf(String.valueOf(query.getSingleResult()));
        return new ProductResponse(productEntityList, total);
    }

    @Override
    public ProductDTO findOne(Long id) {
        String query = "select p.*,(SELECT JSON_ARRAYAGG(path) from images where product_id = p.id) as images" +
                " FROM quanligiaohangdb.products p inner join images i on p.id = i.product_id where p.id = 3";
        return jdbcTemplate.queryForObject(query, ProductDTO.class);
    }

    private StringBuilder checkStatusSearch(StringBuilder builder, Integer status) {
        if (status == 0) {
            builder.append("and p.is_active = 0 ");
        } else if (status == 1) {
            builder.append("and p.is_active = 1 ");
        } else if (status == 2) {
            builder.append(" ");
        }
        return builder;
    }

    private StringBuilder checkClassify(StringBuilder builder, Integer classify) {
        if (classify == 0) {
            builder.append("and p.product_price < 5000000 ");
        } else if (classify == 1) {
            builder.append("and p.product_price >= 5000000");
        } else if (classify == 2) {
            builder.append(" ");
        }
        return builder;
    }
}
