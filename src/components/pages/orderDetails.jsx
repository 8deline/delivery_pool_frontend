import React from "react";
import axios from "axios";
import { withCookies } from "react-cookie";
import { withRouter, Redirect, Link } from "react-router-dom";

class orderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
    };
  }

  isAuthenticated() {
    const token = this.props.cookies.get("token");

    if (!token || token === "undefined" || token === "null") {
      return false;
    }

    return true;
  }

  componentDidMount() {
    this.getOrderDetails();
  }

  getOrderDetails() {
    axios
      .get(`http://localhost:5000/api/v1/orders/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          order: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {this.isAuthenticated() ? (
          <div>
            {this.state.order ? (
              <div>
                <div>{this.state.order.deliveryFee}</div>
                <div>{this.state.order.meetupPoint}</div>
                <Link to="/users/dashboard">
                  <button className="btn btn-dark">Back</button>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <Redirect to="/users/login" />
        )}
      </div>
    );
  }
}

export default withCookies(withRouter(orderDetails));
