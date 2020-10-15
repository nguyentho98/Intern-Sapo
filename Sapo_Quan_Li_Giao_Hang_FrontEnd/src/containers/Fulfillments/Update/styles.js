import {makeStyles, TextField, withStyles } from '@material-ui/core';
export const useStyles = makeStyles(theme => ({
   root:{
    marginTop: '2rem !important',
   },
   title: {
    fontWeight: 500,
    float: "left",
  },
  cardContent: {
    padding: 30,
    paddingTop: 0,
  },
  jss3:{
    cursor:'pointer'
  },
  jss2:{
    marginBottom:20,
  },
  jss1:{
    width: 'calc(100% + 60px)',
    marginLeft: '-30px',
    marginRight: '-30px',
    paddingTop:20,
    paddingLeft: 30,
    paddingRight: 30,
    borderTop: '1px solid #c4cdd5',
  },
  jss4:{
    maxWidth: '300px',
    width: '16%',
    marginBottom: '10px',
  },
  jss5:{
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  jss6:{
    paddingTop:50,
    paddingBottom:40,
    textAlign:'center'
  },
  jss7:{
    paddingTop:20,
    paddingLeft:20,
    paddingRight:20,
  },
  jss8:{
    margin:'10px 0'
  },
  save: {
    color: "#fff!important",
    border: "1px solid #08f!important",
    background: "linear-gradient(180deg,#08f,#4697fe)",
    boxShadow: "inset 0 1px 0 0 #1391ff",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: 10,
    marginBottom: 10,
    textTransform: 'inherit',
    float: "right",
  },
  cancle: {
    background: "linear-gradient(180deg,#fff,#f9fafb)",
    color: " #212b35",
    border: "1px solid ",
    borderColor: "rgba(0, 0, 0, 0.23)",
    transitionDuration: ".2s",
    padding: "5px 10px",
    cursor: "pointer",
    textTransform: 'inherit',
    borderRadius: "5px",
    marginBottom: 10,
    marginTop: 10,
    marginRight: 8,
    float: "right",
  },
  jss11:{
    float:'right',
    width:'100%'
  },
 
  spanDetailFulfillment: {
    // float: 'right',
    fontSize: 16,
    fontWeight: 350,
    marginLeft: 10
  },


}));
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
      "& .MuiOutlinedInput-multiline":{
        padding:0
      }
    //   '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':{
    //     border:0,
    //   },
    //   '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-chedOutline':{
    //     border:0,
    //   },
    //   '& .MuiOutlinedInput-notchedOutline':{
    //     border:0,
    //   }
    },
    // notchedOutline:{
    //     border:0,
    //   }
  }))(TextField);
