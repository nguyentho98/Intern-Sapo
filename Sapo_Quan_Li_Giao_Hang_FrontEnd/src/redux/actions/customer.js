import { toastError, toastSuccess } from '../../helper/ToastHelper';
import axoisService from '../../utils/axoisService';
import * as types from '../constants/customer';
export const fetchListCustomer = (page, limit,name) => {
    return {
        type: types.FETCH_CUSTOMER,
        payload: {
            page,
            limit,
            name,
        },
    };
};
export const fetchListCustomerSuccess = (data) => {
    return {
        type: types.FETCH_CUSTOMER_SUCCESS,
        payload: {
            data,
        },
    };
};
export const fetchListCustomerFailed = (error) => {
    return {
        type: types.FETCH_CUSTOMER_FAILED,
        payload: {
            error,
        },
    };
};
export const setStatusCreate = (data) => {
    return {
      type: types.SET_STATUS,
      payload: data,
    };
  };
export const addCustomer = (data) => {
    return {
        type: types.ADD_CUSTOMER,
        payload: {
        data,
        },
    };
};
export const addCustomerSuccess = (data) => {
    return {
        type: types.ADD_CUSTOMER_SUCCESS,
        payload: {
        data,
        },
    };
};
export const addCustomerFailed = (error) => {
    return {
        type: types.ADD_CUSTOMER_FAILED,
        payload: {
        error,
        },
    };
};
export const pagniations = (pagenumber)=>{
    return{
        type: types.PAGE_NUMBER,
        pagenumber
    }
};

export const fetchCustomerById = (id) => {
    return {
        type: types.FETCH_CUSTOMER_BY_ID,
        payload: {
            id,
        },
    };
};

export const fetchCustomerByIdSuccess = (data) => {
    return {
        type: types.FETCH_CUSTOMER_BY_ID_SUCCESS,
        payload: {
            data,
        },
    };
};
export const fetchCustomerByIdFailed = (error) => {
    return {
        type: types.FETCH_CUSTOMER_BY_ID_FAILED,
        payload: {
            error,
        },
    };
};
export const addCustomerThunk = (data) => {
    return (dispatch) => {
      return axoisService
        .post(`http://localhost:8080/api/customer/`,data)
        .then((res) => {
          toastSuccess('Thêm khách hàng thành công!!!');
          dispatch(addCustomerSuccess(res.data));
        })
        .catch((err) => {
            toastError(err?.response?.data?.message)
        });
    };
};


export const getOneCustomerThunk = (id) => {
    return (dispatch) => {
      return axoisService
        .get(`http://localhost:8080/api/customer/id/${id}`)
        .then((res) => {
          dispatch(fetchCustomerByIdSuccess(res.data));
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
};