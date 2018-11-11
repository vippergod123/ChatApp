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
import { filterFriendsByName } from '../../Store/Actions/filterActions';
import { createConversation, sendMessage } from '../../Store/Actions/conversationActions';
import { setPriorityFriend ,createUser,setUserOnline} from '../../Store/Actions/userActions';
import { uploadImage } from '../../Store/Actions/uploadFileActions';


//plugin
import LoadingSpinner from '../Plugin/LoadingSpinner';
import { HashUID } from '../../GlobalFunction/HashFunction';

//Function 
import * as func from "./Function"

class ChatFrame extends Component {

    constructor(props) {
        super(props);
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

        var friends = this.props.fireStore.friends;
        const conversations = this.props.fireStore.conversations;

        var users = this.props.fireStore.users;
        // if (this.state.isLoaded) { 
        //     this.props.setUserOnline(userLogged);
        // }
        

        if (!userLogged.uid){ 
            return (
                <div>
                    <div className = "flow-text center"> <br/> Login to make great contact with friends </div>
                    <div className = "center"> <br/> Signout by Click Button to definitely  sign out </div>
                </div>
                
            )
        }
        else if ( isEmpty(friends) || !conversations)  { 
            return (
                <LoadingSpinner/>
            )
        }
        else if ( userLogged ) {
            
            

            var hashCode = HashUID(paramID,userLogged.uid); 
            var listConversation = conversations.filter (each => each.id === hashCode.toString())
            const conversation = listConversation[0]
            
        
           

            friends = friends.filter ( each => each.id === userLogged.uid)
            if(!isEmpty(friends[0]))
                friends = friends[0].friends;

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
                                
                                this.props.filterFriendsByName(displayName,friends,userLogged)
                            }}
                            />
                        </div>
                        <ListFriend userLogged = {userLogged} 
                                    friends = {!isEmpty(filterFriends)? filterFriends:friends}
                                    onClick = {this.handleClickFriends.bind(this)} />

                    </div>
                    <div className="chat">
                        
                        <ChatHeader 
                                    userLogged = {userLogged} conversations = {conversations} 
                                    paramID = {paramID} users = {friends} 
                                    onClick = {this.props.setPriorityFriend.bind(this)} 
                        />
                        
                        
                        <ChatHistory 
                                    userLogged ={userLogged} users = {friends} 
                                    conversations = {conversations} paramID = {paramID} 
                                    onClick = {this.props.createConversation.bind(this)} 
                        />
                        
                       

                        { conversation?
                            <div className="chat-message clearfix">
                                
                                
                                

                                <textarea onKeyPress = {(e) => this.handleSendMessageByEnter(e,conversation,userLogged)} name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3" name = "tag" ref= "tags"></textarea>
                                <button onClick = {() => this.handleSendMessage(conversation,userLogged,friends)}>Send</button>   
                                
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
        filterFriends: state.filter.filter,
    }
}

const mapDispatchToProps = (dispatch) => { 
    return {
        setPriorityFriend: (userLogged, friend) => dispatch (setPriorityFriend(userLogged, friend)),
        createConversation: (authUser,userClicked) => dispatch(createConversation(authUser,userClicked)),
        sendMessage:(authUID,paramUID,message) =>  dispatch(sendMessage(authUID,paramUID,message)),
        filterFriendsByName:(nameFilter,users,userLogged) => dispatch(filterFriendsByName(nameFilter,users,userLogged)),
        uploadImage:(file) => dispatch(uploadImage(file)),
        setUserOnline: (user) => dispatch(setUserOnline(user)),
    }
}
 
export default compose( 
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect((props) => [
        {collection: 'users'},
        {collection: 'conversations'}
    ])
)(ChatFrame)

