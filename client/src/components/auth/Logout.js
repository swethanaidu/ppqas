import React, { Component, Fragment } from "react";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";

// import { ILogoutProps } from '../../types/interfaces';

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };
  componentDidMount() {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/login";
    }
  }
  handleLogout = () => {
    this.props.logout();
    if (localStorage.getItem("token") === null) {
      window.location.href = "/login";
    }
  };
  render() {
    return (
      <Fragment>
        <NavLink onClick={this.handleLogout} href="#">
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

export default connect(null, { logout })(Logout);
