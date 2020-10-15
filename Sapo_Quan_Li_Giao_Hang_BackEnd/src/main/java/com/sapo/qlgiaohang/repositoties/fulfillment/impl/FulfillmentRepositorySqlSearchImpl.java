package com.sapo.qlgiaohang.repositoties.fulfillment.impl;

import com.sapo.qlgiaohang.dto.fulfillment.*;
import com.sapo.qlgiaohang.dto.fulfillmentAddress.FulfillmentAdressDTO;
import com.sapo.qlgiaohang.entity.AddressEntity;
import com.sapo.qlgiaohang.entity.FulfillmentAddressEntity;
import com.sapo.qlgiaohang.entity.FulfillmentEntity;
import com.sapo.qlgiaohang.entity.ShipperEntity;
import com.sapo.qlgiaohang.repositoties.fulfillment.FulfillmentRepositorySqlSearch;
import com.sun.xml.bind.v2.runtime.output.SAXOutput;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository
public class FulfillmentRepositorySqlSearchImpl implements FulfillmentRepositorySqlSearch {
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public FulfillmentFilterResponse filterFulfillments(FilterRequest filterRequest, int page, int limit){
        StringBuilder builder = new StringBuilder(" from fulfillment f left join customer c on f.customer_id=c.id where 1 = 1 ");
        if (filterRequest.getStatus() !=-1 && filterRequest.getStatus()!=null) {
            builder.append("and f.shipping_status= '").append(filterRequest.getStatus()).append("' ");
        }
        if (filterRequest.getShippingMethod() !=-1 && filterRequest.getShippingMethod()!=null) {
            builder.append("and f.shipping_method= '").append(filterRequest.getShippingMethod()).append("' ");
        }
        if (filterRequest.getAccountingStatus() !=-1 && filterRequest.getAccountingStatus()!=null) {
            builder.append("and f.accounting_status= '").append(filterRequest.getAccountingStatus()).append("' ");
        }
        if (StringUtils.isNotBlank(filterRequest.getCode())) {
            builder.append("and f.code like '%").append(filterRequest.getCode()).append("%' ");
        }
        if (filterRequest.getCustomer() !=null) {
            builder.append("and f.customer_id= '").append(filterRequest.getCustomer()).append("' ");
        }
        if (filterRequest.getShipper() !=null) {
            builder.append("and f.shipper_id= '").append(filterRequest.getShipper()).append("' ");
        }
        if (filterRequest.getFromDate() != null && filterRequest.getFromDate() != 0) {
            builder.append("and f.created_on >= '").append(filterRequest.getFromDate()).append("' ");
        }
        if (filterRequest.getToDate() != null && filterRequest.getToDate() != 0) {
            builder.append("and f.created_on <= '").append(filterRequest.getToDate()).append("' ");
        }

        List<FulfillmentFilterDTO> fulfillmentFilterDTOSf =
                jdbcTemplate.query("select f.* " + builder + " order by f.id desc limit " + (page * limit) + "," + limit, new BeanPropertyRowMapper<>(FulfillmentFilterDTO.class));
        for (FulfillmentFilterDTO or: fulfillmentFilterDTOSf) {
            FulfillmentAdressDTO fulfillmentAddressEntity = jdbcTemplate.queryForObject("\n" +
                    "select distinct(fulfillment_address.id),fulfillment_address.* from fulfillment_address \n" +
                    "inner join fulfillment where fulfillment_address.id = "+or.getShippingTo(), new BeanPropertyRowMapper<>(FulfillmentAdressDTO.class));
            or.setShippingToOB(fulfillmentAddressEntity);

        }
        Query query = entityManager.createNativeQuery("select count(distinct f.id) " + builder);
        Long total = Long.valueOf(String.valueOf(query.getSingleResult()));
        return  new FulfillmentFilterResponse(total,fulfillmentFilterDTOSf);
    }
}
