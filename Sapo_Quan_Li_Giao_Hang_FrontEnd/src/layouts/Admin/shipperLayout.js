/* eslint-disable no-unused-vars */
import withStyles from '@material-ui/core/styles/withStyles';
import cx from 'classnames';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProductAdd from '../../containers/Products/Create/index';
import { actMiniActive } from '../../redux/actions/ui';
import routes from '../../utils/routes';
import Sidebar from './../../components/Sidebar/Sidebar';
import appStyle from './styles.js';
import AccountingUpdate from '../../containers/Acounting/AccountingUpdate/AccountingUpdate';
import CrossUpdate from '../../containers/CrossCheck/CrossCheckUpdate/CrossUpdate';
import Shipper from '../../containers/Shipper';
import shipperRoutes from '../../utils/shipperRoutes';
import FulfillmentDetail from '../../containers/Shipper/FulfillmentDetail';
import { getRole } from '../../utils/userRole';
import history from '../../utils/history';
var ab;
const ShipperBoard = (props) => {
  const [state, setState] = useState({
    mobileOpen: false,
    miniActive: false,
    image: require('./../../assets/image/sidebar-2.jpg'),
    color: 'blue',
    bgColor: 'black',
    hasImage: true,
    fixedClasses: 'dropdown',
    logo: require('./../../assets/image/sapo-pos-w.png'),
  });

  
  useEffect(() => {
    if (getRole() !== "ROLE_SHIPPER") {
      if (getRole() === "ROLE_ADMIN") {
        history.push("/admin")
      }
    }
  },[])


  const mainPanel = React.createRef();

  const handleDrawerToggle = () => {
    setState({ ...state, mobileOpen: !state.mobileOpen });
  };

  const getActiveRoute = (routes) => {
    let activeRoute = 'Default Brand Text';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === '/shipper') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const { miniActive, actMiniActive, classes, ...rest } = props;
  const mainPanel1 =
    classes.mainPanel +
    ' ' +
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf('Win') > -1,
    });

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={shipperRoutes}
        logo={state.logo}
        image={state.image}
        handleDrawerToggle={handleDrawerToggle}
        open={state.mobileOpen}
        color={state.color}
        bgColor={state.bgColor}
        sidebarMinimize={actMiniActive}
        miniActive={miniActive}
        {...rest}
      />
      <div className={mainPanel1} ref={mainPanel}>
        <div className={classes.content}>
          <div className={classes.container}>
            <Switch>
              <Route
                path={'/shipper/shipper'}
                component={Shipper}
                key={11}
              />
              <Route
                path={'/shipper/order-detail/:id'}
                component={FulfillmentDetail}
                key={11}
              />
              <Redirect from='/shipper' to='/shipper/shipper' />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    miniActive: state.ui.miniActive,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actMiniActive: () => {
      dispatch(actMiniActive());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(appStyle)(ShipperBoard));
