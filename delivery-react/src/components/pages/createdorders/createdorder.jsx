import React from 'react'
import axios from 'axios'
import {withCookies} from 'react-cookie'


class CreatedOrder extends React.Component  {
    constructor(props){
        super(props)
        this.state = {order: '', orderitem:''}
    }

    componentDidMount(){
        if(this.props.location.state && this.props.location.state.order) {
            const currentprop = this.props.location.state.order
            this.setState({order: currentprop, orderitem: currentprop.orderDetails[0].food})
            console.log(this.props.match.params)
            // console.log(this.state.orderitem)
            return
        }
        // console.log(this.props.location)
        // console.log(this.state.order)
        
    }

    handleChange(e){
        // axios.post(`/api/v1/users/orderscreated/${this.props.match.params.}`)
         console.log(this.props.match.params)
        this.setState({orderitem: e.target.value})
    }

    render() {
        return (
        <div>
            {!this.state.order? '': 
            (
            <div>
                <p>Restaurant: {this.state.order.restaurant}</p>
                <p>Delivery time (mins): {this.state.order.deliveryTimeEst}</p>
                <p>Delivery fee ($): {this.state.order.deliveryFee}</p>
                <p>Meetup Point: {this.state.order.meetupPoint}</p>
                {this.state.order.orderDetails.map(eachorder=>{
                    return (
                        this.state.order.userid === eachorder[Object.keys(eachorder)[2]] ? 
                         (<form>
                            <div class="form-group">
                        <label for="order">{eachorder[Object.keys(eachorder)[2]]}</label>
                        <input type="textarea" rows="3" class="form-control" id="order" value ={this.state.orderitem} name="food" onChange={e=>{this.handleChange(e)}} />
    
                            </div>
                            <button type="submit" class="btn btn-primary">Edit</button>
                        </form> ) :
                        (<p>{eachorder[Object.keys(eachorder)[2]]}: {eachorder[Object.keys(eachorder)[0]]}</p>)
                    )
                    }
                    )
                        
                }
                </div>
                )}       
            
        </div> 
        )
    }
}
export default withCookies(CreatedOrder)