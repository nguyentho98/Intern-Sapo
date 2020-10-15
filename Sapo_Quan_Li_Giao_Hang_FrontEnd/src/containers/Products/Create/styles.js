import { makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
export const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    fontWeight: 600,
    float: 'left',
  },
  product_title: {
    fontWeight: 500,
    width: '50%',
  },
  cardContent: {
    padding: 30,
    paddingTop: 0,
  },
  editor: {
    marginTop: 20,
  },
  upload: {
    margin: 0,
  },
  test: {
    textAlign: 'right',
  },
  description: {
    color: '#007bff !important',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline !important',
    },
  },
  add_product: {
    color: '#fff!important',
    border: '1px solid #08f!important',
    background: 'linear-gradient(180deg,#08f,#4697fe)',
    boxShadow: 'inset 0 1px 0 0 #1391ff',
    padding: '7px 13px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: 20,
    float: 'right',
  },
  add_cancle: {
    background: 'linear-gradient(180deg,#fff,#f9fafb)',
    color: ' #212b35',
    border: '1px solid ',
    borderColor: 'rgba(0, 0, 0, 0.23)',
    transitionDuration: '.2s',
    padding: '7px 13px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: 20,
    marginRight: 5,
    float: 'right',
  },
  height: {
    minHeight: 300,
  },
}));

export const CusTextField = withStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-input': {
      padding: '13.5px 14px',
    },
    '& .MuiInputLabel-formControl': {
      top: -4,
      left: -4,
    },
    '& .PrivateNotchedOutline-root-142': {
      top: -5,
    },
    '& .MuiFormLabel-root': {
      fontSize: 14,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.85) !important',
    },
    '& .MuiInputBase-root': {
      fontSize: 14,
      fontWeight: 'inherit',
    },
    '& .makeStyles-test-124 .MuiInputBase-input': {
      textAlign: 'right',
    },
  },
}))(TextField);

export const CusRightTextField = withStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-input': {
      padding: '13.5px 14px',
    },
    '& .MuiInputLabel-formControl': {
      top: -4,
      left: -4,
    },
    '& .PrivateNotchedOutline-root-142': {
      top: -5,
    },
    '& .MuiFormLabel-root': {
      fontSize: 14,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.85) !important',
    },
    '& .MuiInputBase-root': {
      fontSize: 14,
      fontWeight: 'inherit',
    },
    '& .MuiInputBase-input': {
      textAlign: 'right',
    },
  },
}))(TextField);
