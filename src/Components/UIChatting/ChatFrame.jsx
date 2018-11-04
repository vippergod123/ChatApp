import React, { Component } from 'react';
import ListFriends from './ListFriends'

import  HeaderChat from './HeaderChat'
import  HistoryChat from './HistoryChat'
import  MessageChat from './MessageChat'
import {connect} from 'react-redux'
import {firebaseReducer} from 'react-redux-firebase'
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'
class ChatFrame extends Component {

    constructor(props) {
        super(props)
        
        
    }

    render() {

        
        
        return (<div>
    
        <div className="container">
        
            <ListFriends/>
            <div className="chat">
                <HeaderChat/>
                <HistoryChat/>
                <MessageChat/>
            </div>
            </div>
            
            </div>
        );
    }
}

const mapStateToProps = (state) => { 
    return { 
        auth: state.firebase.auth
    }
}


export default connect(mapStateToProps,null)(ChatFrame)