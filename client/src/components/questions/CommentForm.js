import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addComment } from "../../actions/questionActions";
import { getCompanies } from "../../actions/companyActions";
import { clearErrors } from "../../actions/errorActions";
class CommentForm extends Component {
  static proprTypes = {
    auth: PropTypes.object.isRequired,
    clearErrors: PropTypes.object.isRequired,
  };
  state = {
    modal: false,
    title: "",
    text: "",
    company_id: null,
  };
  componentDidMount() {
    // this.props.getCompanies();
  }
  handleChange = (event, field) => {
    this.setState({
      [field]: event.target.value,
      //   loginError: undefined,
    });
    // console.log(this.state.company_id);
  };
  onSubmit = (e) => {
    e.preventDefault();
    const posId = `${this.props.post_id}`;
    const { user } = this.props.auth;
    const newComment = {
      user: user._id,
      name: user.firstName + " " + user.lastName,
      text: this.state.text,
    };
    // Add ques vio addComment action
    this.props.addComment(posId, newComment);
    this.resetForm();
  };
  resetForm = () => {
    this.setState({
      text: "",
      msg: "",
    });
    this.props.clearErrors();
    // window.location.href = "/dashboard";
  };
  render() {
    const { companies } = this.props.company;
    const { text } = this.state;
    // console.log(`${this.props.post_id}`);
    return (
      <>
        <h5 className="main-header1">Post Your Comments</h5>
        <div>
          <Form onSubmit={this.onSubmit.bind(this)}>
            <FormGroup>
              <div className="row">
                <div className="col-lg-12">
                  {/* <Label for="text">Comment</Label> */}
                  <Input
                    type="textarea"
                    name="text"
                    id="text"
                    cols="30"
                    rows="5"
                    placeholder=""
                    value={text}
                    onChange={(event) => this.handleChange(event, "text")}
                  />
                </div>
              </div>
              <Button color="primary" style={{ marginTop: "2rem" }}>
                Add Comment
              </Button>
            </FormGroup>
          </Form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  question: state.question,
  auth: state.auth,
  company: state.company,
  // isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  getCompanies,
  addComment,
  clearErrors,
})(CommentForm);
