package com.sapo.qlgiaohang.services.impl;

import com.sapo.qlgiaohang.dto.shipper.*;
import com.sapo.qlgiaohang.entity.FulfillmentEntity;
import com.sapo.qlgiaohang.entity.ShipperEntity;
import com.sapo.qlgiaohang.repositoties.FulfillmentRepository;
import com.sapo.qlgiaohang.repositoties.ShipperRepository;
import com.sapo.qlgiaohang.services.ShipperService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.*;

@Service
public class ShipperServiceImpl implements ShipperService {
    private ShipperRepository repository;
    private ShipperMapper converter;
    private Logger log = LoggerFactory.getLogger(ShipperService.class);

    @Autowired
    public ShipperServiceImpl(ShipperRepository repository, ShipperMapper converter) {
        this.repository = repository;
        this.converter = converter;
    }

    @Override
    public List<ShipperDTO> findAll(int page, int limit) {
        try {
            Pageable pageable = PageRequest.of(page, limit);
            Page<ShipperEntity> shipperEntityPage = repository.findAll(pageable);
            List<ShipperDTO> shipperDTOS = new ArrayList<>();
            for (ShipperEntity sp : shipperEntityPage) {
                shipperDTOS.add(converter.convertToDTO(sp));
            }
            return shipperDTOS;
        } catch (Exception e) {
            log.error("Have an error in findAll Shipper Services");
            return null;
        }
    }

    @Override
    public ShipperDTOResponse listAllShipper(int page, int limit) {
        try {
            Pageable pageable = PageRequest.of(page, limit);
            Page<ShipperEntity> shipperEntityPage = repository.findAll(pageable);
            List<ShipperDTO> shipperDTOS = new ArrayList<>();
            for (ShipperEntity sp : shipperEntityPage) {
                ShipperDTO shipperDTO=new ShipperDTO();
                shipperDTO=converter.convertToDTO(sp);
                shipperDTO.setCount(sp.getFulfillmentEntities().size());
                shipperDTOS.add(shipperDTO);
            }
            return new ShipperDTOResponse(shipperEntityPage.getTotalElements(),shipperDTOS);
        } catch (Exception e) {
            log.error("Have an error in findAll Shipper Services");
            return null;
        }
    }
    @Override
    public ShipperDTOResponse findAllByIsFulfillment(int page, int limit) {
        try {
            Pageable pageable = PageRequest.of(page, limit);
            List<ShipperDTO> shipperDTOList = new ArrayList<>();
            Page<ShipperEntity> list=repository.findAll(pageable);
            for (ShipperEntity item:list) {
                ShipperDTO shipperDTO=new ShipperDTO();
                shipperDTO=converter.convertToDTO(item);
                int count=0;
                for (int i=0;i<(item.getFulfillmentEntities().size());i++) {
                    if(item.getFulfillmentEntities().get(i).getShippingStatus()!=4 && item.getFulfillmentEntities().get(i).getShippingStatus()!=6){
                        count++;
                    }
                }
                shipperDTO.setCount(count);
                shipperDTOList.add(shipperDTO);
            }
            shipperDTOList.sort(new Comparator<ShipperDTO>() {
                @Override
                public int compare(ShipperDTO o1, ShipperDTO o2) {
                    return Integer.compare(o1.getCount(), o2.getCount());
                }
            });

            return new ShipperDTOResponse(list.getTotalElements(),shipperDTOList);
        } catch (Exception e) {
            log.error("Have an error in findAll Shipper Services");
            return null;
        }
    }
    @Override
    public ShipperRepository.SS findOne(long id) {
        try {
            LocalDate date = LocalDate.now();
            String time = date.toString();
            return repository.findOneShipper(id, time);
        } catch (Exception e) {
            log.error("Have an error in findOne Shipper Services");
            return null;
        }
        
    }

    @Override
    public ShipperEntity save(ShipperDTO shipperDTO) {
        try {
            ShipperEntity shipperEntity = new ShipperEntity();
            BeanUtils.copyProperties(shipperDTO, shipperEntity);
            shipperEntity.setCreatedOn(new Date().getTime());
            return repository.save(shipperEntity);
        } catch (DataIntegrityViolationException sql) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "DuplicateKey");
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request");
        }
    }

    @Override
    public Long update(ShipperDTO shipperDTO, long id) {
        try {
            ShipperEntity shipperEntity = repository.getOne(id);
            if (shipperEntity == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This field does not exist");
            }
            if (StringUtils.isBlank(shipperDTO.getCode())) {
                shipperDTO.setCode(shipperEntity.getCode());
            }
            shipperEntity.setUpdatedOn(new Date().getTime());
            BeanUtils.copyProperties(shipperDTO, shipperEntity);
            repository.save(shipperEntity);
            return id;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request");
        }
    }

    @Override
    public void delete(long id) {
        try {
            ShipperEntity shipperEntity = repository.getOne(id);
            if (shipperEntity == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This field does not exist");
            }
            shipperEntity.setUpdatedOn(new Date().getTime());
            shipperEntity.setIsActive("0");
            repository.save(shipperEntity);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.GONE, "This field does not exist");
        }
    }

}
