import React, { Component } from "react";
import { Button, Table } from "reactstrap";
import { CSSTransition } from "react-transition-group";

import { connect } from "react-redux";
import { getAllUsers, deleteUser } from "../../actions/userActions";
import { PropTypes } from "prop-types";

class UserList extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }
  onDeleteClick = (id) => {
    //console.log(id);
    this.props.deleteUser(id);
  };
  render() {
    const { users } = this.props.user;
    return (
      <>
        <h3 className="main-header">Users List</h3>
        <div className="qa-content-wrap">
          <Table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Experience</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(
                ({ _id, email, firstName, lastName, role, totalExp }) => (
                  <CSSTransition key={_id} timeout={500} classNames="fade">
                    <tr>
                      <td>{firstName}</td>

                      <td> {lastName}</td>
                      <td> {email}</td>
                      <td> {role}</td>
                      <td>{totalExp}</td>

                      <td>
                        {" "}
                        <Button
                          className="remove-btn"
                          color="danger"
                          size="sm"
                          onClick={this.onDeleteClick.bind(this, _id)}
                        >
                          &times;
                        </Button>
                      </td>
                    </tr>
                  </CSSTransition>
                )
              )}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}

UserList.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getAllUsers, deleteUser })(UserList);
