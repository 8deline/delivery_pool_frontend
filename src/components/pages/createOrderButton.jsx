import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {withCookies} from 'react-cookie'

class CreateOrderButton extends React.Component{

    constructor(props){
        super(props)
        this.state = {address: ''}
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/v1/users/neworder', { headers: { auth_token: this.props.cookies.get("token") } })
        .then(response=>{
            //console.log(response.data.address)
            this.setState({address: response.data.default_address})
            
        })
        .catch(err=>{console.log(err)})
    }
    
    
    render(){
        return (
            <div>
                
           <Link to={{pathname:"/users/newOrder", state:{address:this.state.address}}}><button type="button" className="btn btn-outline-secondary">Creat a new order</button></Link>
           
            </div>
           
        )
    }
}

export default withCookies(CreateOrderButton)