import React from "react";
import axios from "axios";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import qs from "qs";
import "./createdorder.scss";

class CreatedOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { order: "", orderitem: "" };
  }

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.ordersCreated) {
      const currentprop = this.props.location.state.ordersCreated;
      this.setState({
        order: currentprop,
        orderitem: currentprop.orderDetails[0].food,
      });
      //   console.log(this.props);
      console.log(this.state.order);
      return;
      // console.log(this.props.location);
      // console.log("working");
    }
    // console.log(this.props.location.state.ordersCreated);
    // console.log("fail");
    // console.log(this.props.location)
    // console.log(this.state.order)
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post(
        `http://localhost:5000/api/v1/users/orderscreated/${this.state.order._id}`,
        qs.stringify(this.state),
        {
          headers: {
            auth_token: this.props.cookies.get("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        this.props.history.push("/users/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(e) {
    //  console.log(this.props.match.params)
    this.setState({ orderitem: e.target.value });
  }

  render() {
    // console.log(this.state.order.orderDetails)
    return (
      <div>
        {!this.state.order ? (
          ""
        ) : (
          <div className="createdorder-page">
          <div className="createdorder container">
            <h2>Edit your created order</h2>
            <p>Restaurant: {this.state.order.restaurant}</p>
            <p>Delivery time (mins): {this.state.order.deliveryTimeEst}</p>
            <p>Delivery fee ($): {this.state.order.deliveryFee}</p>
            <p>Meetup Point: {this.state.order.meetupPoint}</p>
            {this.state.order.orderDetails.map((eachorder) => {
              return this.state.order.userid ===
                eachorder[Object.keys(eachorder)[2]] ? (
                <form
                  onSubmit={(e) => {
                    this.handleSubmit(e);
                  }}
                >
                  <div class="form-group">
                    <label for="order">
                      {eachorder[Object.keys(eachorder)[2]]}
                    </label>
                    <textarea
                      rows="3"
                      class="form-control"
                      id="order"
                      style={{ whiteSpace: "pre-wrap" }}
                      value={this.state.orderitem}
                      name="food"
                      onChange={(e) => {
                        this.handleChange(e);
                      }}
                    />
                  </div>
                  <button type="submit" class="btn btn-outline-success">
                    Edit
                  </button>
                </form>
              ) : (
                <p>
                  {eachorder[Object.keys(eachorder)[2]]}:{" "}
                  {eachorder[Object.keys(eachorder)[0]]}
                </p>
              );
            })}
          </div>
          </div>
        )}
      </div>
    )
  }
}
export default withRouter(withCookies(CreatedOrder));
