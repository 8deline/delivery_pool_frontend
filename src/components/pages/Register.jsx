import React from "react";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import axios from "axios";
import qs from "qs";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      contact_number: "",
      user_id: "",
      default_address: "",
      email: "",
      password: "",
      formErr: "",
    };
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePasswrdChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleFirstNameChange(e) {
    this.setState({
      first_name: e.target.value,
    });
  }

  handleLastNameChange(e) {
    this.setState({
      last_name: e.target.value,
    });
  }

  handleUserIDChange(e) {
    this.setState({
      user_id: e.target.value,
    });
  }

  handleContactNumberChange(e) {
    this.setState({
      contact_number: e.target.value,
    });
  }

  handleDefaultAddressChange(e) {
    this.setState({
      default_address: e.target.value,
    });
  }

  handleFormSubmission(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/api/v1/users/register",
        qs.stringify({
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          user_id: this.state.user_id,
          contact_number: this.state.contact_number,
          email: this.state.email,
          default_address: this.state.default_address,
          password: this.state.password,
        })
      )
      .then((response) => {
        this.props.history.push("/users/login");
      })
      .catch((err) => {
        this.setState({
          formErr: err.response.data.message,
        });
      });
  }

  render() {
    return (
      <div className="page-register">
        <div className="container">
          <form
            className="mt-5 mb-5"
            onSubmit={(e) => {
              this.handleFormSubmission(e);
            }}
          >
            <div className="form-group">
              <label htmlFor="InputFirstName">First Name</label>
              <input
                type="text"
                onChange={(e) => {
                  this.handleFirstNameChange(e);
                }}
                className="form-control"
                id="InputFirstName"
                aria-describedby="FirstNamelHelp"
              />
            </div>
            <div className="form-group">
              <label htmlFor="InputFirstName">Last Name</label>
              <input
                type="text"
                onChange={(e) => {
                  this.handleLastNameChange(e);
                }}
                className="form-control"
                id="InputLastName"
                aria-describedby="LastNamelHelp"
              />
            </div>
            <div className="form-group">
              <label htmlFor="InputUserID">User ID</label>
              <input
                type="text"
                onChange={(e) => {
                  this.handleUserIDChange(e);
                }}
                className="form-control"
                id="InputUserID"
                aria-describedby="UserIDlHelp"
              />
            </div>

            <div className="form-group">
              <label htmlFor="InputContactNumber">Contact number</label>
              <input
                type="text"
                onChange={(e) => {
                  this.handleContactNumberChange(e);
                }}
                className="form-control"
                id="InputContactnumber"
                aria-describedby="ContactNumberHelp"
              />
            </div>

            <div className="form-group">
              <label htmlFor="InputEmail1">Email Address</label>
              <input
                type="email"
                onChange={(e) => {
                  this.handleEmailChange(e);
                }}
                className="form-control"
                id="InputEmail"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                onChange={(e) => {
                  this.handlePasswrdChange(e);
                }}
                className="form-control"
                id="InputPassword"
              />
            </div>
            <div className="form-group">
              <label htmlFor="InputDefaultAddress">Address (Default)</label>
              <input
                type="text"
                onChange={(e) => {
                  this.handleDefaultAddressChange(e);
                }}
                className="form-control"
                id="InputDefaultAddress"
                aria-describedby="DefaultAddresslHelp"
              />
            </div>
            {this.state.formErr !== "" ? (
              <div className="form-group">
                <p>{this.state.formErr}</p>
              </div>
            ) : (
              ""
            )}
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(withCookies(Register));
