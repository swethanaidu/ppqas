import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";

const constants = require("../constants");
const API_URL = constants.API_URL;

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      totalExp: "",
      company: "",
      doj: "",
      isLoggedIn: false,
      loginError: undefined,
      signUpError: undefined,
      signUpSuccess: undefined,
      showSR: false,
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
      isLoggedIn: isLoggedIn,
    });
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
      (currentRole === "SR") ? this.setState({ showSR: true }) : this.setState({ showSR: false })
    }
  };
  handleSignUp = () => {
    const {
      email,
      password,
      firstName,
      lastName,
      role,
      totalExp,
      company,
      doj,
    } = this.state;
    const obj = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      role: role,
      totalExp: totalExp,
      company: company,
      doj: doj,
    };
    axios({
      method: "POST",
      url: `${API_URL}/signup`,
      header: { "Content-Type": "application/json" },
      data: obj,
    })
      .then((result) => {
        //debugger;
        //localStorage.setItem("email", JSON.stringify(result.data.email));
        localStorage.setItem("isLoggedIn", true);
        this.setState({
          // email: result.data.email,
          isLoggedIn: true,
          loginError: undefined,
          signUpError: undefined,
          signUpSuccess: result.data.message,
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
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      role: "",
      totalExp: "",
      company: "",
      doj: "",
      signUpError: undefined,
    });
    // window.location.href = "/login";
  };
  logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    this.setState({
      user: undefined,
      isLoggedIn: false,
    });
  };
  render() {
    const {
      firstName,
      lastName,
      password,
      email,
      signUpError,
      signUpSuccess,
      totalExp,
      company,
      doj,
    } = this.state;
    return (
      <React.Fragment>
        <div className="page">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 card-sigin-main py-4 justify-content-center mx-auto">
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
                            ) : null}
                            {signUpSuccess ? (
                              <div className="alert alert-success">
                                {signUpSuccess}
                              </div>
                            ) : null}
                            <div className="row">
                              <div className="col-lg-6 mb-3">
                                <label className="form-label">First Name</label>
                                <input
                                  type="text"
                                  value={firstName}
                                  className="form-control"
                                  onChange={(event) =>
                                    this.handleChange(event, "firstName")
                                  }
                                />
                              </div>

                              <div className="col-lg-6 mb-3">
                                <label className="form-label">Last Name</label>
                                <input
                                  type="text"
                                  value={lastName}
                                  className="form-control"
                                  onChange={(event) =>
                                    this.handleChange(event, "lastName")
                                  }
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 mb-3">
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
                              <div className="col-lg-6 mb-3">
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
                            </div>
                            <div className="row">
                              <div className="col-lg-6 mb-3">
                                <label className="form-label">Role</label>
                                <select
                                  className="form-select"
                                  onChange={(event) =>
                                    this.handleChange(event, "role")
                                  }
                                >
                                  <option defaultValue>Select your Role</option>
                                  <option value="PO">Placement Office</option>
                                  <option value="FC">Faculty</option>
                                  <option value="SR">Senior</option>
                                  {/* <option value="JR">Junior</option> */}
                                </select>
                              </div>
                              
                                <div className="col-lg-6 mb-3">
                                  <label className="form-label">
                                    Total Experience
                                  </label>
                                  <input
                                    type="text"
                                    value={totalExp}
                                    className="form-control"
                                    onChange={(event) =>
                                      this.handleChange(event, "totalExp")
                                    }
                                  />
                                </div>
                              
                            </div>
                            {this.state.showSR && (
                              <div className="row">
                                <div className="col-lg-6 mb-3">
                                  <label className="form-label">Company</label>
                                  <input
                                    type="text"
                                    value={company}
                                    className="form-control"
                                    onChange={(event) =>
                                      this.handleChange(event, "company")
                                    }
                                  />
                                </div>
                                <div className="col-lg-6 mb-3">
                                  <Form.Group controlId="doj">
                                    <Form.Label>Select Date</Form.Label>
                                    <Form.Control
                                      type="date"
                                      name="doj"
                                      defaultValue={doj}
                                      placeholder="Date of Joining"
                                      onChange={(event) =>
                                        this.handleChange(event, "doj")
                                      }
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            )}

                            {/* {this.state.showPO && (
                              <div className="{this.state.showPO}">PO</div>
                            )}
                            {this.state.showFC && (
                              <div className="{this.state.showFC}">FC</div>
                            )}
                            {this.state.showSR && (
                              <div className="{this.state.showSR}">SR</div>
                            )} */}
                            <input
                              type="button"
                              className="btn btn-primary w-100 p-3 mt-3"
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
