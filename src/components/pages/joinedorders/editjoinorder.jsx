import React from "react";
import axios from "axios";
import qs from "qs";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import "./editjoinorder.scss";
class EditJoinOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orderdetails: "", orderitem: "", test: "" };
  }

  async componentDidMount() {
    //to get the orderid - this .props.location.state would obtain the order details from the
    //previous pg

    //the current form should populate the order details
    //the order item field should be populated with the current users' order item
    //

    // console.log(this.props.location.state);
    // console.log(this.props.location.state.ordersJoined);
    // console.log(this.props.location.state.ordersJoined._id);
    if (this.props.location.state && this.props.location.state.ordersJoined) {
      const currentprop = this.props.location.state.ordersJoined;

      await this.setState({
        orderdetails: currentprop,
      });

      axios
        .get(
          `https://delivery-pool-backend.herokuapp.com/api/v1/users/joinorder/${this.state.orderdetails._id}`,
          {
            headers: {
              auth_token: this.props.cookies.get("token"),
            },
          }
        )
        .then((result) => {
          console.log("success");
          this.setState({ orderitem: result.data.orderDetails[0].food[0] });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // if (this.props.location.state && this.props.location.state.ordersJoined) {
    //   this.setState({ orderdetails: this.props.location.state.ordersJoined });
    //   // const indexCurrentUser = this.state.orderdetails.orderDetails.findIndex(orderdetail=>{
    //   //     orderdetail.orderUserId===
    //   console.log(this.state.orderdetails);
    //       axios
    //         .get(
    //           `http://localhost:5000/api/v1/users/joinorder/${this.state.orderdetails._id}`,
    //           {
    //             headers: {
    //               auth_token: this.props.cookies.get("token"),
    //             },
    //           }
    //         )
    //         .then((result) => {
    //           //   console.log('success')
    //           console.log(result.data.orderDetails[0].food[0]);
    //           //   this.setState({ orderitem: result.data.orderDetails[0].food[0] });
    //         })
    //         .catch((err) => console.log("databasefail"));
    //     }
    //     return;
  }

  // getCurrentUser() {
  //     return JSON.parse(localStorage.getItem("user"));
  //   }

  handleSubmit(e) {
    e.preventDefault();
    console.log("test");
    console.log(this.state.orderdetails._id);
    axios
      .post(
        `https://delivery-pool-backend.herokuapp.com/api/v1/users/editjoinorder/${this.state.orderdetails._id}`,
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
    console.log(this.state.orderitem);
  }

  render() {
    return (
      <div>
        {this.state.orderdetails ? (
          <div className = "editjoinorder-page">
            <div class ="editjoinorder container">
              <h2> Edit Joined Order</h2>
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

export default withRouter(withCookies(EditJoinOrder));
