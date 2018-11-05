import React, { Component } from 'react';
import {connect} from 'react-redux'
import LoadingSpinner from '../Plugin/LoadingSpinner';
import Avatar from 'react-avatar';
import { isEmpty } from 'react-redux-firebase';

import {Row,Col} from "reactstrap"
import moment from 'moment';
import {getConversation} from "../../Store/Actions/conversationActions"

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            friends:[],
            isLoaded:false,
            isLogged: false
        }
    }
    
    componentWillReceiveProps(){
        this.setState({
            friends:this.props.friends? this.props.friends:[],
            isLoaded : isEmpty(this.props.friends)? false:true,
            isLogged: this.props.auth.uid? true:false
        }) 
    }
    
    handleClickFriends(userClicked) { 
        this.props.history.replace("../chat/"+userClicked.uid);
    }


    render() {
        
        const userLogged = this.props.auth
        
        var friends = this.state.friends
       console.log(this.state.isLoaded);
       
        
        if (this.state.isLoaded === true) {
            friends = friends.filter(function( obj ) {
                return obj.uid !== userLogged.uid ;
            });
        return (  
            
            <div className = "container">
                <br/>
                <h1 className=""> List Friends</h1>
                <Row>
                    {friends.map((each,index)=> {
                        const sec = parseInt(each.lastLoginAt)
                        const date = new Date(sec)
                        return(
                        <Col key = {index}>
                        <a onClick = {() => this.handleClickFriends(userLogged,each)}>
                            <div className ="flow-text grey-text">
                            <Avatar src = {each.photoURL} size ={80} round = {true} />  
                             <i> {each.displayName} </i>
                             {each.status === "online"? <div>Status: {each.status}</div> : <div>Status: {moment(date).fromNow()}</div>}
                             </div>
                        </a>
                              
                            
                        </Col> 
                        )}
                    )}
                </Row>
            </div>
            
        )}
        else if ( this.state.isLoaded === false)  { 
                if ( this.state.isLogged === false )  { 
                    return (
                        <div className = "container">
                        <br/>
                        <h1 className="center"> Login to talk with friends</h1>
                        </div>
                )}
                
                else {
                return (
                    <div className = "container">
                    <br/>
                    <h1 className=""> List Friends</h1>
                    <LoadingSpinner/>
                    <div className = "center">Refresh if it's loading too long...</div>
                    </div>
                )}
            }
    }
}

const mapStateToProps = (state) => { 
    
    return {
        friends: state.friends,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => { 
    return { 
        getConversation:(authUID,paramUID) => dispatch(getConversation(authUID,paramUID)),
    }
}
export default 
    connect(mapStateToProps,mapDispatchToProps)(Dashboard);