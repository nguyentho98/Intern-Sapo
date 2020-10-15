package com.sapo.qlgiaohang.repositoties.accounting.impl;

import com.sapo.qlgiaohang.dto.acounting.AccountingDTOResponse;
import com.sapo.qlgiaohang.dto.acounting.CustomerAccountingDTO;
import com.sapo.qlgiaohang.dto.acounting.DebtToPayDTO;
import com.sapo.qlgiaohang.dto.acounting.FulfillmentAccountingDTO;
import com.sapo.qlgiaohang.repositoties.accounting.CustomerForAccountingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public class CustomerForAccountingRepositoryImpl implements CustomerForAccountingRepository {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public CustomerForAccountingRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<CustomerAccountingDTO> getAllCustomForAccounting(String value, int page) {
        String query = "SELECT c.*,CONCAT(a.address,(\", \"),a.ward,(\", \") , a.district,(\", \"), a.province\n" +
                ") AS address FROM customer c INNER JOIN address a ON c.default_address = a.id\n" +
                " WHERE c.name LIKE  ?  OR c.phone LIKE  ?  LIMIT ?,5";
        List<CustomerAccountingDTO> list = jdbcTemplate.query(query, new Object[]{value, value, page}, new BeanPropertyRowMapper<>(CustomerAccountingDTO.class));
        return list;
    }

    @Override
    public Long getTotalCustomers(String value) {
        String query = "select count(id) from customer where name like  ?  or phone like  ?";
        return jdbcTemplate.queryForObject(query, new Object[]{value, value}, Long.class);
    }

    @Override
    public List<DebtToPayDTO> getTotalDebtToPay(long customerId) {
        String query = "select  sum(cod_money) as total_cod, sum(transport_fee)" +
                " as total_transport_fee,shipping_payment_object as person_pay_ship\n" +
                " from fulfillment where customer_id = ? and payment_status = 1 \n" +
                " and accounting_status = 0 AND accounting_id is null " +
                "group by shipping_payment_object order by shipping_payment_object";
        return jdbcTemplate.query(query, new Object[]{customerId}, new BeanPropertyRowMapper<>(DebtToPayDTO.class));
    }

    @Override
    public BigDecimal getTotalDebtAccounting(long customerId) {
        String query = "select sum( money_for_customers - money_paid) from accounting where customer_id= ? and is_active = True";
        return jdbcTemplate.queryForObject(query, new Object[]{customerId}, BigDecimal.class);
    }

    @Override
    public Long getTotalFulfillment(long customerId) {
        String query = " select count(id) from fulfillment where customer_id = ? and payment_status = 1 and accounting_status = 0 and accounting_id is null";
        return jdbcTemplate.queryForObject(query, new Object[]{customerId}, Long.class);
    }

    @Override
    public List<FulfillmentAccountingDTO> getFulfillment(long customerId, int page) {
        page = (page - 1) * 5;
        String query = "select id,code,cod_money,transport_fee,shipping_payment_object as person_pay_ship\n" +
                "from fulfillment where customer_id = ? and payment_status = 1 and accounting_status = 0 and accounting_id is null limit ?,5";
        return jdbcTemplate.query(query, new Object[]{customerId, page}, new BeanPropertyRowMapper<>(FulfillmentAccountingDTO.class));
    }

    @Override
    public AccountingDTOResponse findOneAccounting(Long id) {
        String query = "select * from accounting where id = ?";
        return jdbcTemplate.queryForObject(query, new Object[]{id}, new BeanPropertyRowMapper<>(AccountingDTOResponse.class));
    }

    @Override
    public List<FulfillmentAccountingDTO> getFulfillmentForAccounting(long accountingId, int page) {
        String query = "select  id,code,cod_money,transport_fee,shipping_payment_object as person_pay_ship from fulfillment where accounting_id = ? limit ?,5";
        return jdbcTemplate.query(query, new Object[]{accountingId, page}, new BeanPropertyRowMapper<>(FulfillmentAccountingDTO.class));
    }

    @Override
    public CustomerAccountingDTO getCustomerForAccounting(Long customerId) {
        String query = "\n" +
                "select c.*,concat(a.address,\", \",a.ward,\", \",a.district,\", \",a.province) as address from customer c inner join address a on c.default_address = a.id where c.id  = ?";
        return jdbcTemplate.queryForObject(query, new Object[]{customerId}, new BeanPropertyRowMapper<>(CustomerAccountingDTO.class));
    }
}
