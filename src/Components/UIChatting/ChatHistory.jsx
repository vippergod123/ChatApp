import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'react-redux-firebase';
import moment from 'moment';
import LoadingSpinner from '../Plugin/LoadingSpinner';

function mapStateToProps(state,ownProps) {
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

const ChatHistory  = ({fetchConversation,onClick, userLogged,paramID,friends}) => {
  var conversation = fetchConversation.conversation
  var userClicked = fetchConversation.userClicked
  
   if (isEmpty(userClicked)) {
    return (
      <div className = "card-action grey lighten-4 grey-text center flow-text">Click avatar on the left to chat with friends</div>
    )
    }
    else if(isEmpty(conversation)) {
      if (paramID === "t") {    
        return (
          <div className = "card-action grey lighten-4 grey-text center flow-text">Click avatar on the left to chat with friends</div>
        )
      }
      else {    
          
          if (!isEmpty(friends)) {
            var friend = friends.filter(a=> a.uid === paramID)       
          return(
              <button style = {buttonStyle} onClick ={ () => onClick(userLogged,friend[0])}><div className = "card-action grey lighten-4 grey-text center flow-text">You and him have no any conversation yet. CLick here to make contact</div></button>
            )
          }
          else { 
            return (
              <LoadingSpinner/>
            )
          }
      }
    
  }
  else {

      conversation.history.map ( each => { 
        if ( each.uid === userLogged.uid) 
        { 
          each.position = "right"
          each.displayName = userLogged.displayName
        }
        else {
          each.position = "left"
        }
      })

      return (
            <div>
                <div className="chat-history">
                  <ul>
                    {conversation.history.map((each,index) => {

                        const sec = parseInt(each.sendAt)
                        const date = moment(new Date(sec)).format('l') + " - "  +moment(new Date(sec)).format('LT')
                      
                        if(each.position === "right") { 
                          return (
                          /* My message */
                                <li className="clearfix" key = {index}>

                                    
                                    <div className="message-data align-right">
                                    
                                      <span className="message-data-time" >{date}</span> &nbsp; &nbsp;
                                      <span className="message-data-name" >{each.displayName}</span> <i className="fa fa-circle me"></i>
                            
                                    </div>
                                    <div className="message other-message right ">
                                        <div className = "right"> {each.text}</div>
                                    </div>
                                  </li>
                          )
                        }

                        else  { 
                          return(

                            ///Friend Message
                                  <li key = {index}>
                                    <div className="message-data">
                                        <span className="message-data-name left"><i className="fa fa-circle online"></i> {each.displayName}</span>
                                        <span className="message-data-time">{date}</span>

                                    </div>
                                    <div className="message my-message left">
                                          {each.text}
                                    </div>
                                  </li>
                          )
                        }
                    })}
                  </ul>  
                </div>
            </div>
      );
    }
}

export default connect(
    mapStateToProps,
)(ChatHistory);