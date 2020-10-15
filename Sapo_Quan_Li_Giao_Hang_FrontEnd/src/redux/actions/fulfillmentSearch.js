import * as types from "../constants/fulfillmentSearch";
export const setStatusFilter = (data) => {
  return {
    type: types.SET_STATUS,
    payload: data,
  };
};
export const setCustomerFilter = (data) => {
  return {
    type: types.SET_CUSTOMER,
    payload: data,
  };
};
export const setShipperFilter = (data) => {
  return {
    type: types.SET_SHIPPER,
    payload: data,
  };
};
export const setFromDateFilter = (data) => {
  return {
    type: types.SET_FROMDATE,
    payload: data,
  };
};

export const setToDateFilter = (data) => {
  return {
    type: types.SET_TODATE,
    payload: data,
  };
};

export const clearFilter = () => {
  return {
    type: types.CLEAR_FILTER,
  };
};
