import React from 'react'
import moment from 'moment'
import { withCookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'
import biscoffService from '../../services/biscoff'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            formErr: '',
        }
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    handlePasswrdChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleFormSubmission(e) {
        e.preventDefault()

        // make api call to login
        biscoffService.login(this.state.email, this.state.password)
            .then(response => {
                if (!response.data.success) {
                    this.setState({
                        formErr: "Error occurred in form, please check values"
                    })
                    return
                }

                this.props.cookies.set('token', response.data.token, {
                    path: '/',
                    expires: moment.unix(response.data.expiresAt).toDate()
                })

                this.props.history.push('/users/dashboard')
            })
            .catch(err => {
                this.setState({
                    formErr: "Error occurred in form, please check values"
                })
            })
    }

    render() {
        return(
            <div className="page-login">
                <div className="container">
                    <form className="mt-5 mb-5" onSubmit={ e => { this.handleFormSubmission(e) } }>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" onChange={ e => { this.handleEmailChange(e) } } className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" onChange={ e => { this.handlePasswrdChange(e) } } className="form-control" id="exampleInputPassword1" />
                        </div>
                        {
                            this.state.formErr !== "" ? (
                                <div className="form-group">
                                    <p>{ this.state.formErr }</p>
                                </div>
                            ) : (
                                ""
                            )
                        }
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(withCookies(Login))