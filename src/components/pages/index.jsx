import React from "react";
import axios from "axios";
import qs from "qs";
import { Link } from "react-router-dom";
import { withCookies } from "react-cookie";
// import Service from "../../services/delivery_pool";
import "./index.scss";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      location: "",
    };
  }

  isAuthenticated() {
    const token = this.props.cookies.get("token");

    if (!token || token === "undefined" || token === "null") {
      return false;
    }

    return true;
  }

  handleSubmit(e) {
    // e.preventDefault();
    axios
      .post(
        "https://git.heroku.com/delivery-pool-backend.git/api/v1/location",
        qs.stringify({
          address: this.state.address,
        })
      )
      .then((response) => {
        this.setState({
          location: response.data,
        });
        const element = document.querySelector(".home-page-second-section");
        window.scrollBy(0, element.offsetTop);
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

  // componentDidMount() {
  //   this.getLocation();
  // }

  // getLocation() {
  //   axios
  //     .then((response) => {
  //       this.setState({
  //         location: response.data,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  render() {
    return (
      <div className="index-page">
        <div
          className="home-page-first-section"
          style={{ backgroundImage: "url(/img/home-page-background.jpg)" }}
        >
          <div className="container">
            <div className="img-overlay">
              <p className="home-page-first-para">Hello there!</p>
              <p className="home-page-second-para">
                Let's explore who is <br />
                ordering food <br />
                near you!
              </p>
              <div>
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
              </div>
            </div>
          </div>
        </div>
        {this.state.location !== "" ? (
          <div className="home-page-second-section" id="home">
            <div className="container heading">
              <h1>Someone Near you</h1>
            </div>
            <div className="container">
              <div className="row">
                {this.state.location.length > 0 ? (
                  this.state.location.map((item) => {
                    return (
                      <div className="col-4" key={item._id}>
                        <div className="users-near-you">
                          <div className="restaurant">{item.restaurant}</div>
                          <div>
                            Total: <strong>${item.deliveryFee}</strong>
                            <span className="delivery-fee"> delivery fee</span>
                          </div>
                          <div>
                            No. of pax:
                            <strong> {item.usersjoined.length}</strong>
                          </div>
                          <span className="dis">
                            <i className="fas fa-people-arrows"></i>
                            <span> {Math.floor(item.dis)} m </span>
                          </span>
                          <span className="time">
                            <i className="fas fa-clock"></i>
                            <span> {item.deliveryTimeEst} min</span>
                          </span>
                          {this.isAuthenticated() ? (
                            <Link
                              to={{
                                pathname: `/orders/${item._id}`,
                                state: {
                                  location: item,
                                },
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
                          ) : (
                            <Link to="/users/login">
                              <div className="lets-join-btn">
                                <button className="btn btn-primary">
                                  <i className="fas fa-info-circle">
                                    {" "}
                                    See Order Details
                                  </i>
                                </button>
                              </div>
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>Cannot be found</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withCookies(Index);
