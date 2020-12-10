import React from "react";
import axios from "axios";
import { withCookies } from "react-cookie";
import qs from "qs";
import { withRouter } from "react-router";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import "./newOrderForm.scss";


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

  componentDidMount(){
        
    if (this.props.location.state && this.props.location.state.address) {
        this.setState({
            meetupPoint: this.props.location.state.address
        })
        return
    }
    
     } 


    // handleAddressChange = (meetupPoint, { action }) => {
    //   console.log(meetupPoint, action);
    //   switch (action) {
    //     case 'input-change':
    //       this.setState({ meetupPoint });
    //       return;
    //     case 'menu-close':
    //       console.log(this.state.meetupPoint);
    //       let menuIsOpen = undefined;
    //       if (this.state.meetupPoint) {
    //         menuIsOpen = true;
    //       }
    //       this.setState({
    //         menuIsOpen
    //       });
    //       return;
    //     default:
    //       return;
    //   }
    // }

    handleAddressChange(e) {
      this.setState({meetupPoint: e.label})
    }


  handleChange(e) {
    // e.preventDefault();
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
        // console.log(response);
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
    const { meetupPoint} = this.state.meetupPoint 
    return (
      <div className="neworderform-page">

      <div className="neworderform container">
          <form
            onSubmit={(e) => {
              this.handleSubmit(e);
            }}
          >
            <h2>Create your own Order</h2>
            <div className="form-group">
              <label htmlFor="restaurant">Restaurant Name *</label>
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
                Estimated Delivery Time (mins) *
              </label>
              <input
                type="number"
                min="5"
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
                Estimated Delivery Fee ($) *{" "}
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
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
              <label htmlFor="meetupPoint">Meetup Point *</label>
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
                        
 {/* <GooglePlacesAutocomplete apiKey= {process.env.API_KEY} autocompletionRequest={{
                  bounds: [
                    { lat: 50, lng: 50 },
                    { lat: 100, lng: 100 }
                  ],
                  componentRestrictions: {
                  country: ['sg'],
                  }
                 
                }} selectProps= {{value: {label: this.state.meetupPoint, value: this.state.meetupPoint}, onChange: (e=> this.handleAddressChange(e))}} />  */}
  
            </div>

            <div className="form-group">
              <label htmlFor="order">Your Order *</label>
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
            <p>* marked fields are mandatory</p>
            <button type="submit" className="btn btn-outline-success">
              Submit
            </button>
            
          </form>
        </div>
      </div>

    );
  }
}

export default withRouter(withCookies(NewOrderForm));
