import { toastError, toastSuccess } from '../../helper/ToastHelper';
import axoisService from '../../utils/axoisService';
import {
  ADD_CROSSCHECK,
  CLEAR,
  GET_ALL_CROSSCHECK,
  GET_ALL_SHIPPER,
  GET_DEBT,
  GET_FULFILLMENT_OF_SHIPPER,
  GET_FULFILMENT_OF_CROSS,
  GET_HISTORY,
  GET_ONE_CROSS,
  UPDATE_CROSSCHECK,
} from '../constants/CrossCheck';

export const getAllCrossCheck = (data) => {
  return {
    type: GET_ALL_CROSSCHECK,
    payload: data,
  };
};
export const getAllCrossCheckRequest = (page, limit) => {
  return (dispatch) => {
    return axoisService
      .get(
        `http://localhost:8080/api/cross-checks?page=${page - 1}&limit=${limit}`
      )
      .then((res) => {
        dispatch(getAllCrossCheck(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getAllShipper = (data) => {
  return {
    type: GET_ALL_SHIPPER,
    payload: data,
  };
};
export const getAllShipperRequest = (value, page) => {
  return (dispatch) => {
    return axoisService
      .get(
        `http://localhost:8080/api/cross-checks/shippers?page=${page}&value=${value}`
      )
      .then((res) => {
        dispatch(getAllShipper(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getDebtOfShipper = (data) => {
  return {
    type: GET_DEBT,
    payload: data,
  };
};

export const getDebtOfShipperRequest = (id) => {
  return (dispatch) => {
    return axoisService
      .get(`http://localhost:8080/api/cross-checks/debt?shipperId=${id}`)
      .then((res) => {
        dispatch(getDebtOfShipper(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getFulfillmentOfShipper = (data) => {
  return {
    type: GET_FULFILLMENT_OF_SHIPPER,
    payload: data,
  };
};

export const getFulfillmentOfShipperRequest = (id, value, page) => {
  return (dispatch) => {
    return axoisService
      .get(
        `http://localhost:8080/api/cross-checks/fulfillment/${id}?value=${value}&page=${page}`
      )
      .then((res) => {
        dispatch(getFulfillmentOfShipper(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const clearFulfillment = () => {
  return {
    type: CLEAR,
  };
};
export const clearItemEdit = () => {
  return {
    type: 'CLEAR_ITEM_EDIT',
  };
};

export const addCrossCheck = (data) => {
  return {
    type: ADD_CROSSCHECK,
    payload: data,
  };
};

export const addCrossCheckRequest = (data) => {
  return (dispatch) => {
    return axoisService
      .post(`http://localhost:8080/api/cross-checks`, data)
      .then((res) => {
        toastSuccess('Tạo phiếu đối soát thành công');
        dispatch(addCrossCheck(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getOneCrossCheck = (data) => {
  return {
    type: GET_ONE_CROSS,
    payload: data,
  };
};

export const getOneCrossCheckRequest = (id) => {
  return (dispatch) => {
    return axoisService
      .get(`http://localhost:8080/api/cross-checks/${id}`)
      .then((res) => {
        dispatch(getOneCrossCheck(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getFulfillmentOfCross = (data) => {
  return {
    type: GET_FULFILMENT_OF_CROSS,
    payload: data,
  };
};

export const getFulfillmentOfCrossRequest = (id, value, page) => {
  return (dispatch) => {
    return axoisService
      .get(
        `http://localhost:8080/api/cross-checks/fulfillment-cross/${id}?value=${value}&page=${page}`
      )
      .then((res) => {
        dispatch(getFulfillmentOfCross(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateCrossCheck = (data) => {
  return {
    type: UPDATE_CROSSCHECK,
    payload: data,
  };
};

export const updateCrossCheckRequest = (data, id, status) => {
  return (dispatch) => {
    return axoisService
      .put(
        `http://localhost:8080/api/cross-checks/${id}?status=${status}`,
        data
      )
      .then((res) => {
        if (status === 1) {
          toastSuccess('Đối soát thành công');
        } else if (status === 2) {
          toastSuccess('Thanh toán thành công');
        }
        dispatch(getHistoryRequest(id));
        dispatch(updateCrossCheck(res.data));
      })
      .catch((err) => {
        dispatch(getHistoryRequest(id));
        if (err.response.data.status === 429) {
          dispatch(getOneCrossCheckRequest(id));
        }
        toastError(err.response.data.message);
      });
  };
};

export const getHistory = (data) => {
  return {
    type: GET_HISTORY,
    payload: data,
  };
};

export const getHistoryRequest = (id) => {
  return (dispatch) => {
    return axoisService
      .get(`http://localhost:8080/api/cross-checks/history/${id}`)
      .then((res) => {
        dispatch(getHistory(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
