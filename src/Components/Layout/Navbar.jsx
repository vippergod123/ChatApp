import React, { Component } from 'react';

//Component
import SigninLink from './SigninLink';
import SignoutLink from './SignoutLink';

//Action
import {createUser,setUserOnline} from '../../Store/Actions/userActions'
import {createFriend} from "../../Store/Actions/friendsActions"
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
    
  
    componentDidMount() {
      }
      
    render() {
        const userLogged = this.props.auth
        const links = userLogged.uid ?  <SigninLink />: <SignoutLink/>
        var users = this.props.fireStore.users
        var friends = this.props.fireStore.friends;
        
        
        if (userLogged.uid && this.state.isLoaded === false && users && friends ) { 
            
            this.props.createUser(userLogged)
            this.props.setUserOnline(userLogged)
            this.setState({ 
                isLoaded: true,
            })

            // var findUser = users.findIndex( each => each.uid === userLogged.uid);
            
            // console.log(findUser);
            // if ( findUser === -1) { 
            //     users = users.filter ( each => each.uid !== userLogged.uid)
            //     this.props.createFriend(userLogged,users);
            // }
            console.log(friends);
            var findUser = friends.findIndex( each => each.id === userLogged.uid);
            console.log(findUser);
            if ( findUser === -1) { 
                this.props.createFriend(userLogged,users);
            }
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
        users: state.users,
        fireStore: state.firestore.ordered
    }
}


const mapDispatchToProps = (dispatch) => { 
    return { 
        createUser: (user) => dispatch(createUser(user)),
        createFriend: (userLogged,listUsers) => dispatch(createFriend(userLogged,listUsers)),
        setUserOnline: (user) => dispatch(setUserOnline(user)),
    }
}
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props) => [
        {collection: 'users'},
        {collection: 'friends'},
    ])
)(Navbar);
