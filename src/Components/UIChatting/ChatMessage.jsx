import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

const ChatMessage = () => { 
    return (
        <div className="chat-message clearfix">
            <textarea name="message-to-send" onKeyPress= {this.handleSendMessageByEnter.bind(this)} id="message-to-send" placeholder="Type your message" rows="3" name = "tag" ref= "tags"></textarea>
            <button onClick = {this.handleSendMessage.bind(this)}>Send</button>   
        </div>
    )
}

export default connect(
    mapStateToProps,
)(ChatMessage);