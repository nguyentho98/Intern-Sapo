import {makeStyles, TextField, withStyles } from '@material-ui/core';
export const useStyles = makeStyles(theme => ({
   root:{
    
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
  jss10:{
    cursor:'pointer'
  },
  jss11:{
    fontSize: '14px',
    fontWeight: '500',
    padding: '3px 12px 13px',
    borderBottom: '1px solid #dfe4e8',
    width: '100%',
  }

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

    },

  }))(TextField);
