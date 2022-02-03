import React, { Component, Fragment } from "react";
import { NavLink, Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";
import { BsExclamationTriangle } from "react-icons/bs";
import { Redirect } from "react-router-dom";
// import { ILogoutProps } from '../../types/interfaces';

export class Logout extends Component {
  state = {
    modal: true,
  };
  static propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  componentDidMount() {
    // if (localStorage.getItem("token") === null) {
    //   window.location.href = "/login";
    // }
  }
  handleLogout = () => {
    const { isAuthenticated, user, token } = this.props.auth;
    this.props.logout();
    if (!isAuthenticated) {
      // <Redirect to="/login" />;
      window.location.href = "/login";
    }
  };
  render() {
    const { isAuthenticated, user, token } = this.props.auth;
    // const currentJWT = token;
    // function getPayload(jwt) {
    //   // A JWT has 3 parts separated by '.'
    //   // The middle part is a base64 encoded JSON
    //   // decode the base64
    //   return atob(jwt.split(".")[1]);
    // }
    // const payload = getPayload(currentJWT);

    // const expiration = new Date(payload.exp);
    // const now = new Date();
    // const fiveMinutes = 1000 * 60 * 5;
    // // // const timeVal = expiration.getTime() - now.getTime();
    // // //console.log(timeVal);
    // // var exp = payload.exp * 1000;
    // console.log(new Date(exp));

    // if (expiration.getTime() - now.getTime() < fiveMinutes) {
    //   console.log("JWT has expired or will expire soon");
    // } else {
    //   console.log("JWT is valid for more than 5 minutes", payload);
    // }
    // console.log(isAuthenticated);
    // if (!this.props.isAuthenticated) {
    //   return <Redirect to="/login" />;
    // }
    return (
      <Fragment>
        {!isAuthenticated && (
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className="warningModal"
          >
            <ModalHeader toggle={this.toggle}>
              <BsExclamationTriangle />
            </ModalHeader>
            <ModalBody>
              <h3>Warning!!!</h3>
              <p>JWT token has expired or will expire soon</p>
              <Button
                className="btn"
                style={{ marginTop: "2rem" }}
                onClick={this.handleLogout}
              >
                Login Again
              </Button>
            </ModalBody>
          </Modal>
        )}
        <NavLink onClick={this.handleLogout} href="#">
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Logout);
