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
//import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      location: "",
    };
  }

  async componentDidMount() {
    await this.getLocationNearUser();
  }

  getLocationNearUser() {
    axios
      .get("https://git.heroku.com/delivery-pool-backend.git/api/v1/orders-location", {
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
        "https://git.heroku.com/delivery-pool-backend.git/api/v1/orders-location",
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
        const element = document.querySelector(".someone-near-you");
        window.scrollTo(0, element.offsetTop);
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

{/* <GooglePlacesAutocomplete apiKey= ${process.env.API_KEY} className="form-control location-input" classNamePrefix="form-control location-input"  autocompletionRequest={{
                  bounds: [
                    { lat: 50, lng: 50 },
                    { lat: 100, lng: 100 }
                  ],
                  componentRestrictions: {
                  country: ['sg'],
                  }
                 
                }} selectProps= {{value:{ label: "Enter your location", value: "One"}, onChange: (e) => {this.handleAddressChange(e)}}} />  */}

          <ul
            className="nav nav-pills mb-3 justify-content-center"
            id="pills-tab"
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                id="pills-orders-created-tab"
                data-toggle="pill"
                href="#pills-orders-created"
              >
                Orders Created
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="pills-orders-joined-tab"
                data-toggle="pill"
                href="#pills-orders-joined"
              >
                Orders Joined
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0 dashboard-form">
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

          <div className="tab-content orders-wrapper" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-orders-created"
            >
              <OrdersCreated />
            </div>
            <div
              className="tab-pane fade"
              id="pills-orders-joined"
              role="tabpanel"
            >
              <OrdersJoined />
            </div>
          </div>

          {/* <div className="location-near-you">
            <div>
              <h1>Someone Near You</h1>

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
          </div> */}
          <div className="someone-near-you">
            <h1 className="someone-near-you-heading">Someone Near You</h1>
            {this.state.location.length > 0 ? (
              <Swiper
                spaceBetween={10}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {this.state.location.map((item) => {
                  return (
                    <SwiperSlide key={item._id} className="slide">
                      <div className="card">
                        <div className="slide-content card-body">
                          <div className="restaurant">
                            <strong>{item.restaurant}</strong>
                          </div>
                          <div className="created-by-user">
                            <strong>Created by:</strong> <i>{item.userid}</i>
                          </div>
                          <div className="delivery-fee">
                            <strong>Delivery fee: </strong>{" "}
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
                              <button className="btn">Join the Order</button>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <div className="col-12">
                Sorry. No one is ordering near you based on your
                default_location or search_location
              </div>
            )}
          </div>

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
