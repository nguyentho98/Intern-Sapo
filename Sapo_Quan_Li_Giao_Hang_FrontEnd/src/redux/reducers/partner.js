import * as types from "../constants/partner";
const initialState = {
  listIdState: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PARTNER: {
      return {
        ...state,
      };
    }
    case types.FETCH_PARTNER_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listCustomer: data,
      };
    }
    case types.FETCH_PARTNER_FAILED: {
      const { error } = action.payload;
      console.log("err", error);
      return {
        ...state,
        listCustomer: [],
      };
    } 
    case types.ADD_PARTNER: {
      return {
        ...state,
      };
    }
    case types.ADD_PARTNER_SUCCESS: {
      const { data } = action.payload;
      state.listCustomer.unshift(data);
      state.listCustomer.pop();
      return {
        ...state,itemCreateCustomer:data
      };
    }
    case types.ADD_PARTNER_FAILED: {
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
