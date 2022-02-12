import React, {useEffect} from "react";
import {Container, ListGroup, ListGroupItem, Button} from "reactstrap";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {connect} from "react-redux";
import {getQuestionByID, deleteComment} from "../../actions/questionActions";
import {Link, useLocation, Redirect} from "react-router-dom";
import GetInitials from "../shared/GetInitials";
import GetFormatedDate from "../shared/GetFormatedDate";
import "../../Styles/QuestionsStyles.scss";
import {VscCommentDiscussion} from "react-icons/vsc";
import {FiTrash2} from "react-icons/fi";
import CommentForm from "./CommentForm";
import PropTypes from "prop-types";
import QuestionItem from "./QuestionItem";
import CommentItem from "./QuestionItem";

const QuestionDetail = ({
                            props,
                            auth,
                            getQuestionByID,
                            question,
                            deleteComment,
                            isAuthenticated
                        }) => {
    let Location = useLocation();
    const {user} = auth;

    // console.log(Location);
    // console.log("props" + props);

    let Id = Location.value;

    // let Location = useLocation();
    // let Id = Location.value.Id;
    // console.log(Id);
    useEffect(() => {
        getQuestionByID(Id);
    }, [getQuestionByID, Id]);

    const {questions} = question;
    if (!Id) {
        return <Redirect to="/dashboard/questionList"/>;
    }
    return (
        <>
            <div className="question-detial-page">
                {questions.map((question) => (
                    <div key={question._id}>
                        <QuestionItem question={question} questionPage={true}/>
                        {question.comments.length > 0 && (
                            <>
                                <h5 className="main-header1 mb-3">
                                    {" "}
                                    <VscCommentDiscussion/> {question.comments.length} Comments
                                </h5>
                            </>
                        )}
                        {question.comments.length > 0 &&
                        question.comments?.map((comment) => (
                            // <CommentItem key={comment._id} />
                            <div className="question-detial" key={comment._id}>
                                <div className="media d-block ">
                                    <div className="media-body">
                                        <div className="d-sm-flex">
                                            {comment._id && (
                                                <GetInitials fn={`${comment.name}`} ln={null}/>
                                            )}
                                            <div className="profile">
                                                {comment.name}
                                                <GetFormatedDate
                                                    date={comment.doc}></GetFormatedDate>
                                                <div className="comment-para mt-3">
                                                    {comment.text}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="actions-badge">
                                            {/* <Link
                          to={{
                            pathname: "/dashboard/questionDetails",
                            value: Id,
                          }}
                        >
                          <Button
                            className="remove-btn mr-3"
                            color="primary"
                            size="sm"
                            id="TooltipExample1"
                          >
                            Approve
                          </Button>
                        </Link> */}

                                            <Button
                                                style={{display: user?.role === "FC" ? "inline-block" : "none" }}
                                                className="remove-btn"
                                                color="danger"
                                                size="sm"
                                                id="TooltipExample"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="top"
                                                title="Delete Comment"
                                                onClick={() => deleteComment(Id, comment._id)}
                                            >
                                                <FiTrash2/>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div
                            style={{display: user?.role === "SR" ? "block" : "none" }}
                        >
                        <CommentForm post_id={question._id}/>
                        </div>
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
    deleteComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    question: state.question,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});

export default connect(mapStateToProps, {getQuestionByID, deleteComment})(
    QuestionDetail
);
