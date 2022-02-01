import React, { Component } from "react";
import Header from "./Header";
import "../Styles/PageContent.scss";
import QuestionList from "./questions/QuestionList";
import QuestionModal from "./questions/QuestionModal";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";

export default class PageContent extends Component {
  render() {
    return (
      <div className="qa-wrap">
        <Header />
        <div className="qa-content">
          <Switch>
            <Route path="/dashboard/questionList">
              <QuestionList />
            </Route>
          </Switch>
          {/* <h1>Users List</h1>
          <div className="qa-content-wrap">
            <Container>
              <QuestionModal />
              <QuestionList />
            </Container>
          </div> */}
        </div>
        <div className="qa-footer "></div>
      </div>
    );
  }
}
