import React, { Component } from 'react';


//component
import ChatHeader  from './components/ChatHeader'
import ListFriend from './components/ListFriend'
import ChatHistory from './components/ChatHistory';

//
import {connect} from 'react-redux'
import { isEmpty, firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

//Action
import { filterFriendsByName } from '../../Store/Actions/friendsActions';
import { createConversation, sendMessage } from '../../Store/Actions/conversationActions';
import { setPriorityFriend } from '../../Store/Actions/userActions';
import { uploadImage } from '../../Store/Actions/uploadFileActions';


//plugin
import LoadingSpinner from '../Plugin/LoadingSpinner';
import { HashUID } from '../../GlobalFunction/HashFunction';

//Function 
import * as func from "./Function"

class ChatFrame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageUploadURL:null,
        }
    }

    
    handleClickFriends(userLogged,userClicked) { 
        this.props.history.replace("../chat/"+userClicked.uid);  
    }

    handleSendMessage (conversation, userLogged){
        
        const  message = this.refs.tags.value;
        this.refs.tags.value = null
        
        
        
        this.props.sendMessage(conversation, userLogged, message)
    }

    handleSendMessageByEnter(event,conversation,userLogged) { 
        
        var key = window.event.keyCode
        if (key === 13) {
            this.handleSendMessage (conversation, userLogged)
            event.preventDefault();
            event.currentTarget.value = "";
        }
       
    }


    componentDidUpdate() { 
        
            var elem = document.getElementById('historyChat');
            if (elem) {
            elem.scrollTop = elem.scrollHeight;
            }
        
    }
    render() {
        
        const userLogged = this.props.auth
        const paramID = this.props.match.params.id

        var users = this.props.fireStore.users;
        const conversations = this.props.fireStore.conversations;
        
        if (!userLogged.uid){ 
            return (
                <div>
                    <div className = "flow-text center"> <br/> Login to make great contact with friends </div>
                    <div className = "center"> <br/> Signout by Click Button to definitely  sign out </div>
                </div>
                
            )
        }
        else if ( !users || !conversations)  { 
            
            console.log(typeof(conversations))
            return (
                <LoadingSpinner/>
            )
        }
        else if ( userLogged ) {
            
            var hashCode = HashUID(paramID,userLogged.uid); 
            var listConversation = conversations.filter (each => each.id === hashCode.toString())
            const conversation = listConversation[0]
            

            users = users.filter ( each => each.uid !== userLogged.uid)
            var filterFriends = this.props.filterFriends
            
            return (
                <div>
                    <div className="container">
                
                    <div className="people-list" id="people-list">
                        <div className="search">
                            <input type="text" placeholder="search"
                            onChange={e => {
                                e.preventDefault()
                                var displayName = e.target.value;
                                
                                this.props.filterFriendsByName(displayName,users,userLogged)
                            }}
                            />
                        </div>
                        <ListFriend userLogged = {userLogged} users = {!isEmpty(filterFriends)? filterFriends:users}
                                    conversations = {conversations}
                                    onClick = {this.handleClickFriends.bind(this)} />

                    </div>
                    <div className="chat">
                        
                        <ChatHeader 
                                    userLogged = {userLogged} conversations = {conversations} 
                                    paramID = {paramID} users = {users} 
                                    onClick = {this.props.setPriorityFriend.bind(this)} 
                        />
                        
                        
                        <ChatHistory 
                                    userLogged ={userLogged} users = {users}
                                    conversations = {conversations} paramID = {paramID} 
                                    onClick = {this.props.createConversation.bind(this)} 
                        />
                        
                       

                        { conversation?
                            <div className="chat-message clearfix">
                                
                                
                                

                                <textarea onKeyPress = {(e) => this.handleSendMessageByEnter(e,conversation,userLogged)} name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3" name = "tag" ref= "tags"></textarea>
                                <button onClick = {() => this.handleSendMessage(conversation,userLogged)}>Send</button>   
                                
                                <label htmlFor="upload-photo">
                                    <i className="fa fa-picture-o" aria-hidden="true" ></i>
                                </label>
                                <span ref = "upload"></span>
                                <input type="file" name="photo" id="upload-photo" onChange={(event) => func.handleChangeFile(event,conversation,userLogged,this.refs.upload)} /> 

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
        auth: state.firebase.auth,
        fireStore: state.firestore.ordered,
        filterFriends: state.friends.filterFriends,
    }
}

const mapDispatchToProps = (dispatch) => { 
    return {
        setPriorityFriend: (user) => dispatch (setPriorityFriend(user)),
        createConversation: (authUser,userClicked) => dispatch(createConversation(authUser,userClicked)),
        sendMessage:(authUID,paramUID,message) =>  dispatch(sendMessage(authUID,paramUID,message)),
        filterFriendsByName:(nameFilter,users,userLogged) => dispatch(filterFriendsByName(nameFilter,users,userLogged)),
        uploadImage:(file) => dispatch(uploadImage(file)),
    }
}
 
export default compose( 
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props) => [
        {collection: 'users'},
        {collection: 'conversations'}
    ])
)(ChatFrame)