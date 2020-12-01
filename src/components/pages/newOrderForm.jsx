import React from "react";
import axios from "axios";
import { withCookies } from "react-cookie";
import qs from "qs";

class NewOrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetupPoint: "",
      restaurant: "",
      estDeliveryTime: "",
      estDeliveryFee: "",
      order: "",
      error: "",
    };
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/v1/users/neworder/create",
        qs.stringify({
          meetupPoint: this.state.meetupPoint,
          restaurant: this.state.restaurant,
          estDeliveryTime: this.state.estDeliveryTime,
          estDeliveryFee: this.state.estDeliveryFee,
          order: this.state.order,
        }),
        {
          headers: {
            auth_token: this.props.cookies.get("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        this.setState({
          meetupPoint: "",
          restaurant: "",
          estDeliveryTime: "",
          estDeliveryFee: "",
          order: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div>
          <form
            onSubmit={(e) => {
              this.handleSubmit(e);
            }}
          >
            <div className="form-group">
              <label htmlFor="restaurant">Restaurant (required)</label>
              <input
                type="text"
                className="form-control"
                id="restaurant"
                name="restaurant"
                value={this.state.restaurant}
                aria-describedby="restaurant"
                required
                onChange={(e) => {
                  this.handleChange(e);
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="estDeliveryTime">
                Estimated delivery time (mins) (required)
              </label>
              <input
                type="number"
                step="1"
                className="form-control"
                id="estDeliveryTime"
                name="estDeliveryTime"
                value={this.state.estDeliveryTime}
                aria-describedby="estDeliveryTime"
                onChange={(e) => {
                  this.handleChange(e);
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="estDeliveryFee">
                Estimated delivery fee (required){" "}
              </label>
              <input
                type="number"
                step=".01"
                className="form-control"
                id="estDeliveryFee"
                name="estDeliveryFee"
                value={this.state.estDeliveryFee}
                aria-describedby="estDeliveryFee"
                onChange={(e) => {
                  this.handleChange(e);
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="meetupPoint">Meetup Point (required)</label>
              <input
                type="text"
                className="form-control"
                id="meetupPoint"
                name="meetupPoint"
                value={this.state.meetupPoint}
                aria-describedby="meetupPoint"
                onChange={(e) => {
                  this.handleChange(e);
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="order">Your order (required)</label>
              <textarea
                className="form-control"
                id="order"
                rows="4"
                name="order"
                value={this.state.order}
                onChange={(e) => {
                  this.handleChange(e);
                }}
                aria-describedby="order"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withCookies(NewOrderForm);
