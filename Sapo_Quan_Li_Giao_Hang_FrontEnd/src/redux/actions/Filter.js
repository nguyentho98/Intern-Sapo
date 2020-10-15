import {
  CLEAR_FILTER,
  SET_BRAND,
  SET_CATEGORY,
  SET_CLASSIFY,
  SET_FROMDATE,
  SET_STATUS,
  SET_TAG,
  SET_TODATE,
} from '../constants/ProductSearch';

export const setCategoryFilter = (data) => {
  return {
    type: SET_CATEGORY,
    payload: data,
  };
};
export const setBrandFilter = (data) => {
  return {
    type: SET_BRAND,
    payload: data,
  };
};

export const setFromDateFilter = (data) => {
  return {
    type: SET_FROMDATE,
    payload: data,
  };
};

export const setToDateFilter = (data) => {
  return {
    type: SET_TODATE,
    payload: data,
  };
};

export const setStatusFilter = (data) => {
  return {
    type: SET_STATUS,
    payload: data,
  };
};
export const setClassifyFilter = (data) => {
  return {
    type: SET_CLASSIFY,
    payload: data,
  };
};
export const setTagsFilter = (data) => {
  console.log(data);
  return {
    type: SET_TAG,
    payload: data,
  };
};

export const clearFilter = () => {
  return {
    type: CLEAR_FILTER,
  };
};
