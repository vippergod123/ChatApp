import React, { Component } from 'react';
import {setUserOnline} from "../../Store/Actions/userActions"
import {connect} from 'react-redux'

//Action
import {makeFriends,getFriends} from '../../Store/Actions/friendsActions'
import { isEmpty } from 'react-redux-firebase';


class MessageChat extends Component {
    componentWillReceiveProps() { 
       
        
    }

    render() {
        

        console.log(this.props.auth);
        console.log(this.props.users);
        if ( this.props.auth.uid && !(isEmpty(this.props.users))) {
            this.props.makeFriends(this.props.auth)
            }

        return (
            <div className="chat-message clearfix">
                <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                <button>Send</button>

            </div>
        );
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
        setUserOnline:() => dispatch(setUserOnline()),
        getFriends:()=> dispatch(getFriends()),
        makeFriends:(authUser) => dispatch(makeFriends(authUser))

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MessageChat)