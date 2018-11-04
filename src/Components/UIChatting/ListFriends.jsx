import React, { Component } from 'react';
import {connect} from 'react-redux'
import {isEmpty,getFirebase} from 'react-redux-firebase'
import {compose} from 'redux'


//router
import {withRouter} from 'react-router-dom'
//Action
import { getConversation} from '../../Store/Actions/conversationActions'
import {getFriends,makeFriends} from '../../Store/Actions/friendsActions'

//Plugin
import LoadingSpinner from '../Plugin/LoadingSpinner'
import moment from "moment"
import Avatar from "react-avatar"
import { stat } from 'fs';


const styleBtn = { 
    backgroundColor :"none",
}

class ListFriends extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            friends: []
        }
    }   
    

    componentDidMount() {
            
    }

    componentWillReceiveProps(){
   
    }
    componentDidUpdate(){
    }

    handleClick = (userLogged,userClicked) => { 
        this.props.getConversation(userLogged.uid,userClicked.uid)
        this.props.history.replace("../chat/"+userClicked.uid);

    }

    render() {
        
        
        const userLogged = this.props.auth
        
        var friends = this.props.friends
        var listUser = this.props.users
        
        
        if(isEmpty(friends)) { 
            return (
                <div className="people-list" id="people-list">
                <div className="search">
                <input type="text" placeholder="Search..." />
                </div>
                <LoadingSpinner/>
                </div>
            )
        }
        else {
            friends = friends.filter(function( obj ) {
                return obj.uid !== userLogged.uid ;
            });

            friends.sort((a,b) => { 
                if (a.status > b.status)
                    return -1;
                if (a.status < b.status)
                    return 1;
                return (a.priority === b.priority)? 0 : a.priority? -1 : 1;
                
            })

            
            return (
                    <div className="people-list" id="people-list">
                    <div className="search">
                        <input type="text" placeholder="Search..." />
                    </div>
        
                    <ul className="list">
                        {friends.map((each,index) => {
                            
                            const sec = parseInt(each.lastLoginAt)
                            const date = new Date(sec)
                            
                            return (
                                <a key = {index} onClick = {() => this.handleClick(userLogged,each)}>
                                <li className="clearfix" key={index}>
                                
                                <Avatar size="70"  src={each.photoURL}  className ="left" round = {true}/>
                                <div className="about">
                                    {each.priority === true ?<div className="name white-text">{each.displayName}<i className="fa fa-star online right"></i></div>
                                    :<div className="name white-text">{each.displayName}</div>}

                                    <div className="status">
                                    {each.status === "online"? <div><i className="fa fa-circle online"></i>{each.status}</div> : <div><i className="fa fa-circle offline"></i>{moment(date).fromNow()}</div>}

                                    </div>
                                </div>
                                
                                </li>
                                </a>
                            )
                        })}
                    </ul>
                    </div>
                )
        }
       
    }
}

const mapStateToProps = (state) => { 
    return { 
        auth: state.firebase.auth,
        friends: state.friends,
        users: state.users
    }
}


const mapDispatchToProps = (dispatch) => { 
    return { 
        getConversation:(authUID,paramUID) => dispatch(getConversation(authUID,paramUID)),
        getFriends:() => dispatch(getFriends()),
    }
}

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(ListFriends));

