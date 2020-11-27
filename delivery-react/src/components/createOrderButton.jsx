import React from 'react'
import axios from 'axios'

class CreateOrderButton extends React.Component{
    
    handleClick(e){
        axios.get('')
        
    }
    
    render(){
        return (
            <button type="button" onClick= {e=>{this.handleClick(e)}} class="btn btn-outline-secondary">Creat a new order</button>
        )
    }
}