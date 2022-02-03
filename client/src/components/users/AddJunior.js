import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { addUser } from "../../actions/userActions";
import PropTypes from "prop-types";
import { clearErrors } from "../../actions/errorActions";

class AddJunior extends Component {
  state = {
    // modal: false,
    firstName: "",
    lastName: "",
    email: "",
    yop: "",
    successMsg: "",
    msg: "",
  };
  // toggle = () => {
  //   this.setState({
  //     modal: !this.state.modal,
  //   });
  // };
  static proprTypes = {
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //check for register error
      if (error.id === "JUNIOR_REGISTER_FAIL") {
        this.setState({ msg: error.msg.message });
        this.setState({ successMsg: null });
        //console.log(error.msg);
      } else {
        this.setState({ msg: null });
        this.setState({ successMsg: "loggedIn" });
      }
    }
  }
  handleChange = (event, field) => {
    this.setState({
      [field]: event.target.value,
      //   loginError: undefined,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      yop: this.state.yop,
      role: "JR",
      totalExp: "0",
    };
    // Add company via addUser action
    this.props.addUser(newUser);
    this.resetSignUpForm();
    //console.log(status);
    // this.toggle(); //close modal
  };
  resetSignUpForm = () => {
    this.setState({
      // isSignUpModalOpen: false,
      firstName: "",
      lastName: "",
      email: "",
      yop: "",
      msg: "",
    });
    this.props.clearErrors();
    // window.location.href = "/dashboard";
  };

  render() {
    const { msg, successMsg } = this.state;
    return (
      <div>
        <h3 className="main-header">Create Junior Profile</h3>
        <div className="qa-content-wrap">
          {/* <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Question
          </Button> */}
          {msg ? <div className="alert alert-danger">{msg}</div> : null}
          {successMsg ? (
            <div className="alert alert-success">
              Junior Profile has been added successfully!
            </div>
          ) : null}
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <Label for="firstName">First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder=""
                    onChange={(event) => this.handleChange(event, "firstName")}
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <Label for="lastName">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder=""
                    onChange={(event) => this.handleChange(event, "lastName")}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder=""
                    onChange={(event) => this.handleChange(event, "email")}
                  />
                </div>

                <div className="col-lg-6 mb-3">
                  <Label for="yop">Year of Passout</Label>
                  <Input
                    type="text"
                    name="yop"
                    id="yop"
                    placeholder=""
                    onChange={(event) => this.handleChange(event, "yop")}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-3 mb-3">
                  <Button
                    color="primary"
                    className="btn"
                    style={{ marginTop: "2rem" }}
                    block
                  >
                    Add User
                  </Button>
                </div>
              </div>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error,
  // isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addUser, clearErrors })(AddJunior);
