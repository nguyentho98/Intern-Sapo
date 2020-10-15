import * as types from "../constants/customer";
const initialState = {
  listCustomer: {
    dataListCUS:[]
  },
  itemCreateCustomer:{},
  statusCreateSuccess:false,
  detailCustomer:{},
  limit: 3,
  page: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CUSTOMER: {
      return {
        ...state,
      };
    }
    case types.FETCH_CUSTOMER_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listCustomer: data,
      };
    }
    case types.FETCH_CUSTOMER_FAILED: {
      const { error } = action.payload;
      console.log("err", error);
      return {
        ...state,
        listCustomer: {},
      };
    } 
    case types.ADD_CUSTOMER: {
      return {
        ...state,
      };
    }
    case types.SET_STATUS: {
      return {
        ...state,statusCreateSuccess:false
      };
    }
    case types.ADD_CUSTOMER_SUCCESS: {
      const { data } = action.payload;
      state.listCustomer.dataListCUS.unshift(data);
      return {
        ...state,
        itemCreateCustomer:data,
        statusCreateSuccess:true
      };
    }
    case types.ADD_CUSTOMER_FAILED: {
      // const { error } = action.payload;
      return {
        ...state,
      };
    }
    case types.FETCH_CUSTOMER_BY_ID: {
      return {
        ...state,
      };
    }
    case types.FETCH_CUSTOMER_BY_ID_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        detailCustomer: data,
      };
    }
    case types.FETCH_CUSTOMER_BY_ID_FAILED: {
      return {
        ...state,
        detailCustomer: {},
      };
    }
   
    default:
      return state;
  }
};

export default reducer;
