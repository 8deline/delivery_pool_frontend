import React from 'react'

class NewOrderForm extends React.Component{
    constructor(props){
        super(props)
        this.state= {meetupPoint: this.props.location.state.address.address,
        restaurant: '',
        estDeliveryTime: '',
        estDeliveryFee:'',
        order:''
        }
    }

    // componentDidMount(){
    // // //     if (this.props.location.state.address && this.props.location.state){
    // // //         this.setState({meetupPoint: this.props.location.state.address})
    // // //         console.log(this.state)
    // // //         return
    // console.log(this.state.meetupPoint)
    // console.log(this.props.location.state.address.address)
    //      } 
        
    
    

    render(){
        return(
            <div>
                {this.state.meetupPoint? (
                <div>
                    <form>
                        <div class="form-group">
                            <label for="restaurant">Restaurant</label>
                            <input type="text" class="form-control" id="restaurant" name="restaurant" value={this.state.restaurant} aria-describedby="restaurant" required />
                            
                        </div>

                        <div class="form-group">
                            <label for="estDeliveryTime">Estimated delivery time</label>
                            <input type="number" step="1" class="form-control" id="estDeliveryTime" name="estDeliveryTime" value={this.state.estDeliveryTime} aria-describedby="estDeliveryTime" required/>
                            
                        </div>

                        <div class="form-group">
                            <label for="estDeliveryFee">Estimated delivery fee</label>
                            <input type="number" step="1" class="form-control" id="estDeliveryFee" name="estDeliveryFee" value={this.state.estDeliveryFee} aria-describedby="estDeliveryFee" required />
                            
                        </div>

                        <div class="form-group">
                            <label for="meetupPoint">Meetup Point</label>
                            <input type="text" class="form-control" id="meetupPoint" name="meetupPoint" value={this.state.meetupPoint} aria-describedby="meetupPoint" required />
                            
                        </div>

                        <div class="form-group">
                            <label for="order">Your order</label>
                            <input type="text" class="form-control" id="order" name="order" value={this.state.order} aria-describedby="order" required />
                            
                        </div>
                        
                        <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                </div>    
                ): '' 
                }
            </div>
            
            //  <p>{this.state.meetupPoint}</p>
            // <p>test</p>
        )
    }

}



export default NewOrderForm