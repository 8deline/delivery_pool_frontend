import React from 'react'
import Ajv from 'ajv'
import contactFormValidationSchema from '../../validation-schemas/contact-form'
import biscoffService from '../../services/biscoff'

const ajv = new Ajv()

class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            message: '',
            formMsg: []
        }
    }

    handleInputChange(e) {
        const state = {}
        state[e.target.name] = e.target.value
        this.setState(state)
    }

    handleFormSubmit(e) {
        e.preventDefault()

        // clear form messages
        this.setState({
            formMsg: []
        })

        // validate form
        const formValid = this.validateFormInputs()

        if (formValid) {
            // send form submission to backend via API
            biscoffService.sendContactForm(this.state.name, this.state.email, this.state.message)
                .then(response => {
                    // clear form input
                    this.setState({
                        name: '',
                        email: '',
                        message: ''
                    })
                    console.log(response.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    validateFormInputs() {
        const err = []

        const formValid = ajv.validate(contactFormValidationSchema, this.state)

        if (!formValid) {
            ajv.errors.forEach(e => {
                let field = e.dataPath.toUpperCase()
                err.push(`${field} field ${e.message}`)
            })
        }

        // if (this.state.name === "") {
        //     err.push('Name must not be empty')
        // }
        // if (this.state.email === "") {
        //     err.push('Email must not be empty')
        // }
        // if (this.state.message === "") {
        //     err.push('Message must not be empty')
        // }

        if (err.length === 0) {
            return true
        }

        this.setState({
            formMsg: err
        })

        return false
    }

    render() {
        return(
            <div id="page-contact" className="page-2-cols">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <section className="col-bg" style={ {backgroundImage: 'url(/img/pexels-daria-obymaha-1684151.png)'} }></section>
                        </div>
                        <div className="col-12 col-lg-6">
                            <section className="col-content">
                                <div className="page-heading">
                                    <h1>Contact</h1>
                                    <hr/>
                                </div>
                                
                                <form onSubmit={e => { this.handleFormSubmit(e) }}>
                                    {
                                        this.state.formMsg.length > 0 ?
                                        (
                                            <ul className="form-messages text-left">
                                                {
                                                    this.state.formMsg.map(msg => {
                                                        return (
                                                            <li>{msg}</li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        ) :
                                        ''
                                    }
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control form-control-lg" id="name" name="name" value={this.state.name} onChange={e => {this.handleInputChange(e)}} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control form-control-lg" id="email" name="email" value={this.state.email} onChange={e => {this.handleInputChange(e)}} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea className="form-control form-control-lg" id="message" name="message" value={this.state.message} onChange={e => {this.handleInputChange(e)}}></textarea>
                                    </div>
                                    <div className="form-group text-center">
                                        <button type="submit" className="btn btn-light">Send</button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contact
