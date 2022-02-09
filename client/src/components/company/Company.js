import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCompany } from "../../actions/companyActions";
import { clearErrors } from "../../actions/errorActions";
import Message from "../shared/Message";
class CompanyForm extends Component {
  state = {
    // modal: false,
    name: "",
    ceo: "",
    foundedYear: "",
    no_OfEmps: "",
    locations: "",
    msg: undefined,
    loading: "",
  };
  static proprTypes = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
    message: PropTypes.string,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.object.isRequired,
  };
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //check for register error
      if (error.id === "COMPANY_ADD_FAIL") {
        this.setState({ msg: error.msg.message });
        //console.log(error.msg);
      } else {
        this.setState({ msg: undefined });
      }
    }
  }
  handleChange = (event, field) => {
    this.setState({
      [field]: event.target.value,
      // msg: undefined,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newCompany = {
      name: this.state.name,
      ceo: this.state.ceo,
      foundedYear: this.state.foundedYear,
      no_OfEmps: this.state.no_OfEmps,
      locations: this.state.locations,
    };
    // Add company via addCompany action
    this.props.addCompany(newCompany);

    this.resetForm();

    // console.log(status);
    // this.toggle(); //close modal
  };
  resetForm = () => {
    this.setState({
      name: "",
      ceo: "",
      foundedYear: "",
      no_OfEmps: "",
      locations: "",
      msg: "",
    });
    this.props.clearErrors();
    // window.location.href = "/dashboard";
  };

  render() {
    const { msg, name, ceo, foundedYear, no_OfEmps, locations } = this.state;
    const { loading } = this.props.company;
    //console.log(loading);
    // console.log(msg);
    return (
      <div>
        <h3 className="main-header">Company Form</h3>
        <div className="qa-content-wrap">
          {/* <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Question
          </Button> */}
          {msg && <Message variant="danger">{msg}</Message>}

          {loading ? "Looooading......" : ""}
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    placeholder=""
                    onChange={(event) => this.handleChange(event, "name")}
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <Label for="ceo">CEO</Label>
                  <Input
                    type="text"
                    name="ceo"
                    id="ceo"
                    value={ceo}
                    placeholder=""
                    onChange={(event) => this.handleChange(event, "ceo")}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <Label for="foundedYear">Founded Year</Label>
                  <Input
                    type="text"
                    name="foundedYear"
                    id="foundedYear"
                    placeholder=""
                    value={foundedYear}
                    onChange={(event) =>
                      this.handleChange(event, "foundedYear")
                    }
                  />
                </div>

                <div className="col-lg-6 mb-3">
                  <Label for="no_OfEmps">Total no. of Employees</Label>
                  <Input
                    type="text"
                    name="no_OfEmps"
                    id="no_OfEmps"
                    value={no_OfEmps}
                    placeholder=""
                    onChange={(event) => this.handleChange(event, "no_OfEmps")}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <Label for="locations">Locations</Label>
                  <Input
                    type="text"
                    name="locations"
                    value={locations}
                    id="locations"
                    placeholder=""
                    onChange={(event) => this.handleChange(event, "locations")}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 mb-3">
                  <Button
                    color="primary"
                    className="btn"
                    style={{ marginTop: "2rem" }}
                    block
                  >
                    Add Company
                  </Button>
                </div>
              </div>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  company: state.company,
  loading: state.company.loading,
  message: state.company.message,
  error: state.error,
  // isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addCompany, clearErrors })(
  CompanyForm
);
