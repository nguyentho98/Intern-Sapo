import axiosService from '../utils/axoisService';
export const apifetchListShippingFrom = (id) => {
    return axiosService.get(`http://localhost:8080/api/address/receipt?id=${id}`);
};
export const apifetchListShippingTo = () => {
    return axiosService.get(`http://localhost:8080/api/address/shipping`);
};

export const apiCreateShippingFrom = (data) => {
    return axiosService.post(`http://localhost:8080/api/address/receipt`,data);
};
export const apiCreateShippingTo = (data) => {
    return axiosService.post(`http://localhost:8080/api/address/shipping`,data);
};