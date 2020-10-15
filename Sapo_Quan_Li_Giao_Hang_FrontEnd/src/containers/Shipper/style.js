
const { makeStyles, withStyles, TextField, BottomNavigation } = require("@material-ui/core");

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: '67vh',
    minHeight: '65vh',
    overflow: 'scroll',
  },
  formControl: {
    minWidth: '40%',
    marginLeft: '1%',
    marginTop: '1%'
  },
  navBtn: {
    width: "100%",
    justifyContent: "start",
    borderTopRightRadius: "5px",
    borderTopLeftRadius: "5px",
  },
  checkbox: {
    WebkitTransform: "scale(1.5)",
    transform: "scale(1.5)",
    borderRadius: "2px",
  },
  title: {
    fontWeight: 500,
    float: "left",
  },
  jss1: {
    frontSize: 16,
  },
  create: {
    color: "#fff!important",
    border: "1px solid #08f!important",
    background: "linear-gradient(180deg,#08f,#4697fe)",
    boxShadow: "inset 0 1px 0 0 #1391ff",
    padding: "6px 13px",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: 23,
    textTransform: "inherit",
    float: "right",
  },
  jss2: {
    marginBottom: 20,
    "&::after": {
      clear: "both",
    },
  },
  jss3: {
    marginTop: 10,
    marginBottom: 10,
    width: '90%',
    margin: '0 auto'
  },
  iconButton: {
    paddingRight: 0
  },
  jss4: {
    paddingTop: 40,
    paddingBottom: 40,
  }
}));
export const CusTextField = withStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-input": {
      padding: "11px 14px",
      paddingLeft: 0,
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
      padding: 0
    },
    "& .MuiOutlinedInput-adornedStart": {
      padding: 0,
    },
    width: '90%', 
    marginTop: 10,
  },

}))(TextField);


export const CusBottomNavigation = withStyles((theme) => ({
  root: {
    "& .MuiBottomNavigationAction-root.Mui-selected": {
      borderBottom: "2px solid",
    },
  },
}))(BottomNavigation);
