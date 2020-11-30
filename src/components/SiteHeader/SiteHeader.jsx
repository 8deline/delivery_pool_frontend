import React from "react";
import "./SiteHeader.scss";
import { Link } from "react-router-dom";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";

class SiteHeader extends React.Component {
  isAuthenticated() {
    const token = this.props.cookies.get("token");

    if (!token || token === "undefined" || token === "null") {
      return false;
    }

    return true;
  }

  handleLogoutChange() {
    this.props.cookies.remove("token");
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <ul className="nav">
            <Link className="navbar-brand" to="/">
              <h3 className="heading-text">
                <span className="first-text-heading">Delivery</span>
                <span className="second-text-heading"> Pool</span>
              </h3>
            </Link>
          </ul>
          <ul className="nav ml-auto">
            <Link className="nav-link" to="/users/dashboard">
              <button className="btn">
                <i className="fas fa-shopping-bag"> Your order</i>
              </button>
            </Link>
            {!this.isAuthenticated() ? (
              <Link className="nav-link" to="/users/login">
                <button className="btn">
                  <i className="fas fa-user-shield"> Login</i>
                </button>
              </Link>
            ) : (
              <Link
                className="nav-link"
                to="/"
                onClick={(e) => {
                  this.handleLogoutChange();
                }}
              >
                <button className="btn">
                  <i className="fas fa-sign-out-alt"> Logout</i>
                </button>
              </Link>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(withCookies(SiteHeader));
