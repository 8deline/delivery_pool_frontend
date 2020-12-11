import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withCookies } from "react-cookie";
import "./ordersCreated.scss";

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
        <h1 className="orders-created-heading">Orders Created</h1>
        <div className="ordersCreated row">
          {this.state.ordersCreated.length > 0 ? (
            this.state.ordersCreated.map((item) => {
              return (
                <div className="col-sm-4" key={item._id}>
                  <div className="card">
                    <div className="card-body">
                      <div className="restaurant">
                        <strong>{item.restaurant}</strong>
                      </div>
                      <div className="created-by-user">
                        <strong>Created by:</strong> <i>{item.userid}</i>
                      </div>
                      <div className="delivery-fee">
                        <strong>Delivery fee:</strong>{" "}
                        <i>${item.deliveryFee}</i>
                      </div>
                      <div className="no-of-pax">
                        <strong>No. of pax:</strong>{" "}
                        <i>{item.usersjoined.length + 1} (currently)</i>
                      </div>
                      <div className="meetupPoint">
                        <strong>*MeetUp Point*</strong> <br />
                        {item.meetupPoint}
                      </div>
                      <div className="time">
                        <i className="fas fa-clock"></i>
                        <span> {item.deliveryTimeEst} min</span>
                      </div>
                      <Link
                        to={{
                          pathname: `/users/allOrder/${item._id}`,
                          state: { ordersCreated: item },
                        }}
                      >
                        <div className="edit-btn">
                          <button className="btn">Edit Your Order</button>
                        </div>
                      </Link>
                    </div>
                  </div>
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
