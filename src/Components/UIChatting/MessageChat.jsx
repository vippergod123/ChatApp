import React, { Component } from 'react';

class MessageChat extends Component {
    hashID = () =>  { 
        
    }
    render() {
        return (
            <div className="chat-message clearfix">
                <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                
                <button>Send</button>

            </div>
        );
    }
}

export default MessageChat;