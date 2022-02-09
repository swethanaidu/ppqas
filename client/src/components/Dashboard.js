import React, { Component } from "react";
import SideNav from "./SideNav";
import PageContent from "./PageContent";
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/authActions";
import Alert from "./shared/Alert";

export default class Dashboard extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    // const { isLoggedIn, user } = this.state;

    return (
      <Provider store={store}>
        <div className="qa">
          <Alert />
          <SideNav />
          <PageContent />
        </div>
      </Provider>
    );
  }
}
