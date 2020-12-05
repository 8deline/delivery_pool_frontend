import React from 'react'
import axios from 'axios'
import qs from 'qs'
import {withCookies} from 'react-cookie'
import {withRouter} from 'react-router-dom'

class EditJoinOrder extends React.Component {
    constructor(props){
        super(props)
        this.state = {orderdetails: '', orderitem:''}
    }

    componentDidMount(){
        //to get the orderid - this .props.location.state would obtain the order details from the 
        //previous pg

        //the current form should populate the order details
        //the order item field should be populated with the current users' order item
        //
        // if (this.props.location.state && this.props.location.state.location)
    
        // {this.setState({orderdetails: this.props.location.state.location})
        // // const indexCurrentUser = this.state.orderdetails.orderDetails.findIndex(orderdetail=>{
        // //     orderdetail.orderUserId===

        // // }) 

        // return}

        axios.get(`http://localhost:5000/api/v1/users/joinorder/5fc70463c35693032c6592ae`, {headers: {
            'auth_token': this.props.cookies.get('token')
          }})
          .then(result=>{
            //   console.log('success')
            console.log(result.data.orderDetails[0].food[0])
            this.setState({orderitem: result.data.orderDetails[0].food[0]})
          })
          .catch(err=> console.log('databasefail'))
    }

    // getCurrentUser() {
    //     return JSON.parse(localStorage.getItem("user"));
    //   }

    handleSubmit(e){
        e.preventDefault()
        axios.put(`http://localhost:5000/api/v1/users/joinorder/${this.state.orderdetails._id}`, qs.stringify(this.state), 
        
        {headers: {'auth_token': this.props.cookies.get('token')}})
        .then(response=>{
    
            this.props.history.push('/users/dashboard')
        })
        .catch(err=>{console.log(err)})
        
    }


    handleChange(e){
        this.setState({orderitem: e.target.value})
    }

    render(){
        
        return (
            <div>
                 { this.state.orderdetails? 
                 <div>
                    
                <p>Restaurant: {this.state.orderdetails.restaurant}</p>
                <p>Delivery time (mins): {this.state.orderdetails.deliveryTimeEst}</p>
                <p>Delivery fee ($): {this.state.orderdetails.deliveryFee}</p>
                <p>Meetup Point: {this.state.orderdetails.meetupPoint}</p>
                <form onSubmit={e=>{this.handleSubmit(e)}}>
                    <div class="form-group">
                    <label for="order">Your order</label>
                    <textarea class="form-control" id="order" name="order" onChange={e=>{this.handleChange(e)}} value={this.state.orderitem} />
                      </div>
                <button type="submit" class="btn btn-primary">Add order</button>
                </form>      

            </div> :  
            ''}  
                
            </div>
          
            
        )
        
            
        
        }
       
    

}

export default withRouter(withCookies(EditJoinOrder))