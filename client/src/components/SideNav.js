import React, { Component } from "react";
import "../Styles/SideNav.scss";
import {
  BiHome,
  BiAddToQueue,
  BiCommentMinus,
  BiBuildings,
  BiStreetView,
  BiCommentCheck,
  BiMessageAdd,
  BiTable,
  BiUserPlus,
} from "react-icons/bi";
import companyLogo from "../Assets/logo.png";
// import { Nav, NavItem, NavLink } from "reactstrap";
import { Nav, NavItem, NavLink } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

export default class SideNav extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="qa-sideNav">
          <div className="qa-sideNav-head">
            <img src={companyLogo} alt="PPQAS logo" width="100px" />
          </div>
          <div className="qa-sideNav-content">
            <div className="qa-sideNav-menu">
              <Nav vertical className="qa-menu">
                <NavItem>
                  <NavLink
                    tag={RRNavLink}
                    activeClassName="active"
                    exact
                    to="/"
                  >
                    <BiHome /> Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RRNavLink}
                    activeClassName="active"
                    exact
                    to="/"
                  >
                    <BiBuildings /> Add Company
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RRNavLink}
                    activeClassName="active"
                    exact
                    to="/"
                  >
                    <BiCommentMinus />
                    Remove Company
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RRNavLink}
                    activeClassName="active"
                    exact
                    to="/"
                  >
                    <BiStreetView />
                    Convert Jr. to Sr.
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RRNavLink}
                    activeClassName="active"
                    exact
                    to="/"
                  >
                    <BiUserPlus />
                    Create Jr. profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RRNavLink}
                    activeClassName="active"
                    exact
                    to="/"
                  >
                    <BiCommentCheck />
                    Approve Awsners
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RRNavLink}
                    activeClassName="active"
                    exact
                    to="/"
                  >
                    <BiMessageAdd />
                    Post Question
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RRNavLink}
                    activeClassName="active"
                    exact
                    to="/dashboard/questionList"
                  >
                    <BiTable />
                    View Questions
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
