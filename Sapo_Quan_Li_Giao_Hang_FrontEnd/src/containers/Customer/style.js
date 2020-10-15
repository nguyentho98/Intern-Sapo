
// var defaultLabelDisplayedRows = function defaultLabelDisplayedRows(_ref) {
//     var from = _ref.from,
//         to = _ref.to,
//         count = _ref.count;
//     return "".concat(from, "-").concat(to, " tổng ").concat(count !== -1 ? count : "more than ".concat(to));
//   };

// export default defaultLabelDisplayedRows;

import buttonGroupStyle from "../../assets/jss/buttonGroupStyle.js";
import customCheckboxRadioSwitch from "../../assets/jss/customCheckboxRadioSwitch.js";
import {
  cardTitle,
  grayColor
} from "../../assets/jss/main";

import {makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  ...customCheckboxRadioSwitch,
  ...buttonGroupStyle,
  right: {
    textAlign: "right"
  },
  center: {
    textAlign: "center"
  },
  description: {
    maxWidth: "150px"
  },
  actionButton: {
    margin: "0 0 0 5px",
    padding: "5px",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      marginRight: "0px"
    }
  },
  icon: {
    verticalAlign: "middle",
    width: "17px",
    height: "17px",
    top: "-1px",
    position: "relative"
  },
  imgContainer: {
    width: "120px",
    maxHeight: "160px",
    overflow: "hidden",
    display: "block"
  },
  img: {
    width: "100%",
    height: "auto",
    verticalAlign: "middle",
    border: "0"
  },
  tdName: {
    minWidth: "200px",
    fontWeight: "400",
    fontSize: "1.5em"
  },
  tdNameAnchor: {
    color: grayColor[2]
  },
  tdNameSmall: {
    color: grayColor[0],
    fontSize: "0.75em",
    fontWeight: "300"
  },
  tdNumber: {
    textAlign: "right",
    minWidth: "145px",
    fontWeight: "300",
    fontSize: "1.3em !important"
  },
  tdNumberSmall: {
    marginRight: "3px"
  },
  tdNumberAndButtonGroup: {
    lineHeight: "1 !important"
  },
  positionAbsolute: {
    position: "absolute",
    right: "0",
    left:"5px",
    top: "9px"
   
  },
  customFont: {
    fontSize: "16px !important"
  },
  actionButtonRound: {
    width: "auto",
    height: "auto",
    minWidth: "auto"
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  },
  add_product:{
    background: 'linear-gradient(180deg,#4697fe,#08f)',
    borderColor:' #08f',
    boxShadow: 'inset 0 1px 0 0 #549cf9',
    color: '#fff',
    borderRadius: '5px',
    fontSize: '14px',
    border: 'none',
    height: 40,
    padding: '0 24px',
    marginBottom:20,
    float:'right',
    lineHeight: '40px',
    zIndex: 999,      
    textTransform: 'inherit',
    '&:hover':{
        background: 'linear-gradient(180deg,#4697fe,#08f)',
        borderColor:' #08f',
    }
  },
  pagination:{
    float:'right',
  },
  nameProduct:{
    "&:hover": {
      textDecoration: "underline !important",
    },
  }
}));
export default useStyles;
