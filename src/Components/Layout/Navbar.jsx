import React, { Component } from 'react';

//Component
import SigninLink from './SigninLink';
import SignoutLink from './SignoutLink';

//Action
import {createUser,setUserOnline} from '../../Store/Actions/userActions'
import {createFriend,addFriend} from "../../Store/Actions/friendsActions"
//
import {connect} from 'react-redux'
import {firestoreConnect, isLoaded} from 'react-redux-firebase'
import {compose} from 'redux'


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
        }
    }
   
    
    render() {
        const userLogged = this.props.auth
        const links = userLogged.uid ?  <SigninLink />: <SignoutLink/>
        var users = this.props.fireStore.users
        var friends = this.props.fireStore.friends;
        
        
        if (userLogged.uid && this.state.isLoaded === false && users && friends ) { 
            
            // this.props.createUser(userLogged)
            
            // this.setState({ 
            //     isLoaded: true,
            // })
     
            // var findUser = friends.findIndex( each => each.id === userLogged.uid);
  
            // if ( findUser === -1) { 
            //     this.props.createFriend(userLogged,users);
            // }
            // else {
            //     friends = friends.filter(each => each.id === userLogged.uid);
            //     this.props.addFriend(userLogged,users,friends[0].friends);
            // }

            // this.props.setUserOnline(userLogged);
        }
        else { 

        }
        
        return (
            <nav className = "nav-wrapper grey darken-3">
                <div className = "container">
                    <a href= "/" className = "brand-logo">Chat App</a>
                    {links}
                </div>
            </nav>
        )
    }
}



const mapStateToProps = (state) => { 
    return { 
        auth: state.firebase.auth,
        fireStore: state.firestore.ordered
    }
}


const mapDispatchToProps = (dispatch) => { 
    return { 
        createUser: (user) => dispatch(createUser(user)),
        createFriend: (userLogged,listUsers) => dispatch(createFriend(userLogged,listUsers)),
        setUserOnline: (user) => dispatch(setUserOnline(user)),
        addFriend: (userLogged, listUsers, friends)  => dispatch(addFriend(userLogged, listUsers, friends))
    }
}
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props) => [
        {collection: 'users'},
        {collection: 'friends'},
    ])
)(Navbar);