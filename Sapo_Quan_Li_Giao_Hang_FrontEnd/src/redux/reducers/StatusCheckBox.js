const initialState = {
  sttCheckBox: false,
  stateAdd: {
    createSuccess: false,
    faildSave: false,
    afterCreate: false,
    btnHeader: false,
  },
};
const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STT_CHECKBOX':
      state.sttCheckBox = action.data;
      return { ...state };
    case 'SET_STT_CREATED':
      state.stateAdd.createSuccess = action.data;
      return { ...state };
    case 'SET_STT_FAILSAVE':
      state.stateAdd.faildSave = action.data;
      return { ...state };
    case 'SET_STT_AFTERCREATE':
      state.stateAdd.afterCreate = action.data;
      return { ...state };
    case 'SET_BTN_HEADER':
      state.stateAdd.btnHeader = action.data;
      return { ...state };
    default:
      return { ...state };
  }
};
export default statusReducer;
