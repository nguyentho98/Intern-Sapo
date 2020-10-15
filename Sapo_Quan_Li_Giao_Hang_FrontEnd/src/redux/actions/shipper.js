import axoisService from '../../utils/axoisService';
import * as types from '../constants/shipper';
export const fetchListShipper = (page, limit,name) => {
    return {
        type: types.FETCH_SHIPPER,
        payload: {
            page,
            limit,
            name
        },
    };
};
export const clearShipper = ()=>{
    return{
        type: types.CLEAR_SHIPPER,
    }
};
export const fetchListShipperSuccess = (data) => {
    return {
        type: types.FETCH_SHIPPER_SUCCESS,
        payload: {
            data,
        },
    };
};
export const fetchListShipperFailed = (error) => {
    return {
        type: types.FETCH_SHIPPER_FAILED,
        payload: {
            error,
        },
    };
};
export const fetchShipperById = (id) => {
    return {
        type: types.FETCH_SHIPPER_BY_ID,
        payload: {
            id,
        },
    };
};

export const fetchShipperByIdSuccess = (data) => {
    return {
        type: types.FETCH_SHIPPER_BY_ID_SUCCESS,
        payload: {
            data,
        },
    };
};
export const fetchShipperByIdFailed = (error) => {
    return {
        type: types.FETCH_SHIPPER_BY_ID_FAILED,
        payload: {
            error,
        },
    };
};

export const fetchShipperByIdThunk = (id) => {
    return (dispatch) => {
      return axoisService
        .put(`http://localhost:8080/api/shipper/${id}`)
        .then((res) => {
            dispatch(fetchShipperByIdSuccess(res.data))  
        })
        .catch((err) => {
          
        });
    };
  };
export const fetchListShipperThunk = (page,limit) => {
return (dispatch) => {
    return axoisService
    .get(`http://localhost:8080/api/shipper/count/fulfillment?page=${page}&limit=${limit}`)
    .then((res) => {
        dispatch(fetchListShipperSuccess(res.data))  
    })
    .catch((err) => {
        
    });
};
};
export const addItemShipper = (data) => {
    return {
        type: types.ADD_ITEM_SHIPPER,
        payload: {
            data,
        },
    };
};