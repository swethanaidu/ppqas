import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addComment } from "../../actions/questionActions";
import { getCompanies } from "../../actions/companyActions";
class CommentForm extends Component {
  static proprTypes = {
    auth: PropTypes.object.isRequired,
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
    //this.toggle(); //close modal
  };

  render() {
    const { companies } = this.props.company;
    // console.log(`${this.props.post_id}`);
    return (
      <>
        <h5 className="main-header1">Post Your Comments</h5>
        <div>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <div className="row">
                <div className="col-lg-12">
                  <Label for="text">Comment</Label>
                  <Input
                    type="textarea"
                    name="text"
                    id="text"
                    cols="30"
                    rows="5"
                    placeholder=""
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

export default connect(mapStateToProps, { getCompanies, addComment })(
  CommentForm
);
