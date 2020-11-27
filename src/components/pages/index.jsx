import React from "react";
import Service from "../../services/delivery_pool";

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
      <div>
        <p>hhohohoho</p>
      </div>
    );
  }
}

export default Index;
