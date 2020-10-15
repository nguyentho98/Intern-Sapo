import { toastError, toastSuccess } from '../../helper/ToastHelper';
import axoisService from '../../utils/axoisService';
import * as types from '../constants/fulfillment';
import history from "../../utils/history";
export const fetchListFulfillment = (page, limit, status, shipperID, name) => {
    return {
        type: types.FETCH_FULFILLMENT,
        payload: {
            page,
            limit,
            status, 
            shipperID,
            name
        },
    };
};
export const fetchListFulfillments = (page, limit, status, name) => {
  return {
      type: types.FETCH_FULFILLMENTS,
      payload: {
          page,
          limit,
          status, 
          name
      },
  };
};
export const fetchListFulfillmentSuccess = (data) => {
    return {
        type: types.FETCH_FULFILLMENT_SUCCESS,
        payload: {
            data,
        },
    };
};
export const fetchListFulfillmentFailed = (error) => {
    return {
        type: types.FETCH_FULFILLMENT_FAILED,
        payload: {
            error,
        },
    };
};
export const fetchFulfillmentById = (id) => {
    return {
        type: types.FETCH_FULFILLMENT_BY_ID,
        payload: {
            id,
        },
    };
};

export const fetchFulfillmentByIdSuccess = (data) => {
    return {
        type: types.FETCH_FULFILLMENT_BY_ID_SUCCESS,
        payload: {
            data,
        },
    };
};
export const fetchFulfillmentByIdFailed = (error) => {
    return {
        type: types.FETCH_FULFILLMENT_BY_ID_FAILED,
        payload: {
            error,
        },
    };
};

export const addFulfillment = (data) => {
    return {
        type: types.ADD_FULFILLMENT,
        payload: {
        data,
        },
    };
};
export const addFulfillmentSuccess = (data) => {
    return {
        type: types.ADD_FULFILLMENT_SUCCESS,
        payload: {
        data,
        },
    };
};
export const addFulfillmentFailed = (error) => {
    return {
        type: types.ADD_FULFILLMENT_FAILED,
        payload: {
        error,
        },
    };
};
export const filterListFulfillmentThunk = (page, limit, data) => {
  return (dispatch) => {
    return axoisService
      .post(
        `http://localhost:8080/api/fulfillments/filter?page=${
          page
        }&limit=${limit}`,
        data
      )
      .then((res) => {
        dispatch(fetchListFulfillmentSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const addFulfillmentThunk = (data) => {
    return (dispatch) => {
      return axoisService
        .post(`http://localhost:8080/api/fulfillments`,data)
        .then((res) => {
          toastSuccess('Tạo phiếu giao thành công!!!');
          history.push(`/admin/orders-update/${res.data.id}`)
          dispatch(addFulfillmentSuccess(res.data));
        })
        .catch((err) => {
          toastError(err?.response?.data?.message)
        });
    };
  };

  export const receiveFulfillmentThunk = (idFulfillment,idShipper) => {
    return (dispatch) => {
      return axoisService
        .put(`http://localhost:8080/api/fulfillments/receive?idFulfillment=${idFulfillment}&idShipper=${idShipper}`)
        .then((res) => {
          toastSuccess('Nhập kho thành công!!!');
          history.replace(`/admin/orders-update/${res.data}`)
        })
        .catch((err) => {
          toastError(err?.response?.data?.message)
        });
    };
  };

  export const deliverFulfillmentThunk = (idFulfillment,idShipper) => {
    return (dispatch) => {
      return axoisService
        .put(`http://localhost:8080/api/fulfillments/deliver?idFulfillment=${idFulfillment}&idShipper=${idShipper}`)
        .then((res) => {
          toastSuccess('Xuất kho thành công!!!');
          history.replace(`/admin/orders-update/${res.data}`)
        })
        .catch((err) => {
          toastError(err?.response?.data?.message)
        });
    };
  };
  export const updateStatusFulfillmentThunk = (status,id,note) => {
    return (dispatch) => {
      return axoisService
        .put(`http://localhost:8080/api/fulfillments/update/status?status=${status}&id=${id}&note=${note}`)
        .then((res) => {
          toastSuccess('Cập nhật phiếu giao thành công !!!');
          history.replace(`/admin/orders-update/${res.data.id}`)
        })
        .catch((err) => {
          toastError(err?.response?.data?.message)
        });
    };
  };

  export const handOverFulfillmentThunk = (idFulfillment,idShipper,status,note) => {
    return (dispatch) => {
      return axoisService
        .put(`http://localhost:8080/api/fulfillments/update/status?status=${status}&id=${idFulfillment}&note=${note}`)
        .then((res) => {
          dispatch(receiveFulfillmentThunk(idFulfillment,idShipper))
        })
        .catch((err) => {
          toastError(err?.response?.data?.message)
        });
    };
  };
  export const handOverShippingNowThunk = (idFulfillment,note) => {
    return (dispatch) => {
      return axoisService
        .put(`http://localhost:8080/api/fulfillments/hand-over-shipping-now?idFulfillment=${idFulfillment}&note=${note}`)
        .then((res) => {
          toastSuccess('Cập nhật phiếu giao thành công !!!');
          history.replace(`/admin/orders-update/${res.data.id}`)
        })
        .catch((err) => {
          toastError(err?.response?.data?.message)
        });
    };
  };
//Shipper

  export const shipperReceiveFulfillmentThunk = (idFulfillment,idShipper) => {
    return (dispatch) => {
      return axoisService
        .put(`http://localhost:8080/api/fulfillments/receive?idFulfillment=${idFulfillment}&idShipper=${idShipper}`)
        .then((res) => {
          toastSuccess('Đã nhập hàng vào kho!');
          dispatch(fetchFulfillmentById(idFulfillment))
        })
        .catch((err) => {
          toastError(err?.response?.data?.message)
        });
    };
  };

  export const shipperUpdateStatus = (status,id,note) => {
    return (dispatch) => {
      return axoisService
        .put(`http://localhost:8080/api/fulfillments/update/status?status=${status}&id=${id}&note=${note}`)
        .then((res) => {
          toastSuccess('Cập nhật phiếu giao thành công !!!');
          dispatch(fetchFulfillmentById(id))
        })
        .catch((err) => {
          toastError(err?.response?.data?.message)
        });
    };
  };

  export const shipperUpdateStatusReturn = (idFulfillment,idShipper,status,note) => {
    return (dispatch) => {
      return axoisService
        .put(`http://localhost:8080/api/fulfillments/update/status?status=${status}&id=${idFulfillment}&note=${note}`)
        .then((res) => {
          toastSuccess('Cập nhật phiếu giao thành công !!!');
          dispatch(shipperReceiveFulfillmentThunk(idFulfillment,idShipper))
        })
        .catch((err) => {
          toastError(err.response?.data?.message)
        });
    };
  };