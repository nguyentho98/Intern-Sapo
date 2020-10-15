import { TextField, withStyles } from "@material-ui/core";
/*!

=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { grayColor } from "../../../assets/jss/main";

export const modalStyle = theme => ({
  jss01:{
    paddingBottom:15,
  },
  modalRoot: {
    overflow: "auto",
    alignItems: "unset",
    justifyContent: "unset"
  },
  modal: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: "700px",
      margin: "auto"
    },
    borderRadius: "6px",
    marginTop: "100px !important",
    overflow: "visible",
    maxHeight: "unset",
    position: "relative",
    height: "fit-content",
    width: "700px",
  },
  modalHeader: {
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "0",
    paddingLeft: "24px",
    minHeight: "16.43px",
    borderBottom:'1px solid #dfe4e8'
  },
  modalTitle: {
    margin: "0",
    lineHeight: "1.42857143"
  },
  modalCloseButton: {
    color: grayColor[0],
    marginTop: "-12px",
    WebkitAppearance: "none",
    padding: "0",
    cursor: "pointer",
    background: "0 0",
    border: "0",
    fontSize: "inherit",
    opacity: ".9",
    textShadow: "none",
    fontWeight: "700",
    lineHeight: "1",
    float: "right"
  },
  modalClose: {
    width: "16px",
    height: "16px"
  },
  modalBody: {
    // paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "16px",
    paddingLeft: "24px",
    position: "relative",
    overflow: "visible"
  },
  modalFooter: {
    borderTop:'1px solid #dfe4e8',
    textAlign: "right",
    paddingTop: "0",
    margin: "0"
  },
  instructionNoticeModal: {
    marginBottom: "25px"
  },
  imageNoticeModal: {
    maxWidth: "150px"
  },
  modalSmall: {
    width: "300px"
  },
  modalSmallBody: {
    paddingTop: "0"
  },
  modalSmallFooterFirstButton: {
    margin: "0",
    paddingLeft: "16px",
    paddingRight: "16px",
    width: "auto"
  },
  modalSmallFooterSecondButton: {
    marginBottom: "0",
    marginLeft: "5px"
  },
  create_customer: {
    color: "#fff!important",
    border: "1px solid #08f!important",
    background: "linear-gradient(180deg,#08f,#4697fe)",
    boxShadow: "inset 0 1px 0 0 #1391ff",
    padding: "7px 13px",
    cursor: "pointer",
    fontSize: 13,
    textTransform: 'inherit',
    borderRadius: "5px",
    marginTop: 9,
    float: "right",
  },
  cancel:{
    background: "linear-gradient(180deg,#fff,#f9fafb)",
    color: " #212b35",
    border: "1px solid ",
    borderColor: "rgba(0, 0, 0, 0.23)",
    transitionDuration: ".2s",
    padding: "5px 13px",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: 4,
    marginRight: 5,
    float: "right",
  }
});
export const CusTextField = withStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-input": {
      padding: "13.5px 14px",
    },
    "& .MuiInputLabel-formControl": {
      top: -4,
      left: -4,
    },
    "& .PrivateNotchedOutline-root-142": {
      top: -5,
    },
    "& .MuiFormLabel-root": {
      fontSize: 16,
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, -3px) scale(0.85) !important",
    },
    "& .MuiInputBase-root": {
      fontSize: 16,
      fontWeight: "inherit",
    },
    "& .makeStyles-test-124 .MuiInputBase-input": {
      textAlign: "right",
    },
    "& .MuiOutlinedInput-multiline": {
      padding: 0,
    },
  },
}))(TextField);

export const CusRightTextField = withStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-input": {
      padding: "13.5px 14px",
    },
    "& .MuiInputLabel-formControl": {
      top: -4,
      left: -4,
    },
    "& .PrivateNotchedOutline-root-142": {
      top: -5,
    },
    "& .MuiFormLabel-root": {
      fontSize: 14,
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, -3px) scale(0.85) !important",
    },
    "& .MuiInputBase-root": {
      fontSize: 14,
      fontWeight: "inherit",
    },
    "& .MuiInputBase-input": {
      textAlign: "right",
    },
  },
}))(TextField);
