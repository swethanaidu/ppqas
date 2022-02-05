import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addQuestion } from "../../actions/questionActions";
import { getCompanies } from "../../actions/companyActions";
class QuestionForm extends Component {
  static proprTypes = {
    auth: PropTypes.object.isRequired,
  };
  state = {
    modal: false,
    title: "",
    desc: "",
    company_id: null,
  };
  componentDidMount() {
    this.props.getCompanies();
  }
  handleChange = (event, field) => {
    this.setState({
      [field]: event.target.value,
      //   loginError: undefined,
    });
    console.log(this.state.company_id);
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { user } = this.props.auth;
    const newQuestion = {
      user: user._id,
      name: user.firstName + " " + user.lastName,
      title: this.state.title,
      desc: this.state.desc,
      company_id: this.state.company_id,
    };
    // Add ques vio addQuestion action
    this.props.addQuestion(newQuestion);
    //this.toggle(); //close modal
  };

  render() {
    const { companies } = this.props.company;
    return (
      <>
        <h3 className="main-header">Post Your Question</h3>
        <div className="qa-content-wrap">
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <div className="row">
                <div className="col-lg-8">
                  <div className="col-lg-4">
                    <Label for="company_id">Company</Label>
                    <Input
                      id="company_id"
                      name="company_id"
                      className="mb-3"
                      type="select"
                      onChange={(event) =>
                        this.handleChange(event, "company_id")
                      }
                    >
                      <option>Select Company</option>
                      {companies.map(({ _id, name }) => (
                        <option key={_id} value={_id}>
                          {name}
                        </option>
                      ))}
                    </Input>
                  </div>

                  <Label for="title">Title</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    className="mb-3"
                    placeholder=""
                    onChange={(event) => this.handleChange(event, "title")}
                  />

                  <Label for="desc">Description</Label>
                  <Input
                    type="textarea"
                    name="desc"
                    id="desc"
                    cols="30"
                    rows="5"
                    placeholder=""
                    onChange={(event) => this.handleChange(event, "desc")}
                  />
                </div>
              </div>
              <Button color="primary" style={{ marginTop: "2rem" }}>
                Add Question
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

export default connect(mapStateToProps, { getCompanies, addQuestion })(
  QuestionForm
);
