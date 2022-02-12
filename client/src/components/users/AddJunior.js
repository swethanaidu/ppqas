import React, {Component} from "react";
import {Button, Form, FormGroup, Label, Input} from "reactstrap";
import {connect} from "react-redux";
import {addUser} from "../../actions/userActions";
import PropTypes from "prop-types";
import {clearErrors} from "../../actions/errorActions";
import Message from "../shared/Message";

class AddJunior extends Component {
    state = {
        // modal: false,
        firstName: "",
        lastName: "",
        email: "",
        yop: "",
        validationMsg: undefined,
        msg: "",
    };

    static proprTypes = {
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
    };

    componentDidUpdate(prevProps) {
        const {error} = this.props;
        if (error !== prevProps.error) {
            //check for register error
            if (error.id === "JUNIOR_REGISTER_FAIL") {
                this.setState({msg: error.msg.message});
            } else {
                this.setState({msg: null});
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
        if (!this.validateInput()) {
            this.setState({
                validationMsg: "Kindly provide all mandatory fields to proceed...",
            });
        } else {
            this.setState({ validationMsg: "" });
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
        }
    };

    validateInput() {
        return !(
            this.isEmpty(this.state.firstName) ||
            this.isEmpty(this.state.lastName) ||
            this.isEmpty(this.state.email) ||
            this.isEmpty(this.state.yop)
        );
    }

    isEmpty = (data) => {
        return !data || data.trim().length === 0;
    };

    resetSignUpForm = () => {
        this.setState({
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
        const {msg, firstName, lastName, email, validationMsg, yop} = this.state;
        return (
            <div>
                <h3 className="main-header">Create Junior Profile</h3>
                <div className="qa-content-wrap">
                    {msg && <Message variant="danger">{msg}</Message>}
                    {validationMsg && <Message variant="danger">{validationMsg}</Message>}

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
                                        value={firstName}
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
                                        value={lastName}
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
                                        value={email}
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
                                        value={yop}
                                        onChange={(event) => this.handleChange(event, "yop")}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-3">
                                    <Button
                                        color="primary"
                                        className="btn"
                                        style={{marginTop: "2rem"}}
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

export default connect(mapStateToProps, {addUser, clearErrors})(AddJunior);
