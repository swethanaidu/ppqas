import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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

import { Nav, NavItem, NavLink } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

class SideNav extends Component {
  static proprTypes = {
    auth: PropTypes.object.isRequired,
  };

  autoriseModule = (module, role) => {
    switch (module) {
      case "ADD_COMPANY":
      case "VIEW_COMPANY":
      case "USER_LIST":
      case "CONVERT_JR_SR":
        return role === "PO" ? "block" : "none";

      case "VIEW_QUESTION":
        return role === "PO" ? "none" : "block";

      case "VIEW_REPORT":
        return role === "PO" ? "block" : "none";

      case "CREATE_JUNIOR":
      case "APPROVE_ANSWER":
        return role === "FC" ? "block" : "none";

      case "POST_QUESTION":
        return role === "JR" ? "block" : "none";

      case "POST_ANSWER":
        return role === "SR" ? "block" : "none";

      default:
        return "block";
    }
  };

  render() {
    const { user } = this.props.auth;
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
                <NavItem
                  style={{
                    display: this.autoriseModule("ADD_COMPANY", user?.role),
                  }}
                >
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
                <NavItem
                  style={{
                    display: this.autoriseModule("VIEW_COMPANY", user?.role),
                  }}
                >
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

                <NavItem
                  style={{
                    display: this.autoriseModule("CREATE_JUNIOR", user?.role),
                  }}
                >
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
                <NavItem
                  style={{
                    display: this.autoriseModule("USER_LIST", user?.role),
                  }}
                >
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
                <NavItem
                  style={{
                    display: this.autoriseModule("CONVERT_JR_SR", user?.role),
                  }}
                >
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
                <NavItem
                  style={{
                    display: this.autoriseModule("POST_QUESTION", user?.role),
                  }}
                >
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
                <NavItem
                  style={{
                    display: this.autoriseModule("VIEW_QUESTION", user?.role),
                  }}
                >
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
                <NavItem
                  style={{
                    display: this.autoriseModule("APPROVE_ANSWER", user?.role),
                  }}
                >
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(SideNav);
