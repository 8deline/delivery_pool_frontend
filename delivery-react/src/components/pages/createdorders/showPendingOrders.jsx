import React from 'react'
import {withCookies} from 'react-cookie'
import axios from 'axios'
import {Link} from 'react-router-dom'

class showPendingOrders extends React.Component{
    constructor(props){
        super(props)
        this.state= {restaurant: '',
        deliveryTimeEst: '',
        deliveryFee:  '',
        meetupPoint: '',
        orderDetails: [],
        userid: '',
        order: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/v1/users/orderscreated',  {headers: {
            'auth_token': this.props.cookies.get('token')
          }
        }
        )
        .then(response=>{
            this.setState({order: response.data})
            // console.log(this.state.order)
        })
            
        .catch(err=>{
            console.log(err)
        })
    }

    render(){
        return ( 
        <div>
           {(!this.state.order)?'':
        (<div>
            {this.state.order.map(orderitem =>{ 
                return (
                <div>
                <Link to= {{pathname:`/users/allOrder/${orderitem._id}` , state:{order: orderitem}}}><p>Restaurant: {orderitem.restaurant}</p></Link>
                <p>Delivery time (mins): {orderitem.deliveryTimeEst}</p>
                <p>Delivery fee ($): {orderitem.deliveryFee}</p>
                <p>Meetup Point: {orderitem.meetupPoint}</p>
                {orderitem.orderDetails.map(eachorder=>{
                    return (<p>{eachorder[Object.keys(eachorder)[2]]}: {eachorder[Object.keys(eachorder)[0]]}</p>)
                })}
                </div>
                )
    
        // orderDetails: [],

            })}
        </div>)

           } 
        </div>
        
        )

        
    }
}

export default withCookies(showPendingOrders)