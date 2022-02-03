import React, { Component } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

const constants = require("../../constants");
const API_URL = constants.API_URL;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      msg: null,
      successMsg: null,
    };
  }

  static proprTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.message });
        this.setState({ successMsg: null });
        //console.log(error.msg);
      } else {
        this.setState({ successMsg: "loggedIn" });
        this.setState({ msg: null });
      }
    }
  }

  handleChange = (event, field) => {
    this.setState({
      [field]: event.target.value,
      loginError: undefined,
    });
    //console.log(field);
    if (field === "role") {
      let currentRole = event.target.value;
      //console.log(this.state.showPO);
      currentRole === "SR"
        ? this.setState({ showSR: true })
        : this.setState({ showSR: false });
    }
  };
  handleLogin = () => {
    const { email, password, isAuthenticated } = this.state;
    const user = {
      email,
      password,
    };
    //Attempt to login

    this.props.login(user);
    this.resetSignUpForm();
    //If authenticated
    // if (isAuthenticated) {
    //   this.resetSignUpForm();
    // }
  };
  resetSignUpForm = () => {
    this.setState({
      isSignUpModalOpen: false,
      password: "",
      email: "",
      signUpError: undefined,
    });
    this.props.clearErrors();
    // window.location.href = "/dashboard";
  };

  render() {
    const { password, email, msg, isAuthenticated, successMsg } = this.state;
    // console.log(successMsg);
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <React.Fragment>
        <div className="page">
          <div className="container">
            <div className="row">
              <div className="col-xl-5 col-lg-6 col-md-8 col-sm-8 col-xs-10 card-sigin-main py-4 justify-content-center mx-auto">
                <div className="card-login">
                  <div className="card-login-container d-md-flex">
                    <div className="w-100 p-3">
                      <div className="d-flex mb-4 logo">
                        Pre-Placement Q&amp;A System{" "}
                      </div>
                      <div className="">
                        <div className="main-signup-header">
                          <h2 className="text-dark">Welcome back!</h2>
                          <h6 className="font-weight-normal mb-4">
                            Please sign in to continue.
                          </h6>
                          <form className="">
                            {msg ? (
                              <div className="alert alert-danger">{msg}</div>
                            ) : null}
                            {successMsg === "loggedIn" ? (
                              <div className="alert alert-success">
                                Logged In Successfully!!
                                {/* <Redirect to="/dashboard" /> */}
                              </div>
                            ) : null}

                            <div className="mb-3">
                              <label className="form-label">Email</label>
                              <input
                                type="text"
                                value={email}
                                className="form-control"
                                onChange={(event) =>
                                  this.handleChange(event, "email")
                                }
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Password</label>
                              <input
                                type="password"
                                value={password}
                                className="form-control"
                                onChange={(event) =>
                                  this.handleChange(event, "password")
                                }
                              />
                            </div>
                            <input
                              type="button"
                              className="btn btn-primary w-100 p-3"
                              onClick={this.handleLogin}
                              value="Login"
                            />
                          </form>
                          <div className="main-signup-footer mt-3 text-center">
                            <p>
                              <Link to="/signup">Forgot password?</Link>
                            </p>
                            <p>
                              Don't have an account?{" "}
                              <Link to="/signup">Sign Up</Link>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  // question: state.question,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
