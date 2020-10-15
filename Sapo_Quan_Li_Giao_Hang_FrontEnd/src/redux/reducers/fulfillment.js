import * as types from "../constants/fulfillment";
const initialState = {
  fulfillments: {
    fulfillmentDTOS: [],
  },
  detailFulfillment:{},
  limit: 2,
  page: 0,
  total: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_FULFILLMENT: {
      return {
        ...state,
      };
    }
    case types.FETCH_FULFILLMENT_SUCCESS: {
      const data = action.payload.data;
      return {  
        ...state,
        fulfillments: data,
      };
    }
    case types.FETCH_FULFILLMENT_FAILED: {
      const { error } = action.payload;
      console.log("err", error);
      return {
        ...state,
        listFulfillment: [],
      };
    }
    case types.FETCH_FULFILLMENT_BY_ID: {
      return {
        ...state,
      };
    }
    case types.FETCH_FULFILLMENT_BY_ID_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        detailFulfillment: data,
      };
    }
    case types.FETCH_FULFILLMENT_BY_ID_FAILED: {
      return {
        ...state,
        detailFulfillment: {},
      };
    }
    case types.ADD_FULFILLMENT: {
      return {
        ...state,
      };
    }
    case types.ADD_FULFILLMENT_SUCCESS: {
      const { data } = action.payload;
      state.listFulfillment.unshift(data);
      state.listFulfillment.pop();
      return {
        ...state,
      };
    }
    case types.ADD_FULFILLMENT_FAILED: {
      // const { error } = action.payload;
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default reducer;
