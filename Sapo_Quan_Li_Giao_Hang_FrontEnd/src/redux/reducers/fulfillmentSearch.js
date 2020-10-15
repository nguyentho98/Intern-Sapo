import * as types from "../constants/fulfillmentSearch";
const initialState = {
  status: -1,
  customer: "",
  shipper: "",
  fromDate: null,
  toDate: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_STATUS:
      state.status = action.payload;
      return { ...state };
    case types.SET_CUSTOMER:
      state.customer = action.payload;
      return { ...state };
    case types.SET_SHIPPER:
      state.shipper = action.payload;
      return { ...state };
    case types.SET_FROMDATE:
      state.fromDate = action.payload;
      return { ...state };
    case types.SET_TODATE:
      state.toDate = action.payload;
      return { ...state };
    case types.CLEAR_FILTER:
      state = {
        status: -1,
        customer: "",
        shipper: "",
        fromDate: null,
        toDate: null,
      };
      return { ...state };
    default:
      return { ...state };
  }
};
export default reducer;
