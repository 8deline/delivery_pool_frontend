import React from "react";
import axios from "axios";
import qs from "qs";
import { Link } from "react-router-dom";
import { withCookies } from "react-cookie";
import "./Dashboard.scss";
// import DashboardHeader from "./DashboradHeader";
import OrdersCreated from "./ordersCreated";
import OrdersJoined from "./ordersJoined";
import CreateOrderButton from "./createOrderButton"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      location: "",
    };
  }

  componentDidMount() {
    this.getLocationNearUser();
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

    /* {this.userFound(item.usersjoined) ? (
                            <div> joined</div>
                          ) : (
                            <div>not joined</div>
                          )} */
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

  handleAddressChange(e) {
    console.log(e.label)
    console.log(e.value)
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

          {/* <DashboardHeader /> */}

          {/* <Link to="/users/dashboard/ordersJoined" />
          <Link to={"/users/dashboard/ordersCreated"} /> */}
          {/* <Route path="/orders/:id" component={OrderDetails} /> */}

          
          <OrdersCreated />
          <OrdersJoined />
          {this.state.location !== "" ? (
            <div className="location-near-you">
              <div>
                <h1>Someone Near You</h1>
                <form className="form-inline my-2 my-lg-0 home-page-form">
                  {/* <input
                    className="form-control location-input"
                    type="text"
                    placeholder="Enter your location"
                    name="address"
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                  /> */}

<GooglePlacesAutocomplete apiKey= 'AIzaSyBkcQ2JKuV_kxI9zBn-yHYzLV_50OJ6oms' className="form-control location-input" style={{width: "300px"}} autocompletionRequest={{
                  bounds: [
                    { lat: 50, lng: 50 },
                    { lat: 100, lng: 100 }
                  ],
                  componentRestrictions: {
                  country: ['sg'],
                  }
                 
                }} selectProps= {{value:{ label: "Enter your location", value: "One"}, onChange: (e) => {this.handleAddressChange(e)}}} /> 

                  <div
                    onClick={(e) => {
                      this.handleSubmit(e);
                    }}
                    className="btn btn-outline-success my-2 my-sm-0 search-btn"
                  >
                    Search
                  </div>
                </form>
                <div className="row">
                  {this.state.location.length > 0 ? (
                    this.state.location.map((item) => {
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
                              pathname: `/orders/joinorder/${item._id}`,
                              state: {
                                location: item,
                              },
                            }}
                          >
                            <div className="lets-join-btn">
                              <button className="btn btn-primary">
                                <i className="fas fa-info-circle">
                                  {" "}
                                  Join the Orders
                                </i>
                              </button>
                            </div>
                          </Link>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-12">
                      Sorry. No one is ordering near you based on your
                      default_location or search_location
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="create-order-section">
            <h1>Could not find your desired orders?</h1>
            < CreateOrderButton />
            {/* <Link to="/users/newOrder">Create your own</Link> */}
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(Dashboard);
