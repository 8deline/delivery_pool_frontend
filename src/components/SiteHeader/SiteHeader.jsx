import React from "react";
import "./SiteHeader.scss";
import { Link } from "react-router-dom";

class SiteHeader extends React.Component {
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
            <Link className="nav-link" to="/dashboard">
              <button className="btn">
                <i className="fas fa-shopping-bag"> Your order</i>
              </button>
            </Link>
            <Link className="nav-link" to="/login">
              <button className="btn">
                <i className="fas fa-user-shield"> Login</i>
              </button>
            </Link>
          </ul>
        </div>
      </nav>
    );
  }
}

export default SiteHeader;
