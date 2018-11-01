import React, { Component } from 'react';
import {connect} from 'react-redux'
import {signIn, signInWithGoogle} from '../../Store/Actions/authActions'

import GoogleButton from 'react-google-button'
import  {withRouter} from 'react-router-dom'
class Signin extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            email: '',
            password:'',
        }
    }
    
    handleChange = (e) =>  {
        this.setState({
            [e.target.id] : e.target.value
        })
        
    }
    
    handleGoogleLogin = (e) => { 
        e.preventDefault();
        this.props.signInWithGoogle();
        this.props.history.replace('/');
    }
    handleSubmit = (e) =>  {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    render() {
        let authError = this.props.authError
        return (
            <div className = "container">
               <div class="row">
                    <h2><strong>Sign In </strong> </h2>
                    
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <form onSubmit =  {this.handleSubmit    }>
                      <div class="form-group"> 
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange= {this.handleChange}/>
                        </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" name="password" id="password" placeholder="Password" onChange= {this.handleChange}/>
                      </div>
                      <div class="form-check">
                      <GoogleButton onClick = {this.handleGoogleLogin}/>
                      <br/>
                        <button type="submit" class="btn btn-primary blue">Login</button>
                      </div>
                      
                    </form>
                    </div>

               </div>
			</div> 
		
		
	
		
	
        
        );
    }
}

const mapStateToProps = (state) => { 
    return { 
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => { 
    return { 
        signIn: (creds) => dispatch(signIn(creds)),
        signInWithGoogle: () => dispatch(signInWithGoogle()),
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Signin));