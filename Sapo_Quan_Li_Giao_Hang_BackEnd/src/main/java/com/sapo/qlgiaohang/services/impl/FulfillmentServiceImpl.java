package com.sapo.qlgiaohang.services.impl;

import com.sapo.qlgiaohang.dto.fulfillment.*;
import com.sapo.qlgiaohang.dto.fulfillmentAddress.FulfillmentAddressReq;
import com.sapo.qlgiaohang.dto.fulfillmentAddress.FulfillmentAdressDTO;
import com.sapo.qlgiaohang.dto.fulfillmentDetail.FulfillmentDetailDTO;
import com.sapo.qlgiaohang.dto.fulfillmentDetail.FulfillmentDetailReq;
import com.sapo.qlgiaohang.entity.*;
import com.sapo.qlgiaohang.repositoties.*;
import com.sapo.qlgiaohang.repositoties.fulfillment.FulfillmentRepositorySqlSearch;
import com.sapo.qlgiaohang.services.FulfillmentService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import utils.ConvertCode;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class FulfillmentServiceImpl implements FulfillmentService {
    private FulfillmentRepository repository;
    private FulfillmentDetailRepository fulfillmentDetailRepository;
    private FulfillmentTrackingRepository fulfillmentTrackingRepository;
    private ProductRepository productRepository;
    private ShipperRepository shipperRepository;
    private UserRepository userRepository;
    private FulfillmentMapper fulfillmentMapper;
    private FulfillmentAddressRepository fulfillmentAddressRepository;
    private FulfillmentRepositorySqlSearch fulfillmentRepositorySqlSearch;
    private Long codeMax;

    @Autowired
    public FulfillmentServiceImpl(FulfillmentRepository repository, FulfillmentDetailRepository fulfillmentDetailRepository,ProductRepository productRepository,FulfillmentTrackingRepository fulfillmentTrackingRepository,ShipperRepository shipperRepository,
                                  FulfillmentMapper fulfillmentMapper,FulfillmentAddressRepository fulfillmentAddressRepository,FulfillmentRepositorySqlSearch fulfillmentRepositorySqlSearch) {
        try {
            this.repository = repository;
            this.fulfillmentDetailRepository = fulfillmentDetailRepository;
            this.productRepository = productRepository;
            this.fulfillmentTrackingRepository = fulfillmentTrackingRepository;
            this.shipperRepository = shipperRepository;
            this.fulfillmentMapper=fulfillmentMapper;
            this.fulfillmentAddressRepository=fulfillmentAddressRepository;
            this.fulfillmentRepositorySqlSearch=fulfillmentRepositorySqlSearch;

        }finally {
            codeMax=repository.getCodeMax();
            if(codeMax == null){
                codeMax = 0L;
            }
        }
    }
    @Override
    public FulfillmentFilterResponse filterFulfillment(int page, int limit, FilterRequest filterRequest){
        return fulfillmentRepositorySqlSearch.filterFulfillments(filterRequest,page,limit);
    }
    @Override
    public FulfillmentResponse findAllByStatus(int page, int limit, int status, String name, Long shipperId) {
        Sort sort = Sort.by("id").descending();
        Pageable pageable = PageRequest.of(page, limit, sort);
        Page<FulfillmentEntity> ordersEntities;
        if (status == 0) {
            ordersEntities = repository.findAllByShipper(name, shipperId, pageable);
        } else {
            ordersEntities = repository.findAllStatusByShipper(status, name, shipperId, pageable);
        }
        List<FulfillmentDTO> orderCreateList = new ArrayList<>();
        for (FulfillmentEntity or : ordersEntities.getContent()) {
            orderCreateList.add(FulfillmentMapper.toFulfillmentDTO(or));
        }
        return new FulfillmentResponse(ordersEntities.getTotalElements(), orderCreateList);
    }


    @Override
    public FulfillmentResponse findAll(int page, int limit,String name) {
        Sort sort = Sort.by("id").descending();
        Pageable pageable = PageRequest.of(page, limit, sort);
        Page<FulfillmentEntity> fulfillmentEntities = repository.findAll(name,pageable);
        List<FulfillmentDTO> fulfillmentDTOS = new ArrayList<>();
        for (FulfillmentEntity or: fulfillmentEntities.getContent()) {
            fulfillmentDTOS.add(FulfillmentMapper.toFulfillmentDTO(or));
        }
        return new FulfillmentResponse(fulfillmentEntities.getTotalElements(), fulfillmentDTOS);
    }


    @Override
    public FulfillmentDTO getOrderById(long id)  {
        try {
            FulfillmentEntity fulfillmentEntity =repository.getOne(id);
            if(fulfillmentEntity ==null){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "no data");
            }
            return FulfillmentMapper.toFulfillmentDTO(fulfillmentEntity);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request");
        }

    }
    @Override
    public FulfillmentEntity createFulfilment(FulfillmentReq fulfillmentReq){
        FulfillmentEntity tmp= new FulfillmentEntity();
        FulfillmentEntity code =repository.findByCode(fulfillmentReq.getCode());
        if(fulfillmentReq.getUser_id()==null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chưa có thông người tạo phiếu");
        }
        if (code != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mã code đã được sử dụng");
        }
        if (fulfillmentReq.getCustomer_id()==null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Phiếu nhập không có khách hàng");
        }
        if (fulfillmentReq.getShipper_id()==null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Phiếu nhập không có nhân viên giao");
        }
        if (fulfillmentReq.getShippingTo() ==null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Phiếu nhập không có nơi địa chỉ nhận hàng");
        }
        if (fulfillmentReq.getFulfillmentDetailReqs().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Phiếu nhập không có sản phẩm");
        }
        if (ConvertCode.convertCode(codeMax, fulfillmentReq.getCode(), "FUL").startsWith("FUL")) {
            codeMax += 1;
        }
        tmp.setCreatedOn(new Date().getTime());
        tmp.setCode(ConvertCode.convertCode(codeMax, fulfillmentReq.getCode(), "FUL"));
        tmp.setTotalMoney(fulfillmentReq.getTotalMoney());
        tmp.setCodMoney(fulfillmentReq.getCodMoney());
        tmp.setDescription(fulfillmentReq.getDescription());
        tmp.setDeliveryDate(fulfillmentReq.getDeliveryDate().getTime());
        tmp.setTransportFee(fulfillmentReq.getTransportFee());
        tmp.setShippingMethod(fulfillmentReq.getShippingMethod());
        tmp.setShippingPaymentObject(fulfillmentReq.getShippingPaymentObject());
        tmp.setShippingStatus(fulfillmentReq.getShippingStatus());

        if(fulfillmentReq.getShipper_id()!=null){
            ShipperEntity shipperEntity= new ShipperEntity();
            shipperEntity.setId(fulfillmentReq.getShipper_id());
            tmp.setShipperEntity(shipperEntity);
        }else{
            tmp.setShipperEntity(null);
        }
        CustomerEntity customerEntity = new CustomerEntity();
        customerEntity.setId(fulfillmentReq.getCustomer_id());
        tmp.setCustomerEntity(customerEntity);

        UserEntity userEntity = new UserEntity();
        userEntity.setId(fulfillmentReq.getUser_id());
        tmp.setUserEntity(userEntity);

        FulfillmentAddressEntity fulfillmentShippingTo=new FulfillmentAddressEntity();
        fulfillmentShippingTo.setName(fulfillmentReq.getShippingTo().getName());
        fulfillmentShippingTo.setPhone(fulfillmentReq.getShippingTo().getPhone());
        fulfillmentShippingTo.setWard(fulfillmentReq.getShippingTo().getWard());
        fulfillmentShippingTo.setAddress(fulfillmentReq.getShippingTo().getAddress());
        fulfillmentShippingTo.setProvince(fulfillmentReq.getShippingTo().getProvince());
        fulfillmentShippingTo.setDistrict(fulfillmentReq.getShippingTo().getDistrict());
        fulfillmentShippingTo.setStatus(1);
        fulfillmentShippingTo.setCreatedOn(new Date().getTime());
        fulfillmentAddressRepository.save(fulfillmentShippingTo);

        FulfillmentAddressEntity fulfillmentShippingFrom=new FulfillmentAddressEntity();
        fulfillmentShippingFrom.setName(fulfillmentReq.getShippingFrom().getName());
        fulfillmentShippingFrom.setPhone(fulfillmentReq.getShippingFrom().getPhone());
        fulfillmentShippingFrom.setWard(fulfillmentReq.getShippingFrom().getWard());
        fulfillmentShippingFrom.setAddress(fulfillmentReq.getShippingFrom().getAddress());
        fulfillmentShippingFrom.setProvince(fulfillmentReq.getShippingFrom().getProvince());
        fulfillmentShippingFrom.setDistrict(fulfillmentReq.getShippingFrom().getDistrict());
        fulfillmentShippingFrom.setStatus(0);
        fulfillmentShippingFrom.setCreatedOn(new Date().getTime());
        fulfillmentAddressRepository.save(fulfillmentShippingFrom);

        tmp.setFulfillmentShippingFrom(fulfillmentShippingFrom);
        tmp.setFulfillmentShippingTo(fulfillmentShippingTo);

        tmp.setCreatedOn(new Date().getTime());
        repository.save(tmp);

        // table fullfillment_detail
        for(FulfillmentDetailReq fulfillmentDetailReq : fulfillmentReq.getFulfillmentDetailReqs()) {
            FulfillmentDetailEntity fulfillmentDetailEntity = new FulfillmentDetailEntity();

            fulfillmentDetailEntity.setCreatedOn(new Date().getTime());
            fulfillmentDetailEntity.setPrice(fulfillmentDetailReq.getPrice());
            fulfillmentDetailEntity.setQuantity(fulfillmentDetailReq.getQuantity());

            ProductEntity productEntity = new ProductEntity();
            productEntity.setId(fulfillmentDetailReq.getProduct_id());
            fulfillmentDetailEntity.setProduct(productEntity);

            fulfillmentDetailEntity.setFulfillmentEntity(tmp);
            fulfillmentDetailRepository.save(fulfillmentDetailEntity);
        }

        // table fullfillment_tracking
        FulfillmentTrackingEntity fulfillmentTrackingEntity = new FulfillmentTrackingEntity();
        fulfillmentTrackingEntity.setCreatedOn(new Date().getTime());
        fulfillmentTrackingEntity.setFulfillmentEntity(tmp);
        fulfillmentTrackingEntity.setAction("Tạo phiếu");
        fulfillmentTrackingEntity.setName(fulfillmentReq.getUserName());
        fulfillmentTrackingRepository.save(fulfillmentTrackingEntity);

        return tmp;
    }
    @Override
    public Long toReceiveFulfilment(Long idFulfillment,Long idShipper){
        FulfillmentEntity entity=repository.getOne(idFulfillment);
        if(entity.getId()==null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không có phiếu giao giao hàng");
        }
        if(idShipper==null){
            if(entity.getShippingStatus()==1 || entity.getShippingStatus()==5){
                if(entity.getFulfillmentDetails().isEmpty()) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chi tiết phiếu giao không tồn tại");
                }
                for (FulfillmentDetailEntity fulfillmentDetailEntity : entity.getFulfillmentDetails()) {

                    ProductEntity productEntity = productRepository.findOneCustom(fulfillmentDetailEntity.getProduct().getId());
                    if (productEntity.getId()==null) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sản phẩm không tồn tại");
                    }else{
                        productEntity.setQuantity(productEntity.getQuantity() + Long.valueOf(fulfillmentDetailEntity.getQuantity()));
                        productRepository.save(productEntity);
                    }
                }
                entity.setShippingStatus(2);
                FulfillmentTrackingEntity fulfillmentTrackingEntity = new FulfillmentTrackingEntity();
                fulfillmentTrackingEntity.setCreatedOn(new Date().getTime());
                fulfillmentTrackingEntity.setFulfillmentEntity(entity);
                fulfillmentTrackingEntity.setAction("Nhập kho");
                fulfillmentTrackingEntity.setName(entity.getUserEntity().getFullName());
                fulfillmentTrackingRepository.save(fulfillmentTrackingEntity);
                repository.save(entity);
                return entity.getId();
            }else{
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Phiếu giao đã được nhập kho");
            }
        }else {
            ShipperEntity shipperEntity = shipperRepository.getOne(idShipper);
            if (shipperEntity.getId() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nhân viên không tồn tại");
            } else {
                entity.setShipperEntity(shipperEntity);
                repository.save(entity);
                if (entity.getShippingStatus() == 1 || entity.getShippingStatus() == 5) {
                    if (entity.getFulfillmentDetails().isEmpty()) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chi tiết phiếu giao không tồn tại");
                    }
                    for (FulfillmentDetailEntity fulfillmentDetailEntity : entity.getFulfillmentDetails()) {

                        ProductEntity productEntity = productRepository.findOneCustom(fulfillmentDetailEntity.getProduct().getId());
                        if (productEntity.getId() == null) {
                            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sản phẩm không tồn tại");
                        } else {
                            productEntity.setQuantity(productEntity.getQuantity() + Long.valueOf(fulfillmentDetailEntity.getQuantity()));
                            productRepository.save(productEntity);
                        }
                    }
                    entity.setShippingStatus(2);

                    FulfillmentTrackingEntity fulfillmentTrackingEntity = new FulfillmentTrackingEntity();
                    fulfillmentTrackingEntity.setCreatedOn(new Date().getTime());
                    fulfillmentTrackingEntity.setFulfillmentEntity(entity);
                    fulfillmentTrackingEntity.setAction("Nhập kho");
                    fulfillmentTrackingEntity.setName(entity.getUserEntity().getFullName());
                    fulfillmentTrackingRepository.save(fulfillmentTrackingEntity);
                    repository.save(entity);
                    return entity.getId();
                } else {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Phiếu giao đã được nhập kho");
                }
            }
        }
    };
    @Override
    public Long toDeliverFulfilment(Long idFulfillment,Long idShipper){
        FulfillmentEntity entity=repository.getOne(idFulfillment);
        if(entity.getId()==null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Không có phiếu giao giao hàng");
        }
        if(entity.getShipperEntity()==null && idShipper==null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chưa có nhân viên đi giao hàng");
        }else{
            if(entity.getShipperEntity()!=null  && idShipper==null){
                if (entity.getShippingStatus() == 2) {
                    if (entity.getFulfillmentDetails().isEmpty()) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chi tiết phiếu giao không tồn tại");
                    }
                    for (FulfillmentDetailEntity fulfillmentDetailEntity : entity.getFulfillmentDetails()) {

                        ProductEntity productEntity = productRepository.findOneCustom(fulfillmentDetailEntity.getProduct().getId());
                        if (productEntity.getId() == null) {
                            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sản phẩm không tồn tại");
                        } else {
                            if (productEntity.getQuantity() < fulfillmentDetailEntity.getQuantity()) {
                                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Số lượng trong kho không đủ");
                            } else {
                                productEntity.setQuantity(productEntity.getQuantity() - Long.valueOf(fulfillmentDetailEntity.getQuantity()));
                                productRepository.save(productEntity);
                            }
                        }
                    }
                    entity.setShippingStatus(3);
                    FulfillmentTrackingEntity fulfillmentTrackingEntity = new FulfillmentTrackingEntity();
                    fulfillmentTrackingEntity.setCreatedOn(new Date().getTime());
                    fulfillmentTrackingEntity.setFulfillmentEntity(entity);
                    fulfillmentTrackingEntity.setAction("Xuất kho");
                    fulfillmentTrackingEntity.setName(entity.getUserEntity().getFullName());
                    fulfillmentTrackingRepository.save(fulfillmentTrackingEntity);
                    repository.save(entity);
                    return entity.getId();
                } else {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Phiếu giao đã được xuất kho");
                }
            }else{
                ShipperEntity shipperEntity = shipperRepository.getOne(idShipper);
                if (shipperEntity.getId() == null) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nhân viên không tồn tại");
                } else {
                    entity.setShipperEntity(shipperEntity);
                    repository.save(entity);
                    if (entity.getShippingStatus() == 2) {
                        if (entity.getFulfillmentDetails().isEmpty()) {
                            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chi tiết phiếu giao không tồn tại");
                        }
                        for (FulfillmentDetailEntity fulfillmentDetailEntity : entity.getFulfillmentDetails()) {

                            ProductEntity productEntity = productRepository.findOneCustom(fulfillmentDetailEntity.getProduct().getId());
                            if (productEntity.getId() == null) {
                                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sản phẩm không tồn tại");
                            } else {
                                if (productEntity.getQuantity() < fulfillmentDetailEntity.getQuantity()) {
                                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Số lượng trong kho không đủ");
                                } else {
                                    productEntity.setQuantity(productEntity.getQuantity() - Long.valueOf(fulfillmentDetailEntity.getQuantity()));
                                    productRepository.save(productEntity);
                                }
                            }
                        }
                        entity.setShippingStatus(3);
                        FulfillmentTrackingEntity fulfillmentTrackingEntity = new FulfillmentTrackingEntity();
                        fulfillmentTrackingEntity.setCreatedOn(new Date().getTime());
                        fulfillmentTrackingEntity.setFulfillmentEntity(entity);
                        fulfillmentTrackingEntity.setAction("Xuất kho");
                        fulfillmentTrackingEntity.setName(entity.getUserEntity().getFullName());
                        fulfillmentTrackingRepository.save(fulfillmentTrackingEntity);
                        repository.save(entity);
                        return entity.getId();
                    } else {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Phiếu giao đã được xuất kho");
                    }
                }
            }
        }

    };
    public FulfillmentDTO updateStatusFulfillment(Long id,int status,String note){
        FulfillmentEntity entity=repository.getOne(id);
        if(entity.getId()==null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Không có phiếu giao hàng");
        }
        if(entity.getShippingStatus()==1 && entity.getShippingMethod()==1){
            if(status==3){
                return saveStatus(entity,status,note);
            }else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cập nhật không thành công");
            }
        }
        if(entity.getShippingStatus()==3){
            if(status==4 || status==6 ||status==5){
                return saveStatus(entity,status,note);
            }else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cập nhật không thành công");
            }
        }
        if(entity.getShippingStatus()==5){
            if(status==2 || status==6){
                return saveStatus(entity,status,note);
            }else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cập nhật không thành công");
            }
        }
        if(entity.getShippingStatus()!=4 && entity.getShippingStatus() !=6){
            if(status==6){
                return saveStatus(entity,status,note);
            }
            else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cập nhật không thành công");
            }
        }else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cập nhật không thành công");
        }
    }
    public FulfillmentDTO saveStatus(FulfillmentEntity entity, int status,String note){
        String statusName="";
        FulfillmentTrackingEntity fulfillmentTrackingEntity = new FulfillmentTrackingEntity();
        switch (status){
            case 3:
                statusName="Đã lấy hàng";
                break;
            case 4:
                entity.setSuccessDeliveryDate(new Date().getTime());
                statusName="Hoàn thành phiếu giao hàng";
                break;
            case 5:
                fulfillmentTrackingEntity.setNote(note);
                statusName="Giao lại";
                break;
            case 6:

                entity.setCancelDate(new Date().getTime());
                if(entity.getShippingStatus()==3){
                    for (FulfillmentDetailEntity fulfillmentDetailEntity : entity.getFulfillmentDetails()) {
                        ProductEntity productEntity = productRepository.findOneCustom(fulfillmentDetailEntity.getProduct().getId());
                        if (productEntity.getId() == null) {
                            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sản phẩm không tồn tại");
                        } else {
                            productEntity.setQuantity(productEntity.getQuantity() + Long.valueOf(fulfillmentDetailEntity.getQuantity()));
                            productRepository.save(productEntity);
                        }
                    }
                }
                statusName="Đã hủy";
                break;
            default:
                statusName="";
        }
        fulfillmentTrackingEntity.setCreatedOn(new Date().getTime());
        fulfillmentTrackingEntity.setFulfillmentEntity(entity);
        fulfillmentTrackingEntity.setAction(statusName);
        fulfillmentTrackingEntity.setName(entity.getUserEntity().getFullName());
        fulfillmentTrackingRepository.save(fulfillmentTrackingEntity);
        entity.setShippingStatus(status);
        repository.save(entity);
        return FulfillmentMapper.toFulfillmentDTO(entity);
    }
    @Override
    public FulfillmentDTO updateFulfillment(FulfillmentDTO fulfillmentDTO){
        FulfillmentEntity entity=repository.getOne(fulfillmentDTO.getId());
        if(entity.getId()==null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Không có phiếu giao hàng");
        }
        if(entity.getShippingStatus()==1){
            entity.setUpdatedOn(new Date().getTime());
            entity.setDeliveryDate(fulfillmentDTO.getDeliveryDate());
            entity.setTotalMoney(fulfillmentDTO.getTotalMoney());
            entity.setShippingMethod(fulfillmentDTO.getShippingMethod());
            entity.setDescription(fulfillmentDTO.getDescription());
            entity.setTransportFee(fulfillmentDTO.getTransportFee());
            entity.setShippingPaymentObject(fulfillmentDTO.getShippingPaymentObject());

            ShipperEntity shipperEntity = new ShipperEntity();
            shipperEntity.setId(fulfillmentDTO.getShipperDTO().getId());
            entity.setShipperEntity(shipperEntity);

            CustomerEntity customerEntity = new CustomerEntity();
            customerEntity.setId(fulfillmentDTO.getCustomerDTO().getId());
            entity.setCustomerEntity(customerEntity);

            UserEntity userEntity = new UserEntity();
            userEntity.setId(fulfillmentDTO.getUserResDTO().getId());
            entity.setUserEntity(userEntity);

            FulfillmentAddressEntity fulfillmentShippingTo=new FulfillmentAddressEntity();
            fulfillmentShippingTo.setName(fulfillmentDTO.getShippingTo().getName());
            fulfillmentShippingTo.setPhone(fulfillmentDTO.getShippingTo().getPhone());
            fulfillmentShippingTo.setWard(fulfillmentDTO.getShippingTo().getWard());
            fulfillmentShippingTo.setAddress(fulfillmentDTO.getShippingTo().getAddress());
            fulfillmentShippingTo.setProvince(fulfillmentDTO.getShippingTo().getProvince());
            fulfillmentShippingTo.setDistrict(fulfillmentDTO.getShippingTo().getDistrict());
            fulfillmentShippingTo.setStatus(1);
            fulfillmentShippingTo.setCreatedOn(new Date().getTime());
            fulfillmentAddressRepository.save(fulfillmentShippingTo);

            FulfillmentAddressEntity fulfillmentShippingFrom=new FulfillmentAddressEntity();
            fulfillmentShippingFrom.setName(fulfillmentDTO.getShippingFrom().getName());
            fulfillmentShippingFrom.setPhone(fulfillmentDTO.getShippingFrom().getPhone());
            fulfillmentShippingFrom.setWard(fulfillmentDTO.getShippingFrom().getWard());
            fulfillmentShippingFrom.setAddress(fulfillmentDTO.getShippingFrom().getAddress());
            fulfillmentShippingFrom.setProvince(fulfillmentDTO.getShippingFrom().getProvince());
            fulfillmentShippingFrom.setDistrict(fulfillmentDTO.getShippingFrom().getDistrict());
            fulfillmentShippingFrom.setStatus(0);
            fulfillmentShippingFrom.setCreatedOn(new Date().getTime());
            fulfillmentAddressRepository.save(fulfillmentShippingFrom);

            entity.setFulfillmentShippingFrom(fulfillmentShippingFrom);
            entity.setFulfillmentShippingTo(fulfillmentShippingTo);

            for (FulfillmentDetailDTO fulfillmentDetailDTO : fulfillmentDTO.getFulfillmentDetailDTOList()) {
                if(fulfillmentDetailDTO.getId() == null){
                    FulfillmentDetailEntity fulfillmentDetailEntity = new FulfillmentDetailEntity();
                    BeanUtils.copyProperties(fulfillmentDetailDTO,fulfillmentDetailEntity);
                    fulfillmentDetailEntity.setFulfillmentEntity(entity);
                    fulfillmentDetailRepository.save(fulfillmentDetailEntity);
                }else{
                    FulfillmentDetailEntity fulfillmentDetailEntity =fulfillmentDetailRepository.findOneCustom(fulfillmentDetailDTO.getId());
                    if(fulfillmentDetailEntity != null){
                        BeanUtils.copyProperties(fulfillmentDetailDTO,fulfillmentDetailEntity);
                        fulfillmentDetailRepository.save(fulfillmentDetailEntity);
                    }
                }
            }
            repository.save(entity);
        }else if(entity.getShippingStatus()==2){
            entity.setUpdatedOn(new Date().getTime());
            entity.setDeliveryDate(fulfillmentDTO.getDeliveryDate());
            entity.setDescription(fulfillmentDTO.getDescription());
            entity.setShippingPaymentObject(fulfillmentDTO.getShippingPaymentObject());
            entity.setShippingMethod(fulfillmentDTO.getShippingMethod());

            ShipperEntity shipperEntity = new ShipperEntity();
            shipperEntity.setId(fulfillmentDTO.getShipperDTO().getId());
            entity.setShipperEntity(shipperEntity);

            FulfillmentAddressEntity fulfillmentShippingTo=new FulfillmentAddressEntity();
            fulfillmentShippingTo.setName(fulfillmentDTO.getShippingTo().getName());
            fulfillmentShippingTo.setPhone(fulfillmentDTO.getShippingTo().getPhone());
            fulfillmentShippingTo.setWard(fulfillmentDTO.getShippingTo().getWard());
            fulfillmentShippingTo.setAddress(fulfillmentDTO.getShippingTo().getAddress());
            fulfillmentShippingTo.setProvince(fulfillmentDTO.getShippingTo().getProvince());
            fulfillmentShippingTo.setDistrict(fulfillmentDTO.getShippingTo().getDistrict());
            fulfillmentShippingTo.setStatus(1);
            fulfillmentShippingTo.setCreatedOn(new Date().getTime());
            fulfillmentAddressRepository.save(fulfillmentShippingTo);

            FulfillmentAddressEntity fulfillmentShippingFrom=new FulfillmentAddressEntity();
            fulfillmentShippingFrom.setName(fulfillmentDTO.getShippingFrom().getName());
            fulfillmentShippingFrom.setPhone(fulfillmentDTO.getShippingFrom().getPhone());
            fulfillmentShippingFrom.setWard(fulfillmentDTO.getShippingFrom().getWard());
            fulfillmentShippingFrom.setAddress(fulfillmentDTO.getShippingFrom().getAddress());
            fulfillmentShippingFrom.setProvince(fulfillmentDTO.getShippingFrom().getProvince());
            fulfillmentShippingFrom.setDistrict(fulfillmentDTO.getShippingFrom().getDistrict());
            fulfillmentShippingFrom.setStatus(0);
            fulfillmentShippingFrom.setCreatedOn(new Date().getTime());
            fulfillmentAddressRepository.save(fulfillmentShippingFrom);

            entity.setFulfillmentShippingFrom(fulfillmentShippingFrom);
            entity.setFulfillmentShippingTo(fulfillmentShippingTo);

            repository.save(entity);
        }else{
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cập nhật không thành công");
        }
        return FulfillmentMapper.toFulfillmentDTO(entity);
    }

    @Override
    public FulfillmentDTO updateshipperFulfillment(Long idFulfillmet,Long idShipper){
        FulfillmentEntity entity=repository.getOne(idFulfillmet);

        ShipperEntity shipperEntity = new ShipperEntity();
        shipperEntity.setId(idShipper);
        entity.setShipperEntity(shipperEntity);
        repository.save(entity);
        return FulfillmentMapper.toFulfillmentDTO(entity);
    }
    @Override
    public FulfillmentDTO handOverShippingNow(Long idFulfillmet,String note){
        FulfillmentEntity entity=repository.getOne(idFulfillmet);
        FulfillmentTrackingEntity fulfillmentTrackingEntity = new FulfillmentTrackingEntity();
        fulfillmentTrackingEntity.setCreatedOn(new Date().getTime());
        fulfillmentTrackingEntity.setFulfillmentEntity(entity);
        fulfillmentTrackingEntity.setAction("Giao lại");
        fulfillmentTrackingEntity.setName(entity.getUserEntity().getFullName());
        fulfillmentTrackingEntity.setNote(note);
        fulfillmentTrackingRepository.save(fulfillmentTrackingEntity);
        repository.save(entity);
        return FulfillmentMapper.toFulfillmentDTO(entity);
    }

    @Override
    public FulfillmentDTO getFulfillmentRegulate(long id) {
        return fulfillmentMapper.toFulfillmentDto(repository.getOneFulfillmentRegulate(id));
    }

    @Override
    public FulfillmentResponse listFulfillmentRegulate(int page,int limit) {
        Sort sort = Sort.by("id").descending();
        List<FulfillmentDTO> list=new ArrayList<>();
        Page<FulfillmentEntity> fulfillmentEntityList=repository.getFulfillmentRegulate(PageRequest.of(page, limit,sort));
        for (FulfillmentEntity item:fulfillmentEntityList) {
            list.add(fulfillmentMapper.toFulfillmentDto(item));
        }
        return new FulfillmentResponse(fulfillmentEntityList.getTotalElements(),list);
    }
    
}