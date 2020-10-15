import {
  CLEAR_PRODUCT,
  GET_ALL_PRODUCT,
  GET_BRAND,
  GET_CATE,
  GET_ONE_PRODUCT,
  GET_TAGS,
} from '../constants/ProductConstant';

const initialState = {
  products: {},
  productItem: {},
  brand: {},
  cate: {},
  tag: [],
  searchProduct: [], //Tho
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCT:
      state.products = action.payload;
      state.searchProduct = action.payload.products;
      return { ...state };
    case 'CLEAR_LIST':
      state.products = {};
      return { ...state };
    case GET_ONE_PRODUCT:
      state.productItem = action.payload;
      state.searchProduct.unshift(action.payload);
      return { ...state };
    case CLEAR_PRODUCT:
      state.productItem = {};
      return { ...state };
    case GET_BRAND:
      state.brand = action.payload;
      return { ...state };
    case GET_CATE:
      state.cate = action.payload;
      return { ...state };
    case GET_TAGS:
      state.tag = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};

export default productReducer;
