import * as types from "../constants/address";
const initialState = {
  listShippingFrom: {
    addressDTOList:[],
  },
  listShippingTo: {
    addressDTOList:[],
  },
  itemCreateShippingTo:null,
  itemCreateShippingFrom:{},
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_RECEIPT: {
      return {
        ...state,
      };
    }
    case types.FETCH_RECEIPT_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listShippingFrom: data,
      };
    }
    case types.FETCH_RECEIPT_FAILED: {
      const { error } = action.payload;
      console.log("err", error);
      return {
        ...state,
        listShippingFrom: [],
      };
    }
    case types.FETCH_SHIPPING: {
      return {
        ...state,
      };
    }
    case types.FETCH_SHIPPING_SUCCESS: {
      const { data } = action.payload;
    
      return {
        ...state,
        listShippingTo: data,
      };
    }
    case types.FETCH_SHIPPING_FAILED: {
      const { error } = action.payload;
      console.log("err", error);
      return {
        ...state,
        listShippingTo: [],
      };
    }
    // case types.ADD_RECEIPT: {
    //   return {
    //     ...state,
    //   };
    // }
    case types.ADD_RECEIPT_SUCCESS: {
      const { data } = action.payload;
    
      state.listShippingFrom.addressDTOList.unshift(data);
      return {
        ...state,itemCreateShippingFrom:data
      };
    }
    case types.ADD_RECEIPT_FAILED: {
      // const { error } = action.payload;
      return {
        ...state,
      };
    }
    case types.ADD_SHIPPING: {
      return {
        ...state,
      };
    }
    case types.ADD_SHIPPING_SUCCESS: {
      const { data } = action.payload;
      state.listShippingTo.addressDTOList.unshift(data);
      return {
        ...state,itemCreateShippingTo:data
      };
    }
    case types.ADD_SHIPPING_FAILED: {
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
