import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const constants = require("../constants");
const API_URL = constants.API_URL;

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      // lastName: '',
      // user: undefined,
      isLoggedIn: false,
      loginError: undefined,
      signUpError: undefined,
      signUpSuccess: undefined,
    };
  }

  componentDidMount() {
   
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    let user = localStorage.getItem("user");
    if (user) {
        user = JSON.parse(user);
    }
    this.setState({
        user: user,
        isLoggedIn: isLoggedIn
    });
    // localStorage.removeItem("user");
    // localStorage.removeItem("isLoggedIn");
    // this.setState({
    //     user: undefined,
    //     isLoggedIn: false
    // });
  }
  handleChange = (event, field) => {
    this.setState({
      [field]: event.target.value,
      loginError: undefined,
    });
  };
  handleSignUp = () => {
    const { email, password, name } = this.state;
    const obj = {
      email: email,
      password: password,
      name: name,
    };
    axios({
      method: "POST",
      url: `${API_URL}/signup`,
      header: { "Content-Type": "application/json" },
      data: obj,
    })
      .then((result) => {
        debugger;
        localStorage.setItem("email", JSON.stringify(result.data.email));
        localStorage.setItem("isLoggedIn", true);
        this.setState({
          email: result.data.email,
          isLoggedIn: true,
          loginError: undefined,
          signUpError: undefined,
          signUpSuccess: result.data.message
        });
        this.resetSignUpForm();
      })
      .catch((error) => {
        this.setState({
          signUpError: "Error in SignUp",
        });
        console.log(error);
      });
  };
  resetSignUpForm = () => {
    this.setState({
      isSignUpModalOpen: false,
      name: "",
      password: "",
      email: "",
      signUpError: undefined,
    });
    // window.location.href = "/login";
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
    const { name, password, email, signUpError, signUpSuccess  } = this.state;
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
                          <h2 className="text-dark">Get Started</h2>
                          <h6 className="font-weight-normal mb-4">
                            It's free to signup and only takes a minute.
                          </h6>
                          <form className="">
                            {signUpError ? (
                              <div className="alert alert-danger">
                                {signUpError}
                              </div>
                            ) :  null }
                          {signUpSuccess ? (
                              <div className="alert alert-success">
                                {signUpSuccess}
                              </div>
                            ) : null }
                            <div className="mb-3">
                            <label className="form-label"> Name</label>
                            <input
                              type="text"
                              value={name}
                              className="form-control"
                              onChange={(event) =>
                                this.handleChange(event, "name")
                              }
                            />
                            </div>
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
                              onClick={this.handleSignUp}
                              value="Sign Up"
                            />
                          </form>
                          <div className="main-signup-footer mt-3 text-center">
                            <p>
                              Already have an account?{" "}
                              <Link to="/login">Sign In</Link>{" "}
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
