import React from 'react';
import { Link } from 'react-router-dom'
import SigninLink from './SigninLink';
import SignoutLink from './SignoutLink';
import {connect} from 'react-redux'

const Navbar = (props) => { 

    const links = props.auth.uid ? <SigninLink /> : <SignoutLink/>
    return (
        <nav className = "nav-wrapper grey darken-3">
            <div className = "container">
                <Link to= "/" className = "brand-logo">Chat App</Link>
                {links}
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => { 
    console.log(state);
    return { 
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Navbar);