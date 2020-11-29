import React from 'react'
import { Link } from 'react-router-dom'
import './SiteHeader.scss'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'


class SiteHeader extends React.Component {
    isAuthenticated() {
        const token = this.props.cookies.get('token')

        if (!token || token === "undefined" || token === "null") {
            return false
        }

        return true
    }
handleLogoutChange() {
    this.props.cookies.remove('token')
}

    render() {
        return (
            <header id="site-header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link to="/" className="navbar-brand">
                             Delivery Pool
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link to="/about" className="nav-link">About</Link>
                                </li> */}

                                {
                            !this.isAuthenticated() ? (
                                <div className="form-group">
                                    <li className="nav-item">
                                     <Link to="/users/register" className="nav-link">Register</Link>
                            </li>
                            <li className="nav-item">
                                     <Link to="/users/login" className="nav-link">Login</Link>
                                 </li>
                                </div>
                            ) : (<div className="form-group">
                            <li className="nav-item">
                                 <Link to="/home" className="nav-link" onClick={ e => { this.handleLogoutChange() }}>Logout</Link>
                             </li>
                        </div>
                            )
                        }
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}


export default withRouter(withCookies(SiteHeader))