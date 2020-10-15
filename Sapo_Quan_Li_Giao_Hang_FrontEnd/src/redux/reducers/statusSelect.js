const initialState = {
    sttProvince: false,
    sttDistrict: true,
    sttWard: false,
  };
const statusSelectReducer = (state=initialState,action)=>{
    switch (action.type){
        case 'SET_STT_PROVINCE':
      state.sttProvince = action.data;
      return { ...state };
    case 'SET_STT_DISTRICT':
      state.sttDistrict = action.data;
      return { ...state };
    case 'SET_STT_WARD':
      state.sttWard = action.data;
      return { ...state };
    default:
      return { ...state };
  }
};
export default statusSelectReducer;