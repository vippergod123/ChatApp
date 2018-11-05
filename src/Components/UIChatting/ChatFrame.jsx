import React, { Component } from 'react';


//component
import ChatHeader  from './ChatHeader'
import ListFriend from './ListFriend'
//
import {connect} from 'react-redux'
import { getConversation,createConversation, sendMessage } from '../../Store/Actions/conversationActions';
import { setPriorityFriend } from '../../Store/Actions/userActions';
import ChatHistory from './ChatHistory';
import { isEmpty } from 'react-redux-firebase';



class ChatFrame extends Component {

    handleClickFriends(userLogged,userClicked) { 
        this.props.getConversation(userLogged,userClicked)
        this.props.history.replace("../chat/"+userClicked.uid);  
        console.log(this.props.conversation);
    }

    handleStarFriend(userClicked) { 
        this.props.setPriorityFriend(userClicked)
    }

    handleCreateConversation(userLogged,userClicked) { 
        this.props.createConversation(userLogged,userClicked)
    }

    handleSendMessage (fetchConversation,userLogged){
        
        const term = this.refs.tags.value;
        console.log(term);
        this.refs.tags.value = null
        console.log(fetchConversation);
        
        var message = fetchConversation.conversation.history
        var users =  fetchConversation.conversation.users
        var date = new Date(); // some mock date
        var lastMilliseconds = date.getTime();
        
        message.push( {
            sendAt: lastMilliseconds,
            uid: userLogged.uid,
            text: term,
        })
        console.log(users);
        
        this.props.sendMessage(users[0].user,users[1].user,message)
    }

    handleSendMessageByEnter(event,fetchConversation,userLogged) { 
        
        var key = window.event.keyCode
        if (key === 13) {
            this.handleSendMessage (fetchConversation,userLogged)
            event.preventDefault();
            event.currentTarget.value = "";
        }
       
    }

    render() {
        
        const fetchConversation = this.props.fetchConversation
        const userLogged = this.props.auth
        
        const paramID = this.props.match.params.id
        
        const users = this.props.users
        var friends = this.props.friends
        
        if (!userLogged.uid){ 
            return (
                <div>
                    <div className = "flow-text center"> <br/> Login to make great contact with friends </div>
                    <div className = "center"> <br/> Signout by Click Button to definitely  sign out </div>
                </div>
                
            )
        }
        else if ( userLogged && users && friends ) {
            console.log(fetchConversation);
            
            return (
                <div>
                    <div className="container">
                
                    <ListFriend friends = {friends} userLogged = {userLogged} onClick = {this.handleClickFriends.bind(this)} />
                    <div className="chat">
                        <ChatHeader  fetchConversation = {fetchConversation} onClick = {this.handleStarFriend.bind(this)} />
                        <ChatHistory fetchConversation = {fetchConversation} onClick = {this.handleCreateConversation.bind(this)} userLogged ={userLogged} paramID = {paramID} friends = {friends}/>
                        
                        {fetchConversation.userClicked && !isEmpty(fetchConversation.conversation)?
                            <div className="chat-message clearfix">
                                <textarea onKeyPress = {(e) => this.handleSendMessageByEnter(e,fetchConversation,userLogged)} name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3" name = "tag" ref= "tags"></textarea>
                                <button onClick = {() => this.handleSendMessage(fetchConversation,userLogged)}>Send</button>   
                            </div>
                        :null}
                        
                    </div>

                    </div>
                    
                </div>
            )
        }
        
    }
}

const mapStateToProps = (state) => { 
    return { 
        users: state.users,
        auth: state.firebase.auth,
        fetchConversation: state.conversation,
        friends: state.friends,
    }
}

const mapDispatchToProps = (dispatch) => { 
    return {
        getConversation: (authUser,userClicked) => dispatch(getConversation(authUser,userClicked)),
        setPriorityFriend: (user) => dispatch (setPriorityFriend(user)),
        createConversation: (authUser,userClicked) => dispatch(createConversation(authUser,userClicked)),
        sendMessage:(authUID,paramUID,message) =>  dispatch(sendMessage(authUID,paramUID,message)),
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(ChatFrame)