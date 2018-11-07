import React, { Component } from 'react';

//Component
import SigninLink from './SigninLink';
import SignoutLink from './SignoutLink';

//Action
import {createUser,setUserOnline} from '../../Store/Actions/userActions'

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
        
        if (userLogged.uid && this.state.isLoaded === false) { 
            this.props.createUser(userLogged)
            this.props.setUserOnline(userLogged)
            this.setState({ 
                isLoaded: true,
            })
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
        setUserOnline: (user) => dispatch(setUserOnline(user)),
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props) => [
        {collection: 'users'},
    ])
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