import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import Alert from "../shared/Alert";

const constants = require("../../constants");
// const API_URL = constants.API_URL;

class Register extends Component {
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
      msg: null,
      showSR: false,
    };
  }

  static proprTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.message });
        //console.log(error.msg);
      } else {
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
    const newUser = {
      email,
      password,
      firstName,
      lastName,
      role,
      totalExp,
      company,
      doj,
    };
    //Attempt to register
    this.props.register(newUser);
    this.resetSignUpForm();
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
    this.props.clearErrors();
    // window.location.href = "/dashboard";
  };

  render() {
    const {
      firstName,
      lastName,
      password,
      email,
      msg,
      signUpError,
      signUpSuccess,
      totalExp,
      company,
      doj,
    } = this.state;
    if (this.props.auth.token) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <React.Fragment>
        <div className="page">
          {this.props.auth.token ? <Alert /> : " "}

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
                            {msg ? (
                              <div className="alert alert-danger">{msg}</div>
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
                                    <Form.Label>
                                      Select Date of Joining
                                    </Form.Label>
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

const mapStateToProps = (state) => ({
  // question: state.question,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
