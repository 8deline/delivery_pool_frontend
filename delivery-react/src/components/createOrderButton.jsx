import React from 'react'
import axios from 'axios'
import {link} from 'react-router-dom'

class CreateOrderButton extends React.Component{

    constructor(props){
        super(props)
        this.state = {address: ''}
    }
    
    handleClick(e){
        axios.get('http://localhost:5000/api/v1/users/neworder')
        .then(response=>{
            //console.log(response.data.address)
            this.setState({address: response.data.address})
        })
        .catch(err=>{console.log(err)})
        

    }
    
    render(){
        return (
           <button type="button" onClick= {e=>{this.handleClick(e)}} class="btn btn-outline-secondary">Creat a new order</button> 
        )
    }
}

export default CreateOrderButton