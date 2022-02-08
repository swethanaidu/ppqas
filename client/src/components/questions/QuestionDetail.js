import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getQuestionByID, deleteQuestion } from "../../actions/questionActions";
import { Link, useLocation } from "react-router-dom";
import GetInitials from "../shared/GetInitials";
import GetFormatedDate from "../shared/GetFormatedDate";
import "../../Styles/QuestionsStyles.scss";
import { AiOutlineComment } from "react-icons/ai";
import CommentForm from "./CommentForm";

const QuestionDetail = ({
  props,
  getQuestionByID,
  question,
  isAuthenticated,
  deleteQuestion,
}) => {
  let Location = useLocation();

  // console.log(Location);
  // console.log(props, "props");
  let Id = Location.value._id;

  // let Location = useLocation();
  // let Id = Location.value.Id;
  // console.log(Id);
  useEffect(() => {
    getQuestionByID(Id);
  }, [getQuestionByID]);

  const handleDelete = (id) => {
    deleteQuestion(id);
  };

  const { questions } = question;
  return (
    <Container>
      <div className="question-detial-page">
        <TransitionGroup>
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
                <div className="media d-block ">
                  <div className="media-body">
                    <h5 className="mg-b-5 tx-inverse">{title}</h5>
                    <p>{desc}</p>
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
                  <CommentForm post_id={_id} />
                </div>
              </CSSTransition>
            )
          )}
        </TransitionGroup>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  question: state.question,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getQuestionByID, deleteQuestion })(
  QuestionDetail
);
