import React, {Component} from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import {connect} from "react-redux";
import {addCompany} from "../../actions/companyActions";

class CompanyForm extends Component {
    state = {
        name: "",
        ceo: "",
        foundedYear: "",
        no_OfEmps: "",
        locations: "",
    };

    handleChange = (event, field) => {
        this.setState({
            [field]: event.target.value,
        });
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.validateInput()) {
            alert('Kindly provide all mandatory fields to proceed...');
        } else {
            const newCompany = {
                name: this.state.name,
                ceo: this.state.ceo,
                foundedYear: this.state.foundedYear,
                no_OfEmps: this.state.no_OfEmps,
                locations: this.state.locations,
            };
            // Add company via addCompany action
            this.props.addCompany(newCompany);
        }
    };

    validateInput() {
        return !(this.isEmpty(this.state.name) || this.isEmpty(this.state.ceo)
            || this.isEmpty(this.state.foundedYear) || this.isEmpty(this.state.no_OfEmps)
            || this.isEmpty(this.state.locations))
    }

    isEmpty = (data) => {
        return (!data || data.trim().length === 0);
    }

    render() {
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
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <div className="row">
                                <div className="col-lg-6 mb-3">
                                    <Label for="name">Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Add Name"
                                        onChange={(event) => this.handleChange(event, "name")}
                                    />
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <Label for="ceo">CEO</Label>
                                    <Input
                                        type="text"
                                        name="ceo"
                                        id="ceo"
                                        placeholder="Add CEO"
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
                                        placeholder="Add Founded Year"
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
                                        placeholder="Add Total no. of Employees"
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
                                        id="locations"
                                        placeholder="Add Locations"
                                        onChange={(event) => this.handleChange(event, "locations")}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 mb-3">
                                    <Button
                                        color="primary"
                                        className="btn"
                                        style={{marginTop: "2rem"}}
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
    // isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {addCompany})(CompanyForm);
