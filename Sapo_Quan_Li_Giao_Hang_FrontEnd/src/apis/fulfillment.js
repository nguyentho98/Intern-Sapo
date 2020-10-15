import axiosService from '../utils/axoisService';
import { toastSuccess } from '../helper/ToastHelper';


export const apifetchListFulfillment=(page, limit, status, shipperID, name) => {
   return axiosService.get(`http://localhost:8080/api/fulfillments?status=${status}&page=${page}&limit=${limit}&name=${name}&shipperId=${shipperID}`);
   
}
export const apifetchListFulfillments=(page,limit,status, name) => {
   return axiosService.get(`http://localhost:8080/api/fulfillments/all?status=${status}&page=${page}&limit=${limit}&name=${name}`);
}
export const regulateFulfillment=(page,limit) => {
   return axiosService.get(`http://localhost:8080/api/fulfillments/regulate?page=${page}&limit=${limit}`);
}
export const getRegulateFulfillment=(id) => {
   return axiosService.get(`http://localhost:8080/api/fulfillments/regulate/${id}`);
}

export const apifetchFulfillmentById = (id) => {
   return axiosService.get(`http://localhost:8080/api/fulfillments/${id}`);
};

export const apiaddFulfillment = (data) => {
   return axiosService.post(
     `http://localhost:8080/api/fulfillments/`,
     data,
   )
};
export const apiUpdateFulfillment = (idFulfillment,idShipper) => {
   return axiosService.put(
     `http://localhost:8080/api/fulfillments/update-shipper-fulfillment?idFulfillment=${idFulfillment}&idShipper=${idShipper}`
   ).then((res)=>{
      toastSuccess("Điều phối thành công!!!")
   })
};