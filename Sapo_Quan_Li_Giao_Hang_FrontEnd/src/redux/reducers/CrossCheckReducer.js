import {
  ADD_CROSSCHECK,
  CLEAR,
  GET_ALL_CROSSCHECK,
  GET_ALL_SHIPPER,
  GET_DEBT,
  GET_FULFILLMENT_OF_SHIPPER,
  GET_FULFILMENT_OF_CROSS,
  GET_HISTORY,
  GET_ONE_CROSS,
  UPDATE_CROSSCHECK,
} from '../constants/CrossCheck';

const initialState = {
  crossChecks: {},
  shippers: {},
  debt: 0,
  fulfillment: {},
  itemEdit: {},
  history: [],
};
const crossCheckReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CROSSCHECK:
      state.crossChecks = action.payload;
      return { ...state };
    case GET_ALL_SHIPPER:
      state.shippers = action.payload;
      return { ...state };
    case GET_DEBT:
      state.debt = action.payload;
      return { ...state };
    case GET_FULFILLMENT_OF_SHIPPER:
      state.fulfillment = action.payload;
      return { ...state };
    case CLEAR:
      state.fulfillment = {};
      return { ...state };
    case 'CLEAR_ITEM_EDIT':
      state.itemEdit = {};
      return { ...state };
    case GET_ONE_CROSS:
      state.itemEdit = action.payload;
      return { ...state };
    case ADD_CROSSCHECK:
      state.itemEdit = action.payload;
      return { ...state };
    case UPDATE_CROSSCHECK:
      state.itemEdit = action.payload;
      return { ...state };
    case GET_FULFILMENT_OF_CROSS:
      state.fulfillment = action.payload;
      return { ...state };
    case GET_HISTORY:
      state.history = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};
export default crossCheckReducer;
