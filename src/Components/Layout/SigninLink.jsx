import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import {connect} from "react-redux"

//Action
import {setUserOffline} from '../../Store/Actions/userActions'
import {signOut} from '../../Store/Actions/authActions'


import Avatar from 'react-avatar';
import {Container} from 'reactstrap'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class SigninLink extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }
    
      toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }


      handleLogOut (userLogged) { 
          this.props.signOut()
          this.props.setUserOffline(userLogged)
      }
    render() {
        const userLogged = this.props.auth
        const signOutBtn = <a to = "/signin" onClick = { () => {this.handleLogOut(userLogged)}}>Sign Out</a>
        // const avatarBtn =<Avatar googleID={this.props.auth.providerData["0"].uid} size = {40} round = {true}/>
        const dropDownButton = (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    
                    <DropdownToggle >
                    {userLogged.displayName}
                    </DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem disabled>Action</DropdownItem>
                    <DropdownItem>Profile</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>{signOutBtn}</DropdownItem>
                    </DropdownMenu>
            </Dropdown>
        )
        return (
            <Container>
        <ul className = "right">
            <li> <NavLink to = "/chat"><Button color="info">Chat</Button></NavLink> </li>
            <li> {dropDownButton}</li>
        </ul>
        </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => { 
    return { 
        setUserOffline: (user) => dispatch(setUserOffline(user)),
        signOut: () => dispatch(signOut())
    }
}


const mapStateToProps = (state) => { 
    return { 
        auth: state.firebase.auth
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SigninLink)