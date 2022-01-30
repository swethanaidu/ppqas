import React, { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

const constants = require("../constants");
const API_URL = constants.API_URL;

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      user: "",
      isLoggedIn: false,
      loginError: undefined,
    };
  }

  componentDidMount() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    let user = localStorage.getItem("user");
    // console.log(user);
    if (user) {
        user = JSON.parse(user);
    }
    this.setState({
        user: user,
        isLoggedIn: isLoggedIn
    });
  }
  handleChange = (event, field) => {
    this.setState({
      [field]: event.target.value,
      loginError: undefined,
    });
  };
  handleLogin = () => {
    // call the API to login the user
    const { email, password } = this.state;
    const obj = {
      email: email,
      password: password,
    };
    axios({
      method: "POST",
      url: `${API_URL}/userLogin`,
      header: { "Content-Type": "application/json" },
      data: obj,
    })
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.data.user));
        localStorage.setItem("isLoggedIn", true);
        // console.log(result.data);
        this.setState({
          user: result.data.user,
          isLoggedIn: true,
          loginError: undefined,
        });
        this.resetLoginForm();
      })
      .catch((error) => {
        this.setState({
          loginError: "Username or password is wrong !!",
        });
        console.log(error);
      });
  };
  resetLoginForm = () => {
    this.setState({
      email: "",
      password: "",
      loginError: undefined,
    });
    window.location.href = "/dashboard";
  };
  logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    this.setState({
        user: undefined,
        isLoggedIn: false
    });
}
  render() {
    const { password, email, loginError } = this.state;
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
                            {loginError ? (
                              <div className="alert alert-danger">
                                {loginError}
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
                          <p><Link to="/signup">Forgot password?</Link></p>
                            <p>
                            Don't have an account? {" "}
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
