import React, { Component } from "react";
import { Button, Table } from "reactstrap";
import { CSSTransition } from "react-transition-group";

import { connect } from "react-redux";
import { getCompanies, deleteCompany } from "../../actions/companyActions";
import { PropTypes } from "prop-types";

class CompanyList extends Component {
  componentDidMount() {
    this.props.getCompanies();
  }
  onDeleteClick = (id) => {
    //console.log(id);
    this.props.deleteCompany(id);
  };
  render() {
    const { companies } = this.props.company;
    return (
      <>
        <h3 className="main-header">Companies List</h3>
        <div className="qa-content-wrap">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>CEO</th>
                <th>Founded</th>
                <th>No. Of Empoyes</th>
                <th>Locations</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map(
                ({ _id, name, ceo, foundedYear, no_OfEmps, locations }) => (
                  <CSSTransition key={_id} timeout={500} classNames="fade">
                    <tr>
                      <td>{name}</td>
                      <td>{ceo}</td>

                      <td> {foundedYear}</td>
                      <td> {no_OfEmps}</td>
                      <td> {locations}</td>

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

CompanyList.propTypes = {
  getCompanies: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  company: state.company,
});

export default connect(mapStateToProps, { getCompanies, deleteCompany })(
  CompanyList
);
