import { toastError, toastSuccess } from '../../helper/ToastHelper';
import axoisService from '../../utils/axoisService';
import history from '../../utils/history';
import {
  CLEAR_FULFILLMENT,
  GET_ALL_ACCOUNTING,
  GET_ALL_CUSTOMER,
  GET_FULFILLMENT,
  GET_TOTAL_DEBT_TO_PAY,
  ADD_ACCOUNTING,
  GET_ONE_ACCOUNTING,
  UPDATE_ACCOUNTING,
  GET_HISTORY,
} from '../constants/Calculation';

export const getAllAccounting = (data) => {
  return {
    type: GET_ALL_ACCOUNTING,
    payload: data,
  };
};
export const clearItem = () => {
  return {
    type: 'CLEAR_ITEM',
  };
};
export const getAllAccountingRequest = (page, limit) => {
  return (dispatch) => {
    return axoisService
      .get(
        `http://localhost:8080/api/accounting?page=${page - 1}&limit=${limit}`
      )
      .then((res) => {
        dispatch(getAllAccounting(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getAllCustomer = (data) => {
  return {
    type: GET_ALL_CUSTOMER,
    payload: data,
  };
};
export const getAllCustomerRequest = (value, page) => {
  return (dispatch) => {
    return axoisService
      .get(
        `http://localhost:8080/api/customers?page=${page - 1}&value=${value}`
      )
      .then((res) => {
        dispatch(getAllCustomer(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getTotalDebtToPay = (data) => {
  return {
    type: GET_TOTAL_DEBT_TO_PAY,
    payload: data,
  };
};
export const getTotalDebtToPayRequest = (id) => {
  return (dispatch) => {
    return axoisService
      .get(`http://localhost:8080/api/total-debt-to-pay?customerId=${id}`)
      .then((res) => {
        dispatch(getTotalDebtToPay(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getFulfillment = (data) => {
  return {
    type: GET_FULFILLMENT,
    payload: data,
  };
};
export const getFulfillmentRequest = (id, page) => {
  return (dispatch) => {
    return axoisService
      .get(
        `http://localhost:8080/api/fulfillment?customerId=${id}&page=${page}`
      )
      .then((res) => {
        dispatch(getFulfillment(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const clearFulfillmentAccounting = () => {
  return {
    type: CLEAR_FULFILLMENT,
  };
};
export const addAccounting = (data) => {
  return {
    type: ADD_ACCOUNTING,
    payload: data,
  };
};
export const addAccountingRequest = (data) => {
  return (dispatch) => {
    return axoisService
      .post(`http://localhost:8080/api/accounting`, data)
      .then((res) => {
        dispatch(addAccounting(res.data));
        toastSuccess('Tạo phiếu hạch toán thành công.');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getOneAccounting = (data) => {
  return {
    type: GET_ONE_ACCOUNTING,
    payload: data,
  };
};
export const getOneAccountingRequest = (id, page) => {
  return (dispatch) => {
    return axoisService
      .get(`http://localhost:8080/api/accounting/${id}?page=${page}`)
      .then((res) => {
        dispatch(getOneAccounting(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const updateAccounting = (data) => {
  return {
    type: UPDATE_ACCOUNTING,
    payload: data,
  };
};
export const updateAccountingRequest = (id, status, data) => {
  return (dispatch) => {
    return axoisService
      .put(`http://localhost:8080/api/accounting/${id}?status=${status}`, data)
      .then((res) => {
        if (status === 1) {
          toastSuccess('Hạch toán thành công');
        }
        if (status === 2) {
          toastSuccess('Thanh toán thành công');
        }
        if (status === 3) {
          toastSuccess('Cập nhật phiếu thành công');
        }
        console.log(res.data);
        dispatch(getHistoryRequest(id));
        dispatch(updateAccounting(res.data));
      })
      .catch((err) => {
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
      .get(`http://localhost:8080/api/accounting/history/${id}`)
      .then((res) => {
        dispatch(getHistory(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const deleteAccountingRequest = (id) => {
  const userName = localStorage.getItem('username');
  return (dispatch) => {
    return axoisService
      .delete(`http://localhost:8080/api/accounting/${id}?userName=${userName}`)
      .then((res) => {
        toastSuccess('Hủy phiếu thành công');
        history.push('/admin/accounting');
      })
      .catch((err) => {
        toastError(err.response.data.message);
      });
  };
};
