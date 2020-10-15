import { toastSuccess } from "../../helper/ToastHelper";
import axoisService from "../../utils/axoisService";
import * as types from "../constants/address";
export const fetchListShippingFrom = (id) => {
  return {
    type: types.FETCH_RECEIPT,
    payload: {
      id,
    },
  };
};
export const fetchListShippingFromSuccess = (data) => {
  return {
    type: types.FETCH_RECEIPT_SUCCESS,
    payload: {
      data,
    },
  };
};
export const fetchListShippingFromFailed = (error) => {
  return {
    type: types.FETCH_RECEIPT_FAILED,
    payload: {
      error,
    },
  };
};

export const fetchListShippingTo = () => {
  return {
    type: types.FETCH_SHIPPING,
    payload: {},
  };
};
export const fetchListShippingToSuccess = (data) => {
  return {
    type: types.FETCH_SHIPPING_SUCCESS,
    payload: {
      data,
    },
  };
};
export const fetchListShippingToFailed = (error) => {
  return {
    type: types.FETCH_SHIPPING_FAILED,
    payload: {
      error,
    },
  };
};

export const addShippingTo = (data) => {
  return {
    type: types.ADD_SHIPPING,
    payload: data,
  };
};

export const addShippingToSuccess = (data) => {
  return {
    type: types.ADD_SHIPPING_SUCCESS,
    payload: {
      data,
    },
  };
};
export const addShippingToFailed = (error) => {
  return {
    type: types.ADD_SHIPPING_FAILED,
    payload: {
      error,
    },
  };
};

export const addShippingFrom = (data) => {
  return {
    type: types.ADD_RECEIPT,
    payload: {
      data,
    },
  };
};
export const addShippingFromSuccess = (data) => {
  return {
    type: types.ADD_RECEIPT_SUCCESS,
    payload: {
      data,
    },
  };
};
export const addShippingFromFailed = (error) => {
  return {
    type: types.ADD_RECEIPT_FAILED,
    payload: {
      error,
    },
  };
};
export const addShippingFromThunk = (data) => {
  return (dispatch) => {
    return axoisService
      .post(`http://localhost:8080/api/address/receipt`,data)
      .then((res) => {
        toastSuccess('Thêm địa chỉ nhận hàng thành công!!!');
        dispatch(addShippingFromSuccess(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addShippingToThunk = (data) => {
  return (dispatch) => {
    return axoisService
      .post(`http://localhost:8080/api/address/shipping`,data)
      .then((res) => {
        toastSuccess('Thêm địa chỉ giao hàng thành công!!!');
        dispatch(addShippingToSuccess(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};