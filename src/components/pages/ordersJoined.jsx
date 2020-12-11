import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withCookies } from "react-cookie";
import "./ordersJoined.scss";

class ordersJoined extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ordersJoined: "",
    };
  }

  componentDidMount() {
    this.getOrdersJoined();
  }

  getOrdersJoined() {
    axios
      .get("https://git.heroku.com/delivery-pool-backend.git/api/v1/orders-joined", {
        headers: {
          auth_token: this.props.cookies.get("token"),
        },
      })
      .then((response) => {
        this.setState({
          ordersJoined: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="orders-joined-section">
        <h1 className="orders-joined-section-heading">Orders Joined</h1>
        <div className="row">
          {this.state.ordersJoined.length > 0 ? (
            this.state.ordersJoined.map((item) => {
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
                        <strong>Delivery fee: </strong>
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
                          pathname: `/orders/joinorder/edit/${item._id}`,
                          state: {
                            ordersJoined: item,
                          },
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
            <div className="col-12">You have not joined any orders</div>
          )}
        </div>
      </div>
    );
  }
}

export default withCookies(ordersJoined);
