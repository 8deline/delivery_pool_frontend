import React from "react";
import { Link } from "react-router-dom";

class DashboardHeader extends React.Component {
  render() {
    return (
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item">
          <Link
            className="nav-link active"
            data-toggle="pill"
            to="/users/dashboard/ordersCreated"
          >
            Orders Created By You
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            data-toggle="pill"
            to="/users/dashboard/ordersJoined"
          >
            Orders Joined By You
          </Link>
        </li>
      </ul>
    );
  }
}

export default DashboardHeader;
