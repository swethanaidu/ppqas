import React, { Component } from "react";
import { Button, Table, Modal, ModalHeader, ModalBody } from "reactstrap";
import { CSSTransition } from "react-transition-group";
import { BiUser } from "react-icons/bi";
import { connect } from "react-redux";
import { getJuniorUsers, convertJrUser } from "../../actions/userActions";
import { PropTypes } from "prop-types";

class JuniorList extends Component {
  state = {
    modal: false,
    activeUserId: null,
    activeUserfn: null,
    activeUserln: null,
    activeUserStatus: "no",
  };

  componentDidMount() {
    this.props.getJuniorUsers();
  }
  onConvertorJrClick = (id) => {
    //console.log(id);
    this.props.convertJrUser(id);
    // this.props.getJuniorUsers();
    // this.setState({
    //   modal: false,
    // });
  };
  openModalWithUser = (id, fn, ln) => {
    this.setState({
      modal: !this.state.modal,
      activeUserId: id,
      activeUserfn: fn,
      activeUserln: ln,
    });
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  render() {
    const { users } = this.props.user;
    const { activeUserId, activeUserfn, activeUserln, activeUserStatus } =
      this.state;
    // console.log(activeUserId);
    return (
      <>
        <h3 className="main-header">Junior Users List</h3>
        {activeUserId && (
          <Modal centered isOpen={this.state.modal}>
            <ModalHeader toggle={this.toggle}>
              Convert Junior to Senior Role
            </ModalHeader>
            <ModalBody>
              Are you sure you want to update{" "}
              <strong>
                {activeUserfn} {activeUserln}
              </strong>{" "}
              to Senior?
              <br />
              <Button
                onClick={this.onConvertorJrClick(activeUserId)}
                color="primary"
                style={{ marginRight: "2rem", marginTop: "2rem" }}
              >
                yes, Confirm
              </Button>
              <Button
                className="btn"
                color="secondary"
                onClick={this.toggle}
                style={{ marginTop: "2rem" }}
              >
                Cancel
              </Button>
            </ModalBody>
          </Modal>
        )}
        <div className="qa-content-wrap">
          <Table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Passout Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ _id, email, firstName, lastName, yop }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <tr>
                    <td>{firstName}</td>

                    <td> {lastName}</td>
                    <td> {email}</td>
                    <td>{yop}</td>

                    <td>
                      <Button
                        className="update-btn"
                        color="primary"
                        size="sm"
                        // onClick={this.onConvertorJrClick.bind(this, _id)}
                        onClick={this.openModalWithUser.bind(
                          this,
                          _id,
                          firstName,
                          lastName
                        )}
                        // onClick={this.openModalWithUser.bind(
                        //   _id,
                        //   firstName,
                        //   lastName
                        // )}
                      >
                        <BiUser />
                      </Button>
                    </td>
                  </tr>
                </CSSTransition>
              ))}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}

JuniorList.propTypes = {
  getJuniorUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getJuniorUsers, convertJrUser })(
  JuniorList
);
