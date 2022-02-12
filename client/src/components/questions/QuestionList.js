import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { BiTrash } from "react-icons/bi";
import { connect } from "react-redux";
import { getQuestions, deleteQuestion } from "../../actions/questionActions";
import { PropTypes } from "prop-types";
import GetInitials from "../shared/GetInitials";
import GetFormatedDate from "../shared/GetFormatedDate";
import "../../Styles/QuestionsStyles.scss";
import { AiOutlineComment } from "react-icons/ai";
import { Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { NavLink as RRNavLink } from "react-router-dom";
import QuestionItem from "./QuestionItem";
class QuestionList extends Component {
  componentDidMount() {
    this.props.getQuestions();
  }
  // onDeleteClick = (id) => {
  //   //console.log(id);
  //   this.props.deleteQuestion(id);
  // };

    getDleteQuestionFlag = (action, role) => {
        switch (action) {
            case "DELETE_QUESTION":
            case "DELETE_ANSWER":
                return role === "FC" ? "inline-block" : "none";
            case "POST_QUESTION":
                return role === "JR" ? "inline-block" : "none";
            case "POST_ANSWER":
                return role === "SR" ? "inline-block" : "none";
            default:
                return "none";
        }
    };

  render() {
      const { user } = this.props.auth;
    // this.props.question.questions;
    const { questions } = this.props.question;

    return (
      <>
        <h3 className="main-header">Questions List</h3>
        <div className="qa-content-wrap">
          {questions.map((question) => (
            <CSSTransition key={question._id} timeout={500} classNames="fade">
              <div className="text-wrap" >
                <QuestionItem question={question} questionPage={false}
                              deleteFlag={this.getDleteQuestionFlag("DELETE_QUESTION", user?.role)} />
              </div>
            </CSSTransition>
          ))}
        </div>
      </>
    );
  }
}

QuestionList.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  question: state.question,
  auth: state.auth,
});

export default connect(mapStateToProps, { getQuestions, deleteQuestion })(
  QuestionList
);
