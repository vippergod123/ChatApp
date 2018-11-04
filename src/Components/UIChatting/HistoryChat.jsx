import React, { Component } from 'react';

//Router
import {withRouter} from 'react-router-dom'
//Action
import {createConversation,sendMessage} from '../../Store/Actions/conversationActions'

//Firebase
import {connect} from 'react-redux'
import {getFirebase, isEmpty} from 'react-redux-firebase'


//Plugin
import LoadingSpinner from '../Plugin/LoadingSpinner'
import moment from "moment"
import Avatar from "react-avatar"

class HistoryChat extends Component {

  constructor(props) {
    super(props);
    this.state = { 
        conversation: {},
        userLogged: {},
        isLoaded: false,
        idParams: this.props.match.params.id
    }
  }
  
  
  componentWillReceiveProps() { 
      this.setState({
        userLogged: this.props.auth,
        conversation:this.props.conversation,
        isLoaded: true
      })
  }


  handleSendMessage (e) {
    e.preventDefault();
    const term = this.refs.tags.value;
    this.setState({
      text: term
    })
    this.refs.tags.value = ""
    const usersChat = this.props.conversation.users
    console.log(usersChat);
    var message = this.props.conversation.history
    
    var date = new Date(); // some mock date
    var lastMilliseconds = date.getTime();
    
    message.push( {
      sendAt: lastMilliseconds,
      uid: this.props.auth.uid,
      text: term,
    })
    
    this.props.sendMessage(usersChat[0].uid,usersChat[1].uid,message)
  } 

  handleSendMessageByEnter(e) { 
      var key = window.event.keyCode
      if (key === 13) {
          this.handleSendMessage(e)
      }
      
  }

  handleCreateConversation(authUID,paramsUID) { 
    this.props.createConversation(authUID,paramsUID)
  }

  render() {
      const userLogged = this.props.auth
      const cons = this.props.conversation

      console.log(cons);
      console.log(this.state.isLoaded);
      
      
      if(isEmpty(cons)) {
          const idParams = this.state.idParams
          
          
            if (idParams !== "t" && userLogged.uid && this.state.isLoaded === true) { 
              console.log("ASDKOQWIEQOWEIOQWIEOW");
              return (
                <a onClick ={ () => this.handleCreateConversation(userLogged.uid,idParams)}><div className = "card-action grey lighten-4 grey-text center flow-text">Both of you dont have any conversation yet! Click here to make connection </div></a>
                ) 
              // this.props.createConversation(userLogged.uid,idParams)
            }
            return (
              <div className = "card-action grey lighten-4 grey-text center flow-text">Click avatar on the left to start a conversation </div>
              ) 
        
      } else {
        console.log(cons);
        

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
      <div>
          <div className="chat-history">
            <ul>
              {cons.history.map((each,index) => {

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
          <div className="chat-message clearfix">
              <textarea name="message-to-send" onKeyPress= {this.handleSendMessageByEnter.bind(this)} id="message-to-send" placeholder="Type your message" rows="3" name = "tag" ref= "tags"></textarea>
              <button onClick = {this.handleSendMessage.bind(this)}>Send</button>   
          </div>
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
    sendMessage: (authUID,paramUID,text) => dispatch(sendMessage(authUID,paramUID,text)),
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HistoryChat))