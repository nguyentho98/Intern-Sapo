import { makeStyles } from "@material-ui/core";
import anh2 from "../../assets/image/login-background.png";
import anh1 from "../../assets/image/sapo.png";
const useStyles = makeStyles((theme) => ({
  root: {
    height: " 100vh",
    backgroundSize: "contain !important",
    backgroundColor: "#f4f6f8 !important",
    [theme.breakpoints.up("md")]: {
      background: "url(" + anh2 + ") no-repeat top",
    },
  },
  container: {},
  loginWarpper: {
    marginTop: "calc((100vh - 588px)/2)",
    marginLeft: "auto",
    marginRight: "auto",
  },
  divlogo: {
    textAlign: "center",
    paddingTop: 20,
  },
  logo: {
    width: "150px",
  },
  areaLogin: {
    maxHeight: "588px",
    height: " 588px",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      background: "url(" + anh1 + ") no-repeat top",
    },
  },
  formLogin: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: 65,
    },
  },
  btn_login: {
    marginTop: 20,
    background: "linear-gradient(180deg,#4697fe,#08f)",
    borderColor: " #08f",
    boxShadow: "inset 0 1px 0 0 #549cf9",
    color: "#fff",
    borderRadius: "5px",
    fontSize: "14px",
    fontWeight: "bold",
    border: "none",
    height: "45px",
    lineHeight: "40px",
    zIndex: 999,
    padding: "0 93px",
    textTransform: "inherit",
    "&:hover": {
      background: "linear-gradient(180deg,#4697fe,#08f)",
      borderColor: " #08f",
      // boxShadow: 'inset 0 1px 0 0 #549cf9',
    },
  },
  div_action_login: {
    textAlign: "center",
  },
  tit: {
    display: "block",
    position: "relative",
    textAlign: "center",
    width: " 100%",
    marginTop: 20,
    float: "left",
    "&::before": {
      content: '""',
      width: "97%",
      padding: "1px 0px 0px",
      background: " #ebebeb",
      color: "#ebebeb",
      position: "absolute",
      left: "10px",
      top: " 15px",
      lineHeight: "32px",
      zIndex: 1,
    },
  },
  tit_item: {
    fontSize: "14px",
    lineHeight: "32px",
    padding: " 0px 15px",
    backgroundColor: "#fff",
    display: "inline-block",
    background: " #fff",
    color: "#898989",
    zIndex: "12",
    position: "relative",
  },
  loginmore: {
    cursor: "pointer",
    paddingLeft: 5,
    display: "inline-block !important",
    height: " 35px !important",
    margin: "0 auto !important",
  },
}));
export default useStyles;
