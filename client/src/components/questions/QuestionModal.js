import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { addQuestion } from "../../actions/questionActions";

class QuestionModal extends Component {
  state = {
    modal: false,
    title: "",
    desc: "",
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  handleChange = (event, field) => {
    this.setState({
      [field]: event.target.value,
      //   loginError: undefined,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      title: this.state.title,
      desc: this.state.desc,
    };
    // Add ques vio addQuestion action
    this.props.addQuestion(newQuestion);
    this.toggle(); //close modal
  };

  render() {
    return (
      <div>
        <Button
          color="primary"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add Question
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Question List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="title">Item</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Add title"
                  onChange={(event) => this.handleChange(event, "title")}
                />
                <Label for="desc">Desc</Label>
                <Input
                  type="text"
                  name="desc"
                  id="desc"
                  placeholder="Add desc"
                  onChange={(event) => this.handleChange(event, "desc")}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Question
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  question: state.question,
  // isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addQuestion })(QuestionModal);
