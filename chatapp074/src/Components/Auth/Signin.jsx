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
                <form onSubmit = {this.handleSubmit} className = "white"> 
                    <h5 className = "grey-text text-darken-3">Sign In</h5>  
                    
                    <div className = "input-field">
                        <label htmlFor = "email">Email</label>
                        <input type ="email" id = "email" onChange= {this.handleChange}/>
                    </div>
                    
                    <div className = "input-field">
                        <label htmlFor = "password">Password</label>
                        <input type ="password" id = "password" onChange= {this.handleChange}/>
                    </div>

                    <div className = "red-text"> {authError? <p>{authError}</p> : null}
                    </div>

                    <GoogleButton onClick = {this.handleGoogleLogin}/>

                    <div className = "input-field">
                        <button className = "btn pink lighten-1 z-depth-0">Login</button>
                    </div>

                </form>
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