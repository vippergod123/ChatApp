import React, { Component } from 'react';

class Signup extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            email: '',
            password:'',
            firstName: '',
            lastName: '',
        }
    }
    
    handleChange = (e) =>  {
        this.setState({
            [e.target.id] : e.target.value
        })
        
    }

    handleSubmit = (e) =>  {
        e.preventDefault();
        
    }

    render() {
        return (
          

        <div className = "container">
        <div className="row">
            <h2><strong>Sign Up </strong> </h2>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <form onSubmit = {this.handleSubmit} className = "white"> 
                        
                        
                        <div className = "input-field">
                            <label htmlFor = "text">FirstName</label>
                            <input type ="text" id = "firstName" onChange= {this.handleChange}/>
                        </div>

                        <div className = "input-field">
                            <label htmlFor = "text">LastName</label>
                            <input type ="text" id = "lastName" onChange= {this.handleChange}/>
                        </div>

                        <div className = "input-field">
                            <label htmlFor = "email">Email</label>
                            <input type ="email" id = "email" onChange= {this.handleChange}/>
                        </div>
                        
                        <div className = "input-field">
                            <label htmlFor = "password">Password</label>
                            <input type ="password" id = "password" onChange= {this.handleChange}/>
                        </div>

                        <div className = "input-field">
                            <button type="submit" class="btn btn-primary blue">Sign Up</button>
                        </div>
                        
                    </form>
            </div>
            </div>
        </div>
        )
    }
}

export default Signup;