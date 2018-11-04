import React, { Component } from 'react';

//Action
import {createConversation} from '../../Store/Actions/conversationActions'

//Firebase
import {connect} from 'react-redux'
import {getFirebase, isEmpty} from 'react-redux-firebase'
import {compose} from 'redux'

//Plugin
import LoadingSpinner from '../Plugin/LoadingSpinner'
import moment from "moment"
import Avatar from "react-avatar"

class HistoryChat extends Component {

  constructor(props) {
    super(props);
  }
  
  
  componentDidMount() { 
    
  } 

  render() {
      const userLogged = this.props.auth
      const cons = this.props.conversation

      console.log(cons);
    
      if(isEmpty(cons)) { 
        return (
          <div className = "card-action grey lighten-4 grey-text center flow-text">Click A Friend on the left that you want to talk to !! </div>
        )
      } else {
        cons.history.map ( each => { 
          
          
          if ( each.uid === userLogged.uid) { 
            each.position = "right"
            each.displayName = userLogged.displayName
          }
          else {
            each.position = "left"
            
          }
        })
        console.log(cons.history);
        // this.props.createConversation(userLogged.uid,"16wQ8bCKeGYNiYgBUMjhuP4LFKT2")
        
      return (
        
    <div className="chat-history">
      <ul>
        {cons.history.map((each,index) => {
            if(each.position === "right") { 
              return (
              /* My message */
                    <li className="clearfix" key = {index}>

                        
                        <div className="message-data align-right">
                        
                          <span className="message-data-time" >{each.sendAt}</span> &nbsp; &nbsp;
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
                            <span className="message-data-time">{each.sendAt}</span>

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

      );
      }
  }
}



const mapStateToProps = (state) => { 
  return { 
      auth: state.firebase.auth,
      conversation: state.conversation
  }
}


const mapDispatchToProps = (dispatch) => { 
  return { 
    createConversation: (authUID,paramUID) => dispatch(createConversation(authUID,paramUID)),

  }
}


export default connect(mapStateToProps,mapDispatchToProps)(HistoryChat);