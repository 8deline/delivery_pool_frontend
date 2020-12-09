import React from "react";
import moment from "moment";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { Link } from "react-router-dom";
import "./Login.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleFormSubmission(e) {
    e.preventDefault();

    // make api call to login
    axios
      .post(
        "http://localhost:5000/api/v1/users/login",
        qs.stringify({
          email: this.state.email,
          password: this.state.password,
        })
      )

      .then((response) => {
        if (!response.data.success) {
          this.setState({
            formErr: "Error occurred in form, please check values",
          });
          return;
        }

        localStorage.setItem("user", JSON.stringify(response.data.info));

        this.props.cookies.set("token", response.data.token, {
          path: "/",
          expires: moment.unix(response.data.expiresAt).toDate(),
        });

        this.props.history.push("/users/dashboard");
      })
      .catch((err) => {
        this.setState({
          formErr: "Error occurred in form, please check values",
        });
      });
  }

  render() {
    return (
      <div className="index-page">
          <div className="home-page-first-section" style={{ backgroundImage: "url(/img/login-page-background.jpeg)" }}>
              <div className="container">
                <div className="img-overlay">
            <p className="home-page-first-para">Hello there!</p>
            <p className="home-page-second-para">
                Let's login
                to start ordering!</p>
          <form
            className="my-2 my-lg-0"
            onSubmit={(e) => {
              this.handleFormSubmission(e);
            }}
          >
 
            <div className="form-group location-input">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                type="email"
                onChange={(e) => {
                  this.handleEmailChange(e);
                }}
                className="form-control location-input"
                id="exampleInputEmail1"
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
                className="form-control location-input"
                id="exampleInputPassword1"
              />
            </div>
            {this.state.formErr !== "" ? (
              <div className="form-group">
                <p>{this.state.formErr}</p>
              </div>
            ) : (
              ""
            )}
            <button type="submit" className="btn btn-outline-success my-2 my-sm-0 search-btn">
              Login
            </button>
          </form>
          <p>
            Don't have an account?
            <Link to="/users/register" className="sign-up"> Sign Up</Link>
          </p>
          </div>
          </div>
        </div>
        </div>



      //beffore anubhav

      // <div className="page-login">
      //   <div className="container">
      //     <form
      //       className="mt-5 mb-5"
      //       onSubmit={(e) => {
      //         this.handleFormSubmission(e);
      //       }}
      //     >
      //       <div className="form-group">
      //         <label htmlFor="exampleInputEmail1">Email address</label>
      //         <input
      //           type="email"
      //           onChange={(e) => {
      //             this.handleEmailChange(e);
      //           }}
      //           className="form-control"
      //           id="exampleInputEmail1"
      //           aria-describedby="emailHelp"
      //         />
      //       </div>
      //       <div className="form-group">
      //         <label htmlFor="exampleInputPassword1">Password</label>
      //         <input
      //           type="password"
      //           onChange={(e) => {
      //             this.handlePasswrdChange(e);
      //           }}
      //           className="form-control"
      //           id="exampleInputPassword1"
      //         />
      //       </div>
      //       {this.state.formErr !== "" ? (
      //         <div className="form-group">
      //           <p>{this.state.formErr}</p>
      //         </div>
      //       ) : (
      //         ""
      //       )}
      //       <button type="submit" className="btn btn-primary">
      //         Login
      //       </button>
      //     </form>
      //     <p>
      //       Don't have an account?
      //       <Link to="/users/register"> Sign Up</Link>
      //     </p>
      //   </div>
      // </div>
    );
  }
}

export default withRouter(withCookies(Login));
