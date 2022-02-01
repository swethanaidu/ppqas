import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
export default class Router extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route path="/" exact component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signup" component={Register} />
          <Route path="/login" component={Login} />
        </BrowserRouter>
      </div>
    );
  }
}
