import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from "react-redux";
import { getQuestions, deleteQuestion } from "../../actions/questionActions";
import { PropTypes } from "prop-types";
import QuestionModal from "./QuestionModal";

class QuestionList extends Component {
  componentDidMount() {
    this.props.getQuestions();
  }
  onDeleteClick = (id) => {
    //console.log(id);
    this.props.deleteQuestion(id);
  };
  render() {
    // this.props.question.questions;
    const { questions } = this.props.question;
    return (
      <>
        <h3 className="main-header">Questions List</h3>
        <div className="qa-content-wrap">
          <QuestionModal />
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map(({ _id, title, desc }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <tr>
                    <td>{_id}</td>
                    <td>{title}</td>

                    <td> {desc}</td>

                    <td>
                      {" "}
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, _id)}
                      >
                        &times;
                      </Button>
                    </td>
                  </tr>
                </CSSTransition>
              ))}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}

QuestionList.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  question: state.question,
});

export default connect(mapStateToProps, { getQuestions, deleteQuestion })(
  QuestionList
);
