import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'react-redux-firebase';
import LoadingSpinner from '../Plugin/LoadingSpinner';
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

const ListFriend = ({userLogged, users, conversations, onClick}) => { 
    console.log(users);
    var friends = users;
    if(isEmpty(friends)) { 
        return (
            <div className="people-list" id="people-list">
            <div className="search">
            <input type="text" placeholder="Search..." />
            </div>
            <LoadingSpinner/>
            </div>
        )
    }
    else {
        friends = friends.filter(function( obj ) {
            return obj.uid !== userLogged.uid ;
        });

        friends.sort((a,b) => { 
            if (a.status > b.status)
                return -1;
            if (a.status < b.status)
                return 1;
            return (a.priority === b.priority)? 0 : a.priority? -1 : 1;
            
        })

        friends.sort((a,b) => { 
            if (a.status === "offline" && b.status === "offline") {
                if (a.lastLoginAt > b.lastLoginAt)
                    return -1;
                if (a.lastLoginAt < b.lastLoginAt)
                    return 1;
                return 0
            }
        })
       
        console.log(friends);
        
        
        return (
                <div className="people-list" id="people-list">
                <div className="search">
                    <input type="text" placeholder="Search..." />
                </div>
    
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
                                {each.status === "online"? <div>{each.status} <i className="fa fa-circle online"></i> </div> : <div> offline: {moment(date).fromNow() } <i className="fa fa-circle offline"></i></div>}

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