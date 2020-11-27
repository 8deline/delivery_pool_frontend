import React from "react";
import "./SiteHeader.scss";
import { Link } from "react-router-dom";

class SiteHeader extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <div>
            <Link className="navbar-brand" to="/">
              Delivery Pool
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <button className="btn">
                    <i className="fas fa-shopping-bag"> Your Order</i>
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/baked-goods">
                  <button className="btn">
                    <i className="fas fa-user-shield"> Login</i>
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default SiteHeader;
