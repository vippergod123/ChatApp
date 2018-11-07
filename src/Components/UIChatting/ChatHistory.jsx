import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'react-redux-firebase';
import moment from 'moment';
import LoadingSpinner from '../Plugin/LoadingSpinner';
import { HashUID } from '../../GlobalFunction/HashFunction';

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

const ChatHistory  = ({userLogged, users, conversations, paramID, onClick, }) => {

  var list = users.filter( each=> each.id === paramID) // getListUser match param ID
  var friend = list[0]

  
   if (isEmpty(friend)) {
    return (
      <div className = "card-action grey lighten-4 grey-text center flow-text">Click avatar on the left to chat with friends</div>
    )
    }
    else if(paramID === "t") {

        return (
          <div className = "card-action grey lighten-4 grey-text center flow-text">Click avatar on the left to chat with friends</div>
        )
 
    
  }
  else {
      var hashCode = HashUID(paramID,userLogged.uid);
      var listConversation = conversations.filter (each => each.id === hashCode.toString())
      const conversation = listConversation[0];
      if ( conversation) 
      {
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
      } else { 
        return(
          <button style = {buttonStyle} onClick ={ () => onClick(userLogged,friend)}><div className = "card-action grey lighten-4 grey-text center flow-text">You and him have no any conversation yet. CLick here to make contact</div></button>
        )
        
      }
  }
}

export default connect(
    mapStateToProps,
)(ChatHistory);