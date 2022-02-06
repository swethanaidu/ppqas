import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Logout from "./auth/Logout";
import "../Styles/Header.scss";
import GetInitials from "./shared/GetInitials";
import GetRole from "./shared/GetRole";
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
  render() {
    const { isAuthenticated, user, token } = this.props.auth;

    // console.log(token);
    // const exampleJWT = token;
    // function getPayload(jwt) {
    //   // A JWT has 3 parts separated by '.'
    //   // The middle part is a base64 encoded JSON
    //   // decode the base64
    //   return atob(jwt.split(".")[1]);
    // }
    // const payload = getPayload(exampleJWT);

    // const expiration = new Date(payload.exp);
    // const now = new Date();
    // const fiveMinutes = 1000 * 60 * 5;
    // // // const timeVal = expiration.getTime() - now.getTime();
    // // //console.log(timeVal);
    // // var exp = payload.exp * 1000;
    // // console.log(new Date(exp));

    // if (expiration.getTime() - now.getTime() < fiveMinutes) {
    //   console.log("JWT has expired or will expire soon");
    // } else {
    //   console.log("JWT is valid for more than 5 minutes", payload);
    // }

    // const decodedJwt = JSON.parse(atob(token.split(".")[1]));
    // const timeVar = new Date(decodedJwt.exp * 1000);

    // console.log(timeVar.getTime());
    // console.log(now.getTime());
    // console.log(now.getMinutes() - timeVar.getMinutes());
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
              {user && isAuthenticated ? (
                <GetInitials fn={`${user.firstName}`} ln={`${user.lastName}`} />
              ) : (
                ""
              )}
              <span className="profile-info">
                {user && isAuthenticated
                  ? user.firstName + " " + user.lastName
                  : ""}
                {user && isAuthenticated ? <GetRole rl={`${user.role}`} /> : ""}
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
