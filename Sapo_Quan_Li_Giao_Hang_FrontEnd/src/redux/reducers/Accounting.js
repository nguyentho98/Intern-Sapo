const {
  GET_ALL_ACCOUNTING,
  GET_ALL_CUSTOMER,
  GET_TOTAL_DEBT_TO_PAY,
  GET_FULFILLMENT,
  CLEAR_FULFILLMENT,
  ADD_ACCOUNTING,
  GET_ONE_ACCOUNTING,
  UPDATE_ACCOUNTING,
  GET_HISTORY,
} = require('../constants/Calculation');

const initialState = {
  accounting: {},
  customers: [],
  debtToPay: {},
  fulfillment: [],
  item: {},
  itemEdit: {
    accounting: {},
    fulfillment: [],
    customer: {},
  },
  history: [],
};
const calReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ACCOUNTING:
      state.accounting = action.payload;
      return { ...state };
    case GET_ALL_CUSTOMER:
      state.customers = action.payload;
      return { ...state };
    case GET_TOTAL_DEBT_TO_PAY:
      state.debtToPay = action.payload;
      return { ...state };
    case GET_FULFILLMENT:
      state.fulfillment = action.payload;
      return { ...state };
    case CLEAR_FULFILLMENT:
      state.fulfillment = [];
      return { ...state };
    case ADD_ACCOUNTING:
      state.item = action.payload;
      return { ...state };
    case 'CLEAR_ITEM':
      state.item = {};
      return { ...state };
    case GET_ONE_ACCOUNTING:
      state.itemEdit.accounting = action.payload;
      state.itemEdit.fulfillment = action.payload.fulfillment;
      state.itemEdit.customer = action.payload.customer;
      return { ...state };
    case UPDATE_ACCOUNTING:
      state.itemEdit.accounting = action.payload;
      return { ...state };
    case GET_HISTORY:
      state.history = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};
export default calReducer;
