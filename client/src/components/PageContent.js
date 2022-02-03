import React, { Component } from "react";
import Header from "./Header";
import "../Styles/PageContent.scss";
import QuestionList from "./questions/QuestionList";
import CompanyList from "./company/CompanyList";
import UserList from "./users/UserList";
import CompanyForm from "./company/Company";
import AddJuniorProfile from "./users/AddJunior";
import JuniorList from "./users/JuniorList";
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
            <Route path="/dashboard/companyList">
              <CompanyList />
            </Route>
            <Route path="/dashboard/userList">
              <UserList />
            </Route>
            <Route path="/dashboard/company">
              <CompanyForm />
            </Route>
            <Route path="/dashboard/AddJuniorProfile">
              <AddJuniorProfile />
            </Route>
            <Route path="/dashboard/ViewJuniorList">
              <JuniorList />
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
