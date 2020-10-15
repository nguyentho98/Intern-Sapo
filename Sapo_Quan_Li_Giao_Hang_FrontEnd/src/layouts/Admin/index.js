import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Content from './content';
import coorLayout from './coorLayout';
import shipperLayout from './shipperLayout';
const Admin = (props) => {
  console.log(props.role);
  return (
    <div>
      <Switch>
        <Route path='/admin' component={Content} />
        <Route path='/shipper' component={shipperLayout} />
      </Switch>
    </div>
  );
};
export default Admin;
