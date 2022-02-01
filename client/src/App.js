import React, { Component } from "react";
import Router from "./Router";
import { Provider } from "react-redux";
import store from "./store";
// import { loadUser } from "./actions/authActions";

export default class App extends Component {
  componentDidMount() {
    // store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
