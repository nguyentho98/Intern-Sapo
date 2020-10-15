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

let initialState = {
  status: -1,
  category: '',
  brand: '',
  fromDate: null,
  toDate: null,
  tags: [],
  classify: -1,
};
const filterProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      state.category = action.payload;
      return { ...state };
    case SET_STATUS:
      state.status = action.payload;
      return { ...state };
    case SET_BRAND:
      state.brand = action.payload;
      return { ...state };
    case SET_FROMDATE:
      state.fromDate = action.payload;
      return { ...state };
    case SET_TODATE:
      state.toDate = action.payload;
      return { ...state };
    case SET_CLASSIFY:
      state.classify = action.payload;
      return { ...state };
    case SET_TAG:
      state.tags = action.payload;
      return { ...state };
    case CLEAR_FILTER:
      state = {
        status: -1,
        category: '',
        brand: '',
        fromDate: null,
        toDate: null,
        tag: [],
        classify: -1,
      };
      return { ...state };
    default:
      return { ...state };
  }
};
export default filterProductReducer;
