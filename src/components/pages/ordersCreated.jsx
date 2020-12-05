import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withCookies } from "react-cookie";

class ordersCreated extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersCreated: "",
    };
  }
  componentDidMount() {
    this.getOrdersCreated();
  }

  getOrdersCreated() {
    axios
      .get("http://localhost:5000/api/v1/orders-created", {
        headers: {
          auth_token: this.props.cookies.get("token"),
        },
      })
      .then((response) => {
        this.setState({
          ordersCreated: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="orders-created-section">
        <h1>Orders Created</h1>
        <div className="ordersCreated row">
          {this.state.ordersCreated.length > 0 ? (
            this.state.ordersCreated.map((item) => {
              return (
                <div className="col-4" key={item._id}>
                  <div className="restaurant">{item.restaurant}</div>
                  <div>Created by: {item.userid}</div>
                  <div>
                    Total: <strong>${item.deliveryFee}</strong>
                    <span className="delivery-fee"> delivery fee</span>
                  </div>
                  <div>
                    No. of pax:
                    <strong> {item.usersjoined.length + 1} (currently)</strong>
                  </div>
                  <span className="meetupPoint">
                    <span> MeetUp Point: {item.meetupPoint} </span>
                  </span>
                  <div className="time">
                    <i className="fas fa-clock"></i>
                    <span> {item.deliveryTimeEst} min</span>
                  </div>
                  <Link
                    to={{
                      pathname: `/orders/${item._id}`,
                    }}
                  >
                    <div className="lets-join-btn">
                      <button className="btn btn-primary">
                        <i className="fas fa-info-circle"> See Order Details</i>
                      </button>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="col-12">You have not created any orders</div>
          )}
        </div>
      </div>
    );
  }
}

export default withCookies(ordersCreated);
