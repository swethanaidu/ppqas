import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import GetInitials from "../shared/GetInitials";
import GetFormatedDate from "../shared/GetFormatedDate";
import "../../Styles/QuestionsStyles.scss";
import { AiOutlineComment } from "react-icons/ai";
// import { addLike, removeLike, deletePost } from "../../actions/post";

const QuestionItem = ({
  auth,
  questionPage,
  question: { _id, title, desc, Company_data, name, user_data, dop, comments },
}) => (
  <div className="question-detial">
    <div className="media d-block ">
      <div className="media-body">
        <h5 className="mg-b-5 tx-inverse">{title}</h5>
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
        </div>

        <div className="company-badge">
          {comments.length > 0 && !questionPage ? (
            <span className="badge bg-light" color="dark">
              <AiOutlineComment /> {comments.length}
            </span>
          ) : (
            ""
          )}
          <span className="badge bg-success ">{Company_data.name}</span>
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

export default connect(mapStateToProps, null)(QuestionItem);
