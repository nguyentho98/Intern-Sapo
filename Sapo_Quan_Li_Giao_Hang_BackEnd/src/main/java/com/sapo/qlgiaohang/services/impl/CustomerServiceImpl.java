package com.sapo.qlgiaohang.services.impl;

import com.sapo.qlgiaohang.converter.FulfillmentConverter;
import com.sapo.qlgiaohang.converter.FulfillmentCustomerConverter;
import com.sapo.qlgiaohang.dto.customer.CustomerDTO;
import com.sapo.qlgiaohang.dto.customer.CustomerMapper;
import com.sapo.qlgiaohang.dto.customer.CustomerRes;
import com.sapo.qlgiaohang.dto.customer.CustomerResponse;
import com.sapo.qlgiaohang.dto.fulfillment.FulfillmentCustomerDTO;
import com.sapo.qlgiaohang.dto.fulfillment.FulfillmentDTO;
import com.sapo.qlgiaohang.entity.AddressEntity;
import com.sapo.qlgiaohang.entity.CustomerEntity;
import com.sapo.qlgiaohang.entity.FulfillmentEntity;
import com.sapo.qlgiaohang.repositoties.AddressRepository;
import com.sapo.qlgiaohang.repositoties.FulfillmentRepository;
import com.sapo.qlgiaohang.repositoties.CustomerRepository;
import com.sapo.qlgiaohang.services.CustomerService;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import utils.ConvertCode;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {
    
    private CustomerRepository customerRepository;
    private CustomerMapper customerMapper;
    private FulfillmentRepository fulfillmentRepository;
    private FulfillmentCustomerConverter fulfillmentCustomerConverter;
    private FulfillmentConverter fulfillmentConverter;
    private AddressRepository addressRepository;
    private Long codeMax;
    
    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository,CustomerMapper customerMapper,FulfillmentRepository fulfillmentRepository,
        FulfillmentCustomerConverter fulfillmentCustomerConverter,FulfillmentConverter fulfillmentConverter,AddressRepository addressRepository
    ){
        try{
            this.customerRepository=customerRepository;
            this.customerMapper=customerMapper;
            this.fulfillmentRepository=fulfillmentRepository;
            this.fulfillmentCustomerConverter=fulfillmentCustomerConverter;
            this.fulfillmentConverter=fulfillmentConverter;
            this.addressRepository=addressRepository;
        }finally {
            codeMax=customerRepository.getCodeMax();
            if(codeMax == null){
                codeMax = 0L;
            }
        }
    }
    
    @Override
    public List<CustomerDTO> fillAll(int page, int limit) {
        Sort sort = Sort.by("id").descending();
        List<CustomerDTO> listCustomerDTO = new ArrayList<>();
        Page<CustomerEntity> listCustomerEntity = customerRepository.findAll(PageRequest.of(page, limit, sort));
        for (CustomerEntity customerEntity : listCustomerEntity) {
            CustomerDTO customerDTO = new CustomerDTO();
            customerDTO = customerMapper.convertCustomerDTO(customerEntity);
            customerDTO.setTotalOrder(customerEntity.getFulfillmentEntities().size());
            customerDTO.setTotalElements(listCustomerEntity.getTotalElements());
            customerDTO.setAddressEntityList(customerEntity.getAddressEntities());

//            AddressEntity addressEntity=addressRepository.getOne(customerEntity.getAddressEntity().getId());
//            customerDTO.setAddressEntity(addressEntity);
//            System.out.println(listCustomerEntity.getTotalElements());
            listCustomerDTO.add(customerDTO);
        }
        return listCustomerDTO;
    }
    
    @Override
    public List<CustomerDTO> filterByStatus(int page, int limit, int status) {
        Sort sort = Sort.by("id").descending();
        Pageable pageable = PageRequest.of(page, limit, sort);
        List<CustomerDTO> listCustomerDTO = new ArrayList<>();
        Page<CustomerEntity> listCustomerEntity = customerRepository.findAllByIsActive(status, pageable);
        for (CustomerEntity customerEntity : listCustomerEntity) {
            CustomerDTO customerDTO = new CustomerDTO();
            customerDTO = customerMapper.convertCustomerDTO(customerEntity);
            customerDTO.setTotalOrder(customerEntity.getFulfillmentEntities().size());
            customerDTO.setTotalElements(listCustomerEntity.getTotalElements());
            listCustomerDTO.add(customerDTO);
        }
        
        return listCustomerDTO;
    }
    
    @Override
    public CustomerDTO fillOne(long id) {
        CustomerDTO customerDTO = new CustomerDTO();
        Optional<CustomerEntity> customerEntity = customerRepository.findById(id);
        customerDTO = customerMapper.convertCustomerDTO(customerEntity.get());
        customerDTO.setAddressEntityList(customerEntity.get().getAddressEntities());
        customerDTO.setTotalOrder(customerEntity.get().getFulfillmentEntities().size());
        return customerDTO;
    }
    
    @Override
    public CustomerDTO saveOrUpdate(CustomerDTO customerDTO) {
        CustomerEntity customerEntity = new CustomerEntity();
        CustomerEntity customer = new CustomerEntity();
        CustomerDTO customerDto=new CustomerDTO();

        if (customerDTO.getId() > 0 && customerDTO.getCode() != null) { // update
            try {
                AddressEntity addressEntity = new AddressEntity();
                addressEntity.setId(customerDTO.getAddressEntity().getId());
                addressEntity.setAddress(customerDTO.getAddress());
                addressEntity.setProvince(customerDTO.getProvince());
                addressEntity.setDistrict(customerDTO.getDistrict());
                addressEntity.setWard(customerDTO.getWard());
                addressEntity.setPhone(customerDTO.getPhone());
                addressEntity.setName(customerDTO.getName());
                addressEntity.setStatus(0);
                addressEntity.setCreatedOn(new Date().getTime());
                addressEntity.setUpdatedOn(new Date().getTime());
                addressRepository.save(addressEntity);

                customerEntity = customerMapper.convertCustomerToEntity(customerDTO);
                customerEntity.setAddressEntity(addressEntity);
                customerEntity.setCreatedOn(new Date().getTime());
                customerEntity.setUpdatedOn(new Date().getTime());
                customerRepository.save(customerEntity);
            } catch (DuplicateKeyException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "DuplicateKeyCUSCode");
            }
        } else {
            try {
                if (ConvertCode.convertCode(codeMax, customerDTO.getCode(), "CUS").startsWith("CUS")) {
                    codeMax += 1;
                }
                AddressEntity addressEntity = new AddressEntity();
                addressEntity.setAddress(customerDTO.getAddress());
                addressEntity.setProvince(customerDTO.getProvince());
                addressEntity.setDistrict(customerDTO.getDistrict());
                addressEntity.setWard(customerDTO.getWard());
                addressEntity.setPhone(customerDTO.getPhone());
                addressEntity.setName(customerDTO.getName());
                addressEntity.setCreatedOn(new Date().getTime());
                addressEntity.setUpdatedOn(new Date().getTime());
                addressRepository.save(addressEntity);
                customerEntity.setCode(ConvertCode.convertCode(codeMax, customerDTO.getCode(), "CUS"));
                customerEntity.setEmail(customerDTO.getEmail());
                customerEntity.setPhone(customerDTO.getPhone());
                customerEntity.setName(customerDTO.getName());
                customerEntity.setAddressEntity(addressEntity);
                customerEntity.setCreatedOn(new Date().getTime());
                customerEntity.setUpdatedOn(new Date().getTime());
                customerEntity.setActive(true);
                customerRepository.save(customerEntity);
            } catch (DataIntegrityViolationException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Mã code đã tồn tại");
            }catch(Exception e){
                e.printStackTrace();
            }
        }

        return customerMapper.convertCustomerDto(customerRepository.save(customerEntity));
    }
    
    @Override
    public void delete(long[] ids) {
        for (long item : ids) {
            customerRepository.deleteById(item);
        }
    }
    
    @Override
    public void remove(CustomerDTO[] remove) {
        for (CustomerDTO item : remove) {
            customerRepository.remove(item.getActiveU(), item.getId());
        }
    }
    
    
    @Override
    public CustomerResponse detailCustomer(long id, int page, int limit) {
        List<FulfillmentCustomerDTO> list = new ArrayList<>();
        Double totalMoney = fulfillmentRepository.totalMoney(id);
        Page<FulfillmentEntity> fulfillmentEntityList = fulfillmentRepository.getOneByCustomerId(id,PageRequest.of(page,limit));
        for (FulfillmentEntity item : fulfillmentEntityList) {
            FulfillmentCustomerDTO fulfillmentCustomerDTO = new FulfillmentCustomerDTO();
            fulfillmentCustomerDTO = fulfillmentConverter.converterToDTO(item);
            list.add(fulfillmentCustomerDTO);
        }
        return new CustomerResponse(fulfillmentEntityList.getTotalElements(),totalMoney,list);
    }
    
    @Override
    public FulfillmentDTO detailFulfillment(long id) {
        try {
            FulfillmentDTO fulfillmentDTO = new FulfillmentDTO();
            Optional<FulfillmentEntity> fulfillmentEntity = fulfillmentRepository.findById(id);
            fulfillmentDTO = fulfillmentCustomerConverter.converteToDTO(fulfillmentEntity.get());
            return fulfillmentDTO;
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No present value");
        }
    }
    
    @Override
    public CustomerRes search(int page, int limit, String name) {
        String value = "%" + name + "%";
        Sort sort = Sort.by("id").descending();
        Pageable pageable = PageRequest.of(page, limit, sort);
        List<CustomerDTO> listCustomerDTO = new ArrayList<>();
        Page<CustomerEntity> list = customerRepository.searchName(value, pageable);
        for (CustomerEntity item : list) {
            CustomerDTO customerDTO = new CustomerDTO();
            customerDTO = customerMapper.convertCustomerDTO(item);
            customerDTO.setTotalOrder(item.getFulfillmentEntities().size());
            listCustomerDTO.add(customerDTO);
        }
        return new CustomerRes(list.getTotalElements(),listCustomerDTO);
    }

    @Override
    public CustomerRes searchCustomer(int page, int limit, String name, Boolean status) {
        String value = "%" + name + "%";
        Sort sort = Sort.by("id").descending();
        Pageable pageable = PageRequest.of(page, limit,sort);
        List<CustomerDTO> listCustomerDTO = new ArrayList<>();
        Page<CustomerEntity> list = customerRepository.searchCustomer(status,value, pageable);
        for (CustomerEntity item : list) {
            CustomerDTO customerDTO = new CustomerDTO();
            customerDTO = customerMapper.convertCustomerDTO(item);
            customerDTO.setTotalOrder(item.getFulfillmentEntities().size());
            listCustomerDTO.add(customerDTO);
        }
        return new CustomerRes(list.getTotalElements(),listCustomerDTO);
    }

    @Override
    public ResponseEntity<?> checkPhone(String phone) {
        CustomerEntity customerEntity=customerRepository.findByPhone(phone);
        if(customerEntity == null){
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.ok(customerEntity.getId());
    }

    public Boolean checkCodeCUS(String code){
        return true;
    }
}