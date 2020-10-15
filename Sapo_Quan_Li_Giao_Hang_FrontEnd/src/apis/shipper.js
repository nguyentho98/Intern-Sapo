import axiosService from '../utils/axoisService';
export const apifetchListShipper = (page,limit) => {
  return axiosService.get(`http://localhost:8080/api/shipper/count/fulfillment?page=${page}&limit=${limit}`);
};
export const getShipper = (id) => {
  return axiosService.get(`http://localhost:8080/api/shipper/getOne/${id}`);
};
export const getListShipper = (page,limit) => {
  return axiosService.get(`http://localhost:8080/api/shipper/count/fulfillment?page=${page}&limit=${limit}`);
};
export const getListShipperRegulate = (page,limit) => {
  return axiosService.get(`http://localhost:8080/api/shipper/list?page=${page}&limit=${limit}`);
};
