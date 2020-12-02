import React from 'react'
import './App.css';
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import Userinput from './components/userinput'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import CreateNewOrder from './components/createOrderButton'
import NewOrderForm from './components/newOrderForm'
import Dashboard from './components/pages/Dashboard'
import Login from './components/pages/Login'
import Home from './components/pages/Home'
import Register from './components/pages/Register'
import showPendingOrders from './components/pages/createdorders/showPendingOrders'
import createdorder from './components/pages/createdorders/createdorder'

class App extends React.Component{

  render() {
    return (
      <div>
          <Router>
        <Switch>
        <GuestRoute path="/users/register" component={Register} />
            <GuestRoute path="/users/login" component={Login} />
          <ProtectedRoute path="/users/dashboard" component={CreateNewOrder} />
          <ProtectedRoute path="/users/newOrder" component= {NewOrderForm} />
          <ProtectedRoute path="/users/allOrder/:_id" component= {createdorder} />
          <ProtectedRoute path="/users/allOrder" component= {showPendingOrders} />
          
        </Switch>
      </Router>
      </div>
    
    )
  }

}

export default App;
