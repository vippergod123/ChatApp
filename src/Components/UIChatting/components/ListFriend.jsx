import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'react-redux-firebase';
import LoadingSpinner from '../../Plugin/LoadingSpinner';
import moment from 'moment';
import ReactAvatar from 'react-avatar';

function mapStateToProps(state) {
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

const ListFriend = ({userLogged, friends, statusOnline, onClick}) => { 
    
    console.log(statusOnline);
    console.log(friends);
    
    if(isEmpty(friends)) { 
        return (
            <div>
            <LoadingSpinner/>
            </div>
        )
    }
    else if ( friends.lenght === 0) { 
        return (
            <div>
            <div className = "flow-text center"> <br/> Make friends to have a </div>
            
        </div>
        )
    }
    else {
        // friends = friends.filter(function( obj ) {
        //     return obj.uid !== userLogged.uid ;
        // });

        

        friends.sort((a,b) => { 
            if (a.lastMessage > b.lastMessage)
                return -1;
            if (a.lastMessage < b.lastMessage)
                return 1;
            return 0
        })

        friends.sort((a,b) => {     
            if ( (a.status === "online"  && a.priority === true) && (b.status === "online"  && b.priority === true))
            return (a.priority === b.priority)? 0 : a.priority? -1 : 1;
        })

        return (
                <div>
               
    
                <ul className="list">
                    {friends.map((each,index) => {
                        
                        const sec = parseInt(each.lastLoginAt)
                        const date = new Date(sec)
                        
                        return (
                            <button style = {buttonStyle} key = {index} onClick = {() => onClick   (userLogged,each)}>
                            <li className="clearfix" key={index}>
                            
                            <ReactAvatar size="70"  src={each.photoURL}  className ="left" round = {true}/>
                            <div className="about">
                                {each.priority === true ?
                                <div className="name white-text">{each.displayName}<i className="fa fa-star online right"></i></div>
                                :<div className="name white-text">{each.displayName}</div>}

                                <div className="status">
                                {each.status === "online"? <div>{each.status} <i className="fa fa-circle online"></i> </div> : <div>off: {moment(date).fromNow()}</div>}

                                </div>
                            </div>
                            
                            </li>
                            </button>
                        )
                    })}
                </ul>
                </div>
            )
        }
}

export default connect(
    mapStateToProps,
)(ListFriend);