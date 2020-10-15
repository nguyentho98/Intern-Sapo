import * as types from "../constants/ui";
const initialState = {
    miniActive:false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MINI_ACTIVE: {
      return {
        ...state,miniActive:!state.miniActive
      };
    }
    default:
      return state;
  }
};

export default reducer;
