import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import {connect} from "react-redux"

//Action
import {setUserOffline} from '../../Store/Actions/userActions'
import {signOut} from '../../Store/Actions/authActions'
import {createUser,setUserOnline} from '../../Store/Actions/userActions'
import {createFriend,addFriend} from "../../Store/Actions/friendsActions"

//Plugin
import {Container} from 'reactstrap'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class SigninLink extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false,
          isLoaded: false,
        };
      }
    
     
      toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }


      handleLogOut (userLogged) { 
        this.props.setUserOffline(userLogged)
        setTimeout(() => { 
            this.props.signOut()
        },3000)
        
        
          
      }
    render() {
        const userLogged = this.props.auth
        const signOutBtn = <NavLink className ="red-text" to = "/" onClick = { () => {this.handleLogOut(userLogged)}}>Sign Out</NavLink>
        const dropDownButton = (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    
                    <DropdownToggle >
                    {userLogged.displayName}
                    </DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem header>User</DropdownItem>
                    <DropdownItem>Profile</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>{signOutBtn}</DropdownItem>
                    </DropdownMenu>
            </Dropdown>
        )

        
        var users = this.props.fireStore.users
        var friends = this.props.fireStore.friends;
        if (userLogged.uid && this.state.isLoaded === false && users && friends ) { 
            
            this.props.createUser(userLogged)
            
            this.setState({ 
                isLoaded: true,
            })
     
            var findUser = friends.findIndex( each => each.id === userLogged.uid);
  
            if ( findUser === -1) { 
                this.props.createFriend(userLogged,users);
            }
            else {
                friends = friends.filter(each => each.id === userLogged.uid);
                this.props.addFriend(userLogged,users,friends[0].friends);
            }

            this.props.setUserOnline(userLogged);
        }

        return (
            <Container>
        <ul className = "right">
            <li> <a href = "/"><Button color="info">Chat</Button></a> </li>
            <li> {dropDownButton}</li>
        </ul>
        </Container>
        );
    }
}

const mapStateToProps = (state) => { 
    return { 
        auth: state.firebase.auth,
        fireStore: state.firestore.ordered,
    }
}

const mapDispatchToProps = (dispatch) => { 
    return { 
        setUserOffline: (user) => dispatch(setUserOffline(user)),
        signOut: () => dispatch(signOut()),
        createUser: (user) => dispatch(createUser(user)),
        createFriend: (userLogged,listUsers) => dispatch(createFriend(userLogged,listUsers)),
        setUserOnline: (user) => dispatch(setUserOnline(user)),
        addFriend: (userLogged, listUsers, friends)  => dispatch(addFriend(userLogged, listUsers, friends))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SigninLink)