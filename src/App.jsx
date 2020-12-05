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
// import OrderDetails from "./components/pages/orderDetails";
import OrdersJoined from "./components/pages/ordersJoined";
import OrdersCreated from "./components/pages/ordersCreated";
import createdorder from "./components/pages/createdorders/createdorder";
import joinedorderform from "./components/pages/joinedorders/joinorderform";
import editjoinedorderform from "./components/pages/joinedorders/editjoinorder";
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
            {/* <Route path="/orders/:id" component={OrderDetails} /> */}
            <Route
              path="/users/dashboard/ordersJoined"
              component={OrdersJoined}
            />
            <Route
              path="/users/dashboard/ordersCreated"
              component={OrdersCreated}
            />
            <ProtectedRoute
              path="/users/allOrder/:_id"
              component={createdorder}
            />
            <ProtectedRoute
              path="/orders/joinorder/edit/:_id"
              component={editjoinedorderform}
            />
            <ProtectedRoute
              path="/orders/joinorder/:_id"
              component={joinedorderform}
            />

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
