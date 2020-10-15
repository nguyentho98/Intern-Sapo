package com.sapo.qlgiaohang.services;

import com.sapo.qlgiaohang.dto.shipper.ShipperDTO;
import com.sapo.qlgiaohang.dto.shipper.ShipperDTOResponse;
import com.sapo.qlgiaohang.dto.shipper.ShipperFulfillmentDTO;
import com.sapo.qlgiaohang.entity.ShipperEntity;
import com.sapo.qlgiaohang.repositoties.ShipperRepository;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface ShipperService {
    List<ShipperDTO> findAll(int page, int limit);
    ShipperDTOResponse listAllShipper(int page, int limit);
    ShipperRepository.SS findOne(long id);
    ShipperEntity save(ShipperDTO shipperDTO);
    Long update(ShipperDTO shipperDTO, long id);
//    List<ShipperRepository.SS> findAllByIsFulfillment(int page, int limit);
    ShipperDTOResponse findAllByIsFulfillment(int page, int limit);
    void delete(long id);
}
