package com.sapo.qlgiaohang.services.impl;

import com.sapo.qlgiaohang.entity.AddressEntity;
import com.sapo.qlgiaohang.entity.FulfillmentEntity;
import com.sapo.qlgiaohang.entity.ShipperEntity;
import com.sapo.qlgiaohang.repositoties.AddressRepository;
import com.sapo.qlgiaohang.repositoties.coordination.FulfillmentCoordinationRepository;
import com.sapo.qlgiaohang.repositoties.coordination.ShipperCoordinationRepository;
import com.sapo.qlgiaohang.services.FulfillmentCoordinationService;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.List;

@Service
public class FulfillmentCoordinationServiceImpl implements FulfillmentCoordinationService {
    private FulfillmentCoordinationRepository fulfillmentRepository;
    private ShipperCoordinationRepository shipperRepository;
    private RestTemplate restTemplate;
    private AddressRepository addressRepository;

    @Autowired
    public FulfillmentCoordinationServiceImpl(FulfillmentCoordinationRepository fulfillmentRepository, ShipperCoordinationRepository shipperRepository, RestTemplate restTemplate, AddressRepository addressRepository) {
        this.fulfillmentRepository = fulfillmentRepository;
        this.shipperRepository = shipperRepository;
        this.restTemplate = restTemplate;
        this.addressRepository = addressRepository;
    }


    @Override
    public void fastCoordinate() {
        Double totalFulfillment = Double.parseDouble(fulfillmentRepository.findCountNonCoordination().toString());
        List<ShipperEntity> shipperEntities = shipperRepository.findAll();
        double totalPage = Math.ceil(totalFulfillment / 50.0);
        for (int i = 0; i < totalPage; i++) {
            Pageable pageable = PageRequest.of(i, 50);
            List<FulfillmentEntity> fulfillmentEntities = fulfillmentRepository.findFulfillmentEntitiesNonCoordination(pageable);

            for (FulfillmentEntity fulfillmentEntity : fulfillmentEntities) {
                for (ShipperEntity shipperEntity : shipperEntities) {
                    if (StringUtils.containsAny(shipperEntity.getChargeArea(), fulfillmentEntity.getFulfillmentShippingTo().getDistrict())) {
                        fulfillmentEntity.setShipperEntity(shipperEntity);
                        fulfillmentRepository.save(fulfillmentEntity);
                    }
                }

            }

        }
//        Pageable pageable = PageRequest.of(1, 50);
//        List<FulfillmentEntity> fulfillmentEntities = fulfillmentRepository.findFulfillmentEntitiesNonCoordination(pageable);
//        for(FulfillmentEntity fulfillmentEntity : fulfillmentEntities){
//            String addressFulfillment = fulfillmentEntity.getFulfillmentShippingTo().getAddress() + "," +
//                    fulfillmentEntity.getFulfillmentShippingTo().getWard() + ","
//                    + fulfillmentEntity.getFulfillmentShippingTo().getDistrict() + ","
//                    + fulfillmentEntity.getFulfillmentShippingTo().getProvince();
//            Profile profile = getCoordinates(addressFulfillment);
//            Double minDistance = 100000000000000D;
//            Long shipperId = 0L;
//            for (FulfillmentEntity fulfillmentEntity : fulfillmentEntities) {
//                JSONObject jsonObject = new JSONObject(shipperEntity.getChargeArea());
//                String coordinatesShipper = (String) jsonObject.get("label");
//                Profile profile1 = getCoordinates(coordinatesShipper);
//                String coordinates = profile.getLongitude() + "," + profile.getLatitude() + ";" + profile1.getLongitude() + "," + profile1.getLatitude();
//                if (getDistance(coordinates) < minDistance) {
//                    minDistance = getDistance(coordinates);
//                    shipperId = shipperEntity.getId();
//                }
//            }
//        }

    }

    private Profile getCoordinates(String address) {
        String token = "?access_token=sk.eyJ1IjoiY29uZ2F0YTk5OCIsImEiOiJja2ZndDUya2EwOTAxMndwOWpwdm00eXdjIn0.BGclEM6LXikri1VgW8GZ3w";
        String str = restTemplate.getForObject("https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json" + token, String.class);
        JSONObject coordinates = new JSONObject(str);
        JSONObject features = (JSONObject) coordinates.getJSONArray("features").get(0);
        JSONArray center = features.getJSONArray("center");
        double latitude = (double) center.get(0);
        double longitude = (double) center.get(1);
        return new Profile(BigDecimal.valueOf(longitude), BigDecimal.valueOf(latitude));
    }

    private Double getDistance(String address) {
        String token = "?access_token=sk.eyJ1IjoiY29uZ2F0YTk5OCIsImEiOiJja2ZndDUya2EwOTAxMndwOWpwdm00eXdjIn0.BGclEM6LXikri1VgW8GZ3w";
        String str = restTemplate.getForObject("https://api.mapbox.com/directions/v5/mapbox/driving/" + address + token, String.class);
        JSONObject jsonObject = new JSONObject(str);
        JSONArray routes = jsonObject.getJSONArray("routes");
        JSONObject route = (JSONObject) routes.get(0);
        return route.getDouble("distance");

    }

    @Data
    static class Profile {
        private BigDecimal latitude;
        private BigDecimal longitude;

        public Profile(BigDecimal latitude, BigDecimal longitude) {
            this.latitude = latitude;
            this.longitude = longitude;
        }
    }
}
