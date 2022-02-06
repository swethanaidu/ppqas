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
  BiBuilding,
} from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
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
          <div className="qa-sideNav-content  pt-3">
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
                    to="/dashboard/company"
                  >
                    <BiBuilding />
                    Add Company
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RRNavLink}
                    activeClassName="active"
                    exact
                    to="/dashboard/companyList"
                  >
                    <BiBuildings />
                    View Company List
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    tag={RRNavLink}
                    activeClassName="active"
                    exact
                    to="/dashboard/AddJuniorProfile"
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
                    to="/dashboard/userList"
                  >
                    <FiUsers />
                    View Users List
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RRNavLink}
                    activeClassName="active"
                    exact
                    to="/dashboard/ViewJuniorList"
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
                    to="/dashboard/PostQuestions"
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
                    View Questions List
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
              </Nav>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
