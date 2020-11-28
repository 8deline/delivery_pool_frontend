import React from 'react'
import './App.css';
import Userinput from './components/userinput'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import CreateNewOrder from './components/createOrderButton'
import NewOrderForm from './components/newOrderForm'

class App extends React.Component{

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/users/dashboard' component={CreateNewOrder} />
          <Route path='/users/newOrder' component= {NewOrderForm} />
        </Switch>
      </Router>
    )
  }

}

export default App;
