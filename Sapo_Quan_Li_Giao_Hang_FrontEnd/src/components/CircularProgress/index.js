import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function CircularUnderLoad() {
  return <CircularProgress disableShrink  style={{width:25,height:25,color:'white',marginRight:5}}/>;
}