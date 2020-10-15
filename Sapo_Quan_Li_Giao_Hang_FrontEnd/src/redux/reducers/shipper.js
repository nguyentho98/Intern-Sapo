import * as types from "../constants/shipper";
const initialState = {
  listShipper: {
    shipperDTOList:[],
  },
  itemShipper:{}
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SHIPPER: {
      return {
        ...state,
      };
    }
    case types.FETCH_SHIPPER_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listShipper: data,
      };
    }
    case types.FETCH_SHIPPER_FAILED: {
      const { error } = action.payload;
      console.log("err", error);
      return {
        ...state,
        listShipper: [],
      };
    } 
    case types.FETCH_SHIPPER_BY_ID: {
      return {
        ...state,
      };
    }
    case types.FETCH_SHIPPER_BY_ID_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        itemShipper: data,
      };
    }
    case types.FETCH_SHIPPER_BY_ID_FAILED: {
      return {
        ...state,
        itemShipper: {},
      };
    }
    case types.ADD_ITEM_SHIPPER:{
      const { data } = action.payload;
      return {
        ...state,
        itemShipper: data
      };
    }
    case types.CLEAR_SHIPPER: {    
      return {
        ...state,listShipper:{shipperDTOList:[]}
      };
    }
    default:
      return {...state};
  }
};
export default reducer;
