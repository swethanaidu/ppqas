import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import GetInitials from "../shared/GetInitials";
import GetFormatedDate from "../shared/GetFormatedDate";
import "../../Styles/QuestionsStyles.scss";
import { VscCommentDiscussion } from "react-icons/vsc";
import { Button, Tooltip } from "reactstrap";
import { FiTrash2 } from "react-icons/fi";
import { deleteQuestion, getQuestions } from "../../actions/questionActions";

// import { addLike, removeLike, deletePost } from "../../actions/post";

const QuestionItem = ({
  auth,
  questionPage,
  deleteQuestion,
  question: { _id, title, desc, Company_data, name, user_data, dop, comments },
  deleteFlag,
}) => (
  <div className="question-detial">
    <div className="media d-block ">
      <div className="media-body">
        <h5 className="mg-b-5 tx-inverse mb-4">{title}</h5>
        {questionPage && <p>{desc}</p>}
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
          <div className="company-badge">
            {comments.length > 0 && !questionPage ? (
              <span className="badge bg-light" color="dark">
                <VscCommentDiscussion /> {comments.length}
              </span>
            ) : (
              ""
            )}
            {Company_data && (
              <span className="badge bg-light ">{Company_data.name}</span>
            )}
          </div>
        </div>

        <div className="actions-badge">
          {!questionPage ? (
            <Link
              to={{
                pathname: "/dashboard/questionDetails",
                value: _id,
              }}
            >
              <Button
                className="remove-btn mr-3"
                color="primary"
                size="sm"
                id="TooltipExample1"
              >
                Discussion
              </Button>
            </Link>
          ) : (
            <Link
              to={{
                pathname: "/dashboard/questionList",
              }}
            >
              <Button
                className="remove-btn mr-3"
                color="primary"
                size="sm"
                id="TooltipExample1"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="View Question"
              >
                Back
              </Button>
            </Link>
          )}
          <Button
            style={{ display: !questionPage ? deleteFlag : "none" }}
            className="remove-btn"
            color="danger"
            size="sm"
            id="TooltipExample"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Delete Question zzzzz"
            onClick={() => deleteQuestion(_id)}
          >
            <FiTrash2 />
          </Button>
        </div>
      </div>
    </div>
  </div>
);

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteQuestion })(QuestionItem);
