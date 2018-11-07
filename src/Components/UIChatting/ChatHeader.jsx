import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'react-redux-firebase';
import ReactAvatar from 'react-avatar';


//Global function 
import {HashUID} from '../../GlobalFunction/HashFunction'
function mapStateToProps(state, ownProps) {
    return {

    };
}

var buttonStyle = {
    backgroundColor: "Transparent",
    border: "none",
    cursor: "pointer",
    overflow: "hidden",
    outline:"none"
}


const ChatHeader = ({userLogged, conversations, paramID, users,onClick}) => { 

        var list = users.filter( each=> each.id === paramID) // getListUser match param ID
        var friend = list[0]

        
        if (isEmpty(friend)) { 
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
            var hashCode = HashUID(paramID,userLogged.uid); 
            var listConversation = conversations.filter (each => each.id === hashCode.toString())
            const conversation = listConversation[0]
             
            
        return (
            <div className="chat-header clearfix">
            
            <ReactAvatar src={friend.photoURL} size ={50} className ="left" round={true}/>
            <div className="chat-about">
                <div className="chat-with ">{friend.displayName}</div>
                {conversation? <div className="chat-num-messages left">already {conversation.history? conversation.history.length:0} messages</div>:<div className="chat-num-messages left">no messages</div> }
            </div>
            <button style = {buttonStyle}onClick ={() => onClick(friend)}>{friend.priority === true?<i className="fa fa-star right"></i>:<i className="fa fa-star-o right"></i>}</button>
        </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(ChatHeader);