import React from "react";
import SiteHeader from "./components/SiteHeader/SiteHeader";
import Index from "./components/pages/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Form from "./components/pages/Form";

import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <SiteHeader />
          <Switch>
            <Route path="/form" component={Form} />
            <Route path="/" component={Index} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
