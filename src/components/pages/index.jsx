import React from "react";
import Service from "../../services/delivery_pool";
import "./index.scss";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    Service.location()
      .then((response) => {
        this.setState({
          location: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div
        className="home-page"
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
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0 search-btn"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
