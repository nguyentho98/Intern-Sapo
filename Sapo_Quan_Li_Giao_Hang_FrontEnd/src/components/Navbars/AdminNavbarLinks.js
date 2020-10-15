
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import adminNavbarLinksStyle from "./adminNavbarLinksStyle.js";

class HeaderLinks extends React.Component {
  state = {
    openNotification: false,
    openProfile: false
  };
  handleClickNotification = () => {
    this.setState({ openNotification: !this.state.openNotification });
  };
  handleCloseNotification = () => {
    this.setState({ openNotification: false });
  };
  handleClickProfile = () => {
    this.setState({ openProfile: !this.state.openProfile });
  };
  handleCloseProfile = () => {
    this.setState({ openProfile: false });
  };
  render() {
    const { classes, rtlActive } = this.props;
    const wrapper = classNames({
      [classes.wrapperRTL]: rtlActive
    });
  
    return (
      <div className={wrapper}>
       
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool
};

export default withStyles(adminNavbarLinksStyle)(HeaderLinks);
