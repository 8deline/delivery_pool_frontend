import React from 'react'
import axios from 'axios'
import { withCookies } from 'react-cookie'


class NewOrderForm extends React.Component{
    constructor(props){
        super(props)
        this.state= {meetupPoint: '',
        restaurant: '',
        estDeliveryTime: '',
        estDeliveryFee:'',
        order:'',
        error: ''
        }
    }

    componentDidMount(){
        
        if (this.props.location.state && this.props.location.state.address) {
            this.setState({
                meetupPoint: this.props.location.state.address
            })
            return
        }
        
         } 
    
    


    handleChange(e){
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value})
        
        
    }

    handleSubmit(e){
        e.preventDefault()
        axios.post("http://localhost:5000/api/v1/users/neworder/create", {meetupPoint: this.state.meetupPoint,
            restaurant: this.state.restaurant,
             estDeliveryTime: this.state.estDeliveryTime,
             estDeliveryFee: this.state.estDeliveryFee,
             order: this.state.order}, 
             {headers: {
                'auth_token': this.props.cookies.get('token')
              }})
              
        
    //     qs.stringify({meetupPoint: this.state.meetupPoint,
    //     restaurant: this.state.restaurant,
    //     estDeliveryTime: this.state.estDeliveryTime,
    //     estDeliveryFee: this.state.estDeliveryFee,
    //     order: this.state.order
    // }))
        .then(response=>{
            console.log(response)
            this.setState({
                meetupPoint:'',
                restaurant: '',
                estDeliveryTime: '',
                estDeliveryFee:'',
                order:''
                    })
        })
        .catch(err=>{console.log(err)})

    }
    

    render(){
        return(
            <div>
                
                <div>
                    <form onSubmit={e=>{this.handleSubmit(e)}}> 
                        <div class="form-group">
                            <label for="restaurant">Restaurant (required)</label>
                            <input type="text" class="form-control" id="restaurant" name="restaurant" value={this.state.restaurant} aria-describedby="restaurant" required onChange={e=>{this.handleChange(e)}} />
                            
                        </div>

                        <div class="form-group">
                            <label for="estDeliveryTime">Estimated delivery time (mins) (required)</label>
                            <input type="number" step="1" class="form-control" id="estDeliveryTime" name="estDeliveryTime" value={this.state.estDeliveryTime} aria-describedby="estDeliveryTime" onChange={e=>{this.handleChange(e)}} required/>
                            
                            
                        </div>

                        <div class="form-group">
                            <label for="estDeliveryFee">Estimated delivery fee (required) </label>  
                            <input type="number" step=".01" class="form-control" id="estDeliveryFee" name="estDeliveryFee" value={this.state.estDeliveryFee} aria-describedby="estDeliveryFee" onChange={e=>{this.handleChange(e)}} required />
                            
                        </div>

                        <div class="form-group">
                            <label for="meetupPoint">Meetup Point (required)</label>
                            <input type="text" class="form-control" id="meetupPoint" name="meetupPoint" value={this.state.meetupPoint} aria-describedby="meetupPoint" onChange={e=>{this.handleChange(e)}} required />
                            
                        </div>

                        <div class="form-group">
                        <label for="order">Your order (required)</label>
                        <textarea class="form-control" id="order" rows="4" name="order" value={this.state.order} onChange={e=>{this.handleChange(e)}} aria-describedby="order" required></textarea>
                        </div>

        
                        
                        <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                </div>    
                
            </div>
            
            //  <p>{this.state.meetupPoint}</p>
            // <p>test</p>
        )
    }

}



export default withCookies(NewOrderForm)