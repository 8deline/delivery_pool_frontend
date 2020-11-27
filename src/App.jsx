import React from "react";
import SiteHeader from "./components/SiteHeader/SiteHeader";
import Index from "./components/pages/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <SiteHeader />
          <Switch>
            <Route path="/" component={Index} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
