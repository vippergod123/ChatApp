import React, { Component } from 'react';

//router
import {withRouter} from 'react-router-dom'
///
import {connect} from 'react-redux'
import { isEmpty } from 'react-redux-firebase';

//Action
import {setPriorityFriend} from "../../Store/Actions/userActions"

//Plugin
import Avatar from "react-avatar"

class HeaderChat extends Component {

    handleStarFriend(user) { 
        this.props.setPriorityFriend(user)
        // user.priority = !user.priority
    }
    
    render() {

        const cons = this.props.conversation
        const userLogged = this.props.auth
        const users = this.props.users
        var friends = this.props.friends

        

        if (isEmpty(cons)) { 
            return (
                <div className="chat-header clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
    
                <div className="chat-about">
                    <div className="chat-with">-------</div>
                    <div className="chat-num-messages">--------</div>
                </div>
                
            </div>
            );
        }
        else {
            var chatUID = ""
            cons.users.map(each => {
                if (each.uid !== userLogged.uid)
                    chatUID = each.uid
            })
            
            var chatUser = {}
            users.map ( each => { 
                if ( each.user.uid === chatUID)
                    chatUser = each
            })

            friends.map (each => { 
                if ( each.uid === chatUID)
                    chatUser.user.priority = each.priority
            })
            const info = chatUser.user
        return (
            <div className="chat-header clearfix">
            
            <Avatar src={info.photoURL} size ={50} className ="left" round={true}/>
            <div className="chat-about">
                <div className="chat-with ">Chat with {info.displayName}</div>
                <div className="chat-num-messages left">already {cons.history? cons.history.length:0} messages</div>
            </div>
            <a onClick ={() => this.handleStarFriend(info)}>{info.priority === true?<i className="fa fa-star"></i>:<i className="fa fa-star-o right"></i>}</a>
        </div>
        );
        }
    }
}


const mapStateToProps = (state) => { 
    return { 
        users: state.users,
        auth: state.firebase.auth,
        conversation: state.conversation,
        friends: state.friends,
    }
  }
  
  
  const mapDispatchToProps = (dispatch) => { 
    return { 
        setPriorityFriend: (user) => dispatch(setPriorityFriend(user)),
    }
  }
  
  
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeaderChat))