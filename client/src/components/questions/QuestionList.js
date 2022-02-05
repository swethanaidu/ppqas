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
          {/* <QuestionModal /> */}
          {/* <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody> */}
          {questions.map(
            ({
              _id,
              title,
              desc,
              Company_data,
              name,
              user_data,
              dop,
              comments,
            }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <div className="text-wrap">
                  <div className="question-detial">
                    <div className="media d-block ">
                      <div className="media-body">
                        <h5 className="mg-b-5 tx-inverse">{title}</h5>
                        <div className="d-sm-flex">
                          {user_data && (
                            <GetInitials
                              fn={`${user_data.firstName}`}
                              ln={`${user_data.lastName}`}
                            />
                          )}
                          <div className="profile">
                            {name}
                            <GetFormatedDate date={dop}></GetFormatedDate>
                          </div>
                        </div>
                        {/* <p>{desc}</p> */}
                        <div className="company-badge">
                          {comments.length > 0 && (
                            <span class="badge bg-light" color="dark">
                              <AiOutlineComment /> {comments.length}
                            </span>
                          )}
                          <span className="badge bg-success ">
                            {Company_data.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <tr>
                    <td>{_id}</td>
                    <td>{title}</td>

                    <td> {desc}</td>

                    <td>
  
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, _id)}
                      >
                        <BiTrash size="1.5rem" />
                      </Button>
                    </td>
                  </tr> */}
              </CSSTransition>
            )
          )}
          {/* </tbody>
          </Table> */}
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
