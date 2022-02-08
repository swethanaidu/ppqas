import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getQuestionByID, deleteQuestion } from "../../actions/questionActions";
import { Link, useLocation } from "react-router-dom";
import GetInitials from "../shared/GetInitials";
import GetFormatedDate from "../shared/GetFormatedDate";
import "../../Styles/QuestionsStyles.scss";
import { VscCommentDiscussion } from "react-icons/vsc";
import CommentForm from "./CommentForm";
import PropTypes from "prop-types";
import QuestionItem from "./QuestionItem";
import CommentItem from "./QuestionItem";

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
  let Id = Location.value;

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
    <>
      <div className="question-detial-page">
        {questions.map((question) => (
          <div key={question._id}>
            <QuestionItem question={question} questionPage={true} />
            {question.comments.length > 0 && (
              <>
                <h5 className="main-header1 mb-3">
                  {" "}
                  <VscCommentDiscussion /> {question.comments.length} Comments
                </h5>
              </>
            )}
            {question.comments.length > 0 &&
              question.comments?.map((comment) => (
                <div className="question-detial" key={comment._id}>
                  <div className="media d-block ">
                    <div className="media-body">
                      <div className="d-sm-flex">
                        {comment._id && (
                          <GetInitials fn={`${comment.name}`} ln={null} />
                        )}
                        <div className="profile">
                          {comment.name}
                          <GetFormatedDate date={comment.doc}></GetFormatedDate>
                          <div className="comment-para mt-3">
                            {comment.text}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <CommentForm post_id={question._id} />
          </div>
          // <div key={_id}>
          //   <div className="media d-block ">
          //     <div className="media-body">
          //       <h5 className="mg-b-5 tx-inverse">{title}</h5>
          //       <p>{desc}</p>
          //       <div className="d-sm-flex">
          //         {user_data && (
          //           <GetInitials
          //             fn={`${user_data.firstName}`}
          //             ln={`${user_data.lastName}`}
          //           />
          //         )}
          //         <div className="profile">
          //           {name}
          //           <GetFormatedDate date={dop}></GetFormatedDate>
          //         </div>
          //       </div>
          //       <div className="company-badge">
          //         {comments.length > 0 && (
          //           <span className="badge bg-light" color="dark">
          //             <AiOutlineComment /> {comments.length}
          //           </span>
          //         )}
          //         <span className="badge bg-success ">
          //           {Company_data.name}
          //         </span>
          //       </div>
          //     </div>
          //     {comments.length > 0 &&
          //       comments?.map(({ _id, text, name, doc }) => (
          //         <div key={_id}>
          //           <p> {name}</p>
          //           <p> {text}</p>
          //           <p> {doc}</p>
          //         </div>
          //       ))}
          //     <CommentForm post_id={_id} />
          //   </div>
          // </div>
        ))}
      </div>
    </>
  );
};

QuestionDetail.propTypes = {
  question: PropTypes.object.isRequired,
  getQuestionByID: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  question: state.question,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getQuestionByID, deleteQuestion })(
  QuestionDetail
);
