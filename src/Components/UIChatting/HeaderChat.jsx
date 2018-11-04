import React, { Component } from 'react';

///
import {connect} from 'react-redux'
import { isEmpty } from 'react-redux-firebase';

import Avatar from "react-avatar"

class HeaderChat extends Component {

    
    
    render() {

        const cons = this.props.conversation
        const userLogged = this.props.auth
        const users = this.props.users

        if (isEmpty(cons)) { 
            return (
                <div className="chat-header clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
    
                <div className="chat-about">
                    <div className="chat-with">-------</div>
                    <div className="chat-num-messages">--------</div>
                </div>
                <i className="fa fa-star"></i>
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
                        
        return (
            <div className="chat-header clearfix">
            
            <Avatar src={chatUser.user.photoURL} size ={50} className ="left" round={true}/>
            <div className="chat-about">
                <div className="chat-with ">Chat with {chatUser.user.displayName}</div>
                <div className="chat-num-messages left">already {cons.history.length} messages</div>
            </div>
            <i className="fa fa-star"></i>
        </div>
        );
        }
    }
}


const mapStateToProps = (state) => { 
    return { 
        users: state.users,
        auth: state.firebase.auth,
        conversation: state.conversation
    }
  }
  
  
//   const mapDispatchToProps = (dispatch) => { 
//     return { 
//       createConversation: (user) => dispatch(createConversation(user)),
  
//     }
//   }
  
  
  export default connect(mapStateToProps,null)(HeaderChat);