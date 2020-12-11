import React from "react";
import axios from "axios";
import qs from "qs";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import "./joinorderform.scss";


class JoinOrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orderdetails: "", orderitem: "" };
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.location)
      this.setState({ orderdetails: this.props.location.state.location });
    return;
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.orderitem);
    axios
      .post(
        `https://git.heroku.com/delivery-pool-backend.git/api/v1/users/joinorder/${this.state.orderdetails._id}`,
        qs.stringify(this.state),

        { headers: { auth_token: this.props.cookies.get("token") } }
      )
      .then((response) => {
        this.props.history.push("/users/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(e) {
    this.setState({ orderitem: e.target.value });
  }

  render() {
    return (
      <div>
        {this.state.orderdetails ? (
          <div className="joinedorderform-page">
          <div className="joinedorderform container">
            <p>Restaurant: {this.state.orderdetails.restaurant}</p>
            <p>
              Delivery time (mins): {this.state.orderdetails.deliveryTimeEst}
            </p>
            <p>Delivery fee ($): {this.state.orderdetails.deliveryFee}</p>
            <p>Meetup Point: {this.state.orderdetails.meetupPoint}</p>
            <form
              onSubmit={(e) => {
                this.handleSubmit(e);
              }}
            >
              <div class="form-group">
                <label for="order">Your order</label>
                <textarea
                  class="form-control"
                  id="order"
                  name="order"
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                  value={this.state.orderitem}
                />
              </div>
              <button type="submit" class="btn btn-outline-success">
                Add order
              </button>
            </form>
          </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(withCookies(JoinOrderForm));
