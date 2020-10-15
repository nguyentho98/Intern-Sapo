export const setSttCheckBox = (data) => {
  return {
    type: 'SET_STT_CHECKBOX',
    data,
  };
};
export const setSttCreateSuccess = (data) => {
  return {
    type: 'SET_STT_CREATED',
    data,
  };
};
export const setSttFailSave = (data) => {
  return {
    type: 'SET_STT_FAILSAVE',
    data,
  };
};
export const setSttAfterCreate = (data) => {
  return {
    type: 'SET_STT_AFTERCREATE',
    data,
  };
};
export const setBtnHeader = (data) => {
  return {
    type: 'SET_BTN_HEADER',
    data,
  };
};
