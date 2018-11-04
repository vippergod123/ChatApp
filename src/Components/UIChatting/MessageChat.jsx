import React, { Component } from 'react';
import {setUserOnline} from "../../Store/Actions/userActions"
import {connect} from 'react-redux'

//Action
import {makeFriends,getFriends} from '../../Store/Actions/friendsActions'
import { isEmpty } from 'react-redux-firebase';


class MessageChat extends Component {
   constructor(props) {
       super(props);
       this.setState = { 
           message:[]
       }
   }
   

    handleSendMessage (e) {
        e.preventDefault();
        const term = this.refs.tags.value;
        console.log(term);
        this.refs.tags.value = ""
    }

    handleSendMessageByEnter(e) { 
        var key = window.event.keyCode
        if (key === 13) {
            this.handleSendMessage(e)
        }
        
    }

    render() {
        

        console.log(this.props.auth);
        console.log(this.props.users);
        if ( this.props.auth.uid && !(isEmpty(this.props.users))) {
            this.props.makeFriends(this.props.auth)
            }

        return (
            <div className="chat-message clearfix">
                <textarea name="message-to-send" onKeyPress= {this.handleSendMessageByEnter.bind(this)} id="message-to-send" placeholder="Type your message" rows="3" name = "tag" ref= "tags"></textarea>
                <button onClick = {this.handleSendMessage.bind(this)}>Send</button>
                
                
            </div>
        );
    }
}

const mapStateToProps = (state) => { 
    return {
        auth: state.firebase.auth,
        users: state.users,
        conversation: state.conversation
    }
}

const mapDispatchToProps = (dispatch) => { 
    return {
        setUserOnline:() => dispatch(setUserOnline()),
        getFriends:()=> dispatch(getFriends()),
        makeFriends:(authUser) => dispatch(makeFriends(authUser))

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MessageChat)
