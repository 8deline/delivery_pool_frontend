import React from 'react'
import axios from 'axios'
import qs from 'qs'

class UserInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            address:''
        }
    }
        

    handlesSubmit(e){
        //remember to return sommething from server
        e.preventDefault()
axios.post('http://localhost:5000/api/v1/users/new', qs.stringify({
    firstname: this.state.firstname,
    lastname: this.state.lastname,
    address: this.state.address
}))
.then(response=>{
    console.log(response.data)
})
.catch(err=> console.log(err))
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    render(){


        return (
            <form onSubmit={e=>{this.handlesSubmit(e)}}>
  <div class="form-group">
    <label for="firstname">First name</label>
    <input type="text" class="form-control" id="firstname" name="firstnamme" onChange={e=>{this.handleChange(e)}} />
    
  </div>
  <div class="form-group">
    <label for="lastname">Last name</label>
    <input type="text" class="form-control" id="lastname" name="lastnamme" onChange={e=>{this.handleChange(e)}} />
    
  </div>
  <div class="form-group">
    <label for="address">Address</label>
    <input type="text" class="form-control" id="address" name="address" onChange={e=>{this.handleChange(e)}} />
    
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
        )
    }
}

export default UserInput