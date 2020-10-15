import { toastError, toastSuccess } from '../../helper/ToastHelper';
import axoisService from '../../utils/axoisService';
import {
  CLEAR_PRODUCT,
  GET_ALL_PRODUCT,
  GET_BRAND,
  GET_CATE,
  GET_ONE_PRODUCT,
  GET_TAGS,
} from '../constants/ProductConstant';

export const getAllProduct = (data) => {
  return {
    type: GET_ALL_PRODUCT,
    payload: data,
  };
};
export const getAllProductRequest = (page, limit, data) => {
  return (dispatch) => {
    return axoisService
      .post(
        `http://localhost:8080/api/products/filter?page=${
          page - 1
        }&limit=${limit}`,
        data
      )
      .then((res) => {
        dispatch(getAllProduct(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addProductRequest = (data) => {
  return (dispatch) => {
    return axoisService
      .post(`http://localhost:8080/api/products`, data)
      .then((res) => {
        console.log(data);
        toastSuccess('Thêm Sản Phẩm Thành công!!!');
        dispatch(getOneProductRequest(res.data));
      })
      .catch((err) => {
        toastError(err.response.data.message);
      });
  };
};
export const deleteProductRequest = (id) => {
  return axoisService.delete(`http://localhost:8080/api/products/${id}`);
};

export const getOneProduct = (data) => {
  return {
    type: GET_ONE_PRODUCT,
    payload: data,
  };
};
export const getOneProductRequest = (id) => {
  return (dispatch) => {
    return axoisService
      .get(`http://localhost:8080/api/products/${id}`)
      .then((res) => {
        dispatch(getOneProduct(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const clearProductItem = () => {
  return {
    type: CLEAR_PRODUCT,
  };
};
export const clearList = () => {
  return {
    type: 'CLEAR_LIST',
  };
};
export const updateProductRequest = (data, id) => {
  return (dispatch) => {
    return axoisService
      .put(`http://localhost:8080/api/products/${id}`, data)
      .then((res) => {
        toastSuccess('Sửa Sản Phẩm Thành công!!!');
        dispatch(getOneProductRequest(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getBrand = (data) => {
  return {
    type: GET_BRAND,
    payload: data,
  };
};
export const getBrandRequest = (value, page) => {
  return (dispatch) => {
    return axoisService
      .get(`http://localhost:8080/api/brand?brand=${value}&page=${page}`)
      .then((res) => {
        dispatch(getBrand(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getCate = (data) => {
  return {
    type: GET_CATE,
    payload: data,
  };
};
export const getCateRequest = (value, page) => {
  return (dispatch) => {
    return axoisService
      .get(`http://localhost:8080/api/cate?cate=${value}&page=${page}`)
      .then((res) => {
        dispatch(getCate(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getTags = (data) => {
  return {
    type: GET_TAGS,
    payload: data,
  };
};
export const getTagsRequest = (value) => {
  return (dispatch) => {
    return axoisService
      .get(`http://localhost:8080/api/tags?tag=${value}`)
      .then((res) => {
        dispatch(getTags(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
