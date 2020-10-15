import * as types from "../constants/auth";

const initialState = {
  loggedIn: false,
  user: {},
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN: {
      return {
        ...state,
      };
    }
    case types.LOGIN_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        loggedIn: true,
        user: data,
      };
    }
    case types.LOGIN_FAILED: {
      const { error } = action.payload;
      return {
        ...state,
        error: error,
      };
    }
    default:
      return state;
  }
};

export default reducer;
