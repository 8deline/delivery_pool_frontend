import React from "react";
import SiteHeader from "./components/SiteHeader/SiteHeader";
import Index from "./components/pages/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import NewOrderForm from "./components/pages/newOrderForm";
import OrderDetails from "./components/pages/orderDetails";
import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <SiteHeader />
          <Switch>
            <GuestRoute path="/users/register" component={Register} />
            <GuestRoute path="/users/login" component={Login} />
            <Route path="/orders/:id" component={OrderDetails} />
            <ProtectedRoute path="/users/dashboard" component={Dashboard} />
            <ProtectedRoute path="/users/newOrder" component={NewOrderForm} />
            <Route path="/" component={Index} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
