import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Logout from "./auth/Logout";
import "../Styles/Header.scss";

class Header extends Component {
  static proprTypes = {
    auth: PropTypes.object.isRequired,
  };
  constructor() {
    super();
    this.state = {
      initials: "",
    };
  }
  componentDidMount() {}

  render() {
    const { isAuthenticated, user, initials } = this.props.auth;
    let fn, role;
    if (user && isAuthenticated) {
      fn = `${user.firstName.charAt(0)}` + `${user.lastName.charAt(0)}`;
      switch (user.role) {
        case "PO":
          role = "Placement Officer";
          break;
        case "FC":
          role = "Faculty";
          break;
        case "SR":
          role = "Senior";
          break;
        case "JR":
          role = "Junior";
          break;
      }
    }

    return (
      <div className="qa-header">
        <div className="container-fluid">
          <div className="btn-group d-flex align-center">
            <button
              type="button"
              className="btn btn-custom dropdown-toggle"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
            >
              <span className="user-avatar mr-3">{fn}</span>
              <span className="profile-info">
                {user && isAuthenticated
                  ? user.firstName + " " + user.lastName
                  : ""}
                <span className="sub-title">{role}</span>
              </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-lg-end">
              <li>
                <button className="dropdown-item" type="button">
                  Update Profile
                </button>
              </li>
              <li>
                <button className="dropdown-item" type="button">
                  Change Password
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Logout />
                {/* <button
                  className="dropdown-item"
                  type="button"
                  onClick={this.logout}
                >
                  Logout
                </button> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Header);
