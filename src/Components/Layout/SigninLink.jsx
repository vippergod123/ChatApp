import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import {connect} from "react-redux"
import {signOut} from '../../Store/Actions/authActions'
import Avatar from 'react-avatar';


const SigninLink = (props) => { 
    console.log(props);
    
    return (
        
        <ul className = "right">
            <li> <NavLink to = "/create">New Project</NavLink> </li>
            <li> <a to = "/signin" onClick = {props.signOut} >Sign Out</a> </li>
            <li> <NavLink to = "/"><Avatar googleID={props.auth.providerData["0"].uid} size = {40} round = {true}/> </NavLink> </li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => { 
    return { 
        signOut: () => dispatch(signOut())
    }
}


const mapStateToProps = (state) => { 
    console.log(state);
    return { 
        auth: state.firebase.auth
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SigninLink)