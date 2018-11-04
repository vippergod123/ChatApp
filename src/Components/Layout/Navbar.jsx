import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import SigninLink from './SigninLink';
import SignoutLink from './SignoutLink';


//Action
import {createUser, getUserFromFireStore,setUserOnline} from '../../Store/Actions/userActions'
import {getFriends} from '../../Store/Actions/friendsActions'

//
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'


class Navbar extends Component {

    componentDidMount() { 
        this.props.getUserFromFireStore()
    }

    componentWillReceiveProps() { 
        
    }
  
    render() {
        const userLogged = this.props.auth
        const links = userLogged.uid ?  <SigninLink />: <SignoutLink/>
        const userList = this.props.users
        
        
        if (userLogged.uid) { 
            this.props.createUser(userLogged)
            this.props.setUserOnline(userLogged)
            this.props.getFriends()
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
        users: state.users
    }
}


const mapDispatchToProps = (dispatch) => { 
    return { 
        createUser: (user) => dispatch(createUser(user)),
        getUserFromFireStore: () => dispatch(getUserFromFireStore()),
        setUserOnline: (user) => dispatch(setUserOnline(user)),
        getFriends: () => dispatch(getFriends()),
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect(['users']),
)(Navbar);




// //Solution
// console.log(props.auth);

//         const firebase = getFirebase()
//         firebase.database().ref('Friends/' + props.auth.uid).set({
//             lastLoginAt: props.auth.lastLoginAt,
//             status:'online'
//           });
//         // const loginAt = new Date();
//         // itemRef.ref('Friends').child(props.auth.uid).push({
//         //     lastLoginAt: props.auth.lastLoginAt,
//         //     status: "online"
//         // })
//         const patients =[];
//         var rootRef = firebase.database().ref().child("Friends");
//         rootRef.on("child_added", snap => {
//             // Store all the labels in array
            
//             patients.push({
//                 status: snap.val(),
//                 uid: snap.key
//             })
            
//         });
//         console.log(patients)