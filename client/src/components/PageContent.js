import React, { Component } from "react";
import Header from './Header';
import '../Styles/PageContent.scss';
;


export default class PageContent extends Component {
  render() {
    return (
      <div className="qa-wrap">
        <Header />
        <div className="qa-content">
            <div className="qa-content-wrap"></div>
        </div>
        <div className="qa-footer "></div>
      </div>
    );
  }
}
