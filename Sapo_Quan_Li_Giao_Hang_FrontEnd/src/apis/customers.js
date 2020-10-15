import { toastSuccess } from '../helper/ToastHelper';
import axiosService from '../utils/axoisService';
export const apifetchListCustomer = (page,limit,name) => {
  return axiosService.get(`http://localhost:8080/api/partner/search?page=`+page+`&limit=`+limit+`&name=`+name+``);
};

export const apiaddCustomer = (data) => {
    return axiosService.post(
      `http://localhost:8080/api/customer/`,
      data,
    )
 };

 export const apifetchGetCustomerById = (id) => {
  return axiosService.get(`http://localhost:8080/api/customer/id/${id}`);
};

export const removeListCustomers = (data) => {
  return axiosService.put(`http://localhost:8080/api/customer/remove/`,data).then(res =>{
    toastSuccess("Thay đổi trạng thái thành công!!!")
  });;
};

export const apifetchListCustomers = (page,limit,status) => {
  if(status===null){
    return axiosService.get(`http://localhost:8080/api/customer?page=${page}&limit=${limit}`);
  }else{
  return axiosService.get(`http://localhost:8080/api/customer/status?page=${page}&limit=${limit}&status=${status}`);
  }
};

export const apifetchOrderByCustomerId = (id,page,limit) => {
  return axiosService.get(`http://localhost:8080/api/customer/idP/${id}?page=${page}&limit=${limit}`);
};

export const searchCustomer = (status,value,page,limit) => {
  if(status===null){
    return axiosService.get(`http://localhost:8080/api/customer/search?page=${page}&limit=${limit}&name=${value}`);
  }else{
  return axiosService.get(`http://localhost:8080/api/customer/searchAll?status=${status}&value=${value}&page=${page}&limit=${limit}`);
  }
};

export const createCustomer = (data) => {
  return axiosService.post('http://localhost:8080/api/customer',data).then(res =>{
    toastSuccess("Thêm khách hàng thành công!!!")
  });
}
export const updateCustomer = (data) => {
  return axiosService.put('http://localhost:8080/api/customer',data).then(res =>{
    toastSuccess("Cập nhật khách hàng thành công!!!")
  });
}
export const checkPhoneCustomer = (phone) => {
  return axiosService.get(`http://localhost:8080/api/customer/checkPhone?phone=${phone}`)
}