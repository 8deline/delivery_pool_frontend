import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import 'bootstrap/scss/bootstrap.scss'
import './App.scss';
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import Dashboard from './components/pages/Dashboard'
import Login from './components/pages/Login'
import Home from './components/pages/Home'
import Register from './components/pages/Register'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <SiteHeader />
          <Switch>
            <GuestRoute path="/users/register" component={Register} />
            <GuestRoute path="/users/login" component={Login} />
            <ProtectedRoute path="/users/dashboard" component={Dashboard} />
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <SiteFooter />
        </Router>
      </div>
    );
  }
}

export default App;
