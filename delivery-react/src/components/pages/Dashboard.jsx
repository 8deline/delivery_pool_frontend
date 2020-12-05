import React from "react";
import axios from "axios";
import qs from "qs";
import { Link } from "react-router-dom";
import { withCookies } from "react-cookie";
// import "./Dashboard.scss";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      location: "",
      ordersCreated: "",
      ordersJoined: "",
    };
  }

  componentDidMount() {
    this.getLocationNearUser();
    this.getOrdersCreated();
    this.getOrdersJoined();
  }

  getLocationNearUser() {
    axios
      .get("http://localhost:5000/api/v1/orders-location", {
        headers: {
          auth_token: this.props.cookies.get("token"),
        },
      })
      .then((response) => {
        this.setState({
          location: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
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

  getOrdersJoined() {
    axios
      .get("http://localhost:5000/api/v1/orders-joined", {
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

  userFound(users) {
    let found = users.find((eachUser) => {
      return eachUser === this.getCurrentUser().user_id;
    });
    return found;
    // let found = false;
    // users.find((eachUser) => {
    //   if (eachUser === this.getCurrentUser().user_id) {
    //     return (found = true);
    //   }
    // });
    // return found;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  handleSubmit(e) {
    // e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/v1/orders-location",
        qs.stringify({
          address: this.state.address,
        }),
        {
          headers: {
            auth_token: this.props.cookies.get("token"),
          },
        }
      )
      .then((response) => {
        this.setState({
          location: response.data,
        });
        // const element = document.querySelector(".home-page-second-section");
        // window.scrollBy(0, element.offsetTop);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="page-dashboard">
        <div className="container">
          <p className="welcome-message">
            Welcome{" "}
            {this.getCurrentUser().first_name +
              " " +
              this.getCurrentUser().last_name}
          </p>
          {/* <button class="btn btn-dark" type="submit">
            <i className="fa fa-search"></i>
          </button> */}
          <form className="form-inline my-2 my-lg-0 home-page-form">
            <input
              className="form-control location-input"
              type="text"
              placeholder="Enter your location"
              name="address"
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
            <div
              onClick={(e) => {
                this.handleSubmit(e);
              }}
              className="btn btn-outline-success my-2 my-sm-0 search-btn"
            >
              Search
            </div>
          </form>
          {this.state.location !== "" ? (
            <div className="location-near-you">
              <div className="container">
                {this.state.location.length > 0 ? (
                  <h1>Someone Near You</h1>
                ) : (
                  ""
                )}
                <div className="row">
                  {this.state.location.length > 0 ? (
                    this.state.location.map((item) => {
                      return (
                        <div className="col-4" key={item._id}>
                          {this.userFound(item.usersjoined) ? (
                            <div> joined</div>
                          ) : (
                            <div>not joined</div>
                          )}

                          <div className="restaurant">{item.restaurant}</div>
                          <div>Created by: {item.userid}</div>
                          <div>
                            Total: <strong>${item.deliveryFee}</strong>
                            <span className="delivery-fee"> delivery fee</span>
                          </div>
                          <div>
                            No. of pax:
                            <strong>
                              {" "}
                              {item.usersjoined.length + 1} (currently)
                            </strong>
                          </div>
                          <span className="dis">
                            <i className="fas fa-people-arrows"></i>
                            <span> {Math.floor(item.dis)} m </span>
                          </span>
                          <span className="time">
                            <i className="fas fa-clock"></i>
                            <span> {item.deliveryTimeEst} min</span>
                          </span>
                          <Link
                            to={{
                              pathname: `/orders/${item._id}`,
                            }}
                          >
                            <div className="lets-join-btn">
                              <button className="btn btn-primary">
                                <i className="fas fa-info-circle">
                                  {" "}
                                  See Order Details
                                </i>
                              </button>
                            </div>
                          </Link>
                        </div>
                      );
                    })
                  ) : (
                    <div>Sorry. No one is ordering near you</div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="container">
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
                      <strong>
                        {" "}
                        {item.usersjoined.length + 1} (currently)
                      </strong>
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
                          <i className="fas fa-info-circle">
                            {" "}
                            See Order Details
                          </i>
                        </button>
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div>You have not created any orders</div>
            )}
          </div>
        </div>
        <div className="container">
          <h1>Orders Joined</h1>
          <div className="row">
            {this.state.ordersJoined.length > 0 ? (
              this.state.ordersJoined.map((item) => {
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
                      <strong>
                        {" "}
                        {item.usersjoined.length + 1} (currently)
                      </strong>
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
                          <i className="fas fa-info-circle">
                            {" "}
                            See Order Details
                          </i>
                        </button>
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div>You have not joined any orders</div>
            )}
          </div>
        </div>
        <div>
          <p>Could not find your desired orders?</p>
          <Link to="/users/newOrder">Create your own</Link>
        </div>
      </div>
    );
  }
}

export default withCookies(Dashboard);