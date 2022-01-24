import React, { Component } from "react";
import { Link } from 'react-router-dom';

import "../Styles/SideNav.scss"

export default class SideNav extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="qa-sideNav">
          <div className="qa-sideNav-head">PPQAS</div>
          <div className="qa-sideNav-content">
            <div className="qa-sideNav-menu">
              <ul className="qa-menu">
                <li>
                  <Link>link</Link>
                </li>
                <li>
                  <Link>link</Link>
                </li>
                <li>
                  <Link>link</Link>
                </li>
                <li>
                  <Link>link</Link>
                </li>
                <li>
                  <Link>link</Link>
                </li>
                <li>
                  <Link>link</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
