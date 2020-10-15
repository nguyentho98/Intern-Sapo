import * as types from "../constants/statistic";
const initialState = {
  statistic: {},
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_STATISTIC: {
      return {
        ...state,
      };
    }
    case types.FETCH_STATISTIC_SUCCESS: {
      const {data} = action.payload;
      return {
        ...state,
        statistic: data,
      };
    }
    case types.FETCH_STATISTIC_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        error:error,
        statistic: [],
      };
    } 
    default:
      return {...state};
  }
};
export default reducer;
