
function hashConversationID(a,b) { 
    var hashA = 0
    var hashB = 0
    for (var i = 0; i<a.length; i++){
        var tempA = a.charCodeAt(i)
        hashA +=  tempA
    }

    for (var j = 0; j<b.length; j++){
        var tempB = b.charCodeAt(j)
        hashB +=  tempB
    }
    return hashA+hashB
}

export const createConversation = (authUser,userClicked) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firebase = getFirebase();
        const hashID = hashConversationID(authUser.uid,userClicked.uid)

        var date = new Date(); // some mock date
        var createMilisecond = date.getTime();

        firebase.database().ref('conversation/' + hashID ).update({
            
            users:[
                {user: authUser},
                {user:  userClicked}
            ],
            timeCreatedAt: createMilisecond,
            history: [{
                sendAt: createMilisecond,
                text: "Hello !",
                uid: authUser.uid
            }]
        }).then( () => { 
            dispatch({ 
                type: "CREAT_CONVERSATION_SUCCESS",
            })
        }).catch( err => { 
            dispatch({ 
                type: "CREAT_CONVERSATION_ERROR",
                err: err,
            })
        });
        
    }
}



export const getConversation = (authUser,userClicked) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firebase = getFirebase();
        const hashID = hashConversationID(authUser.uid,userClicked.uid)
        
        firebase.database().ref('conversation/' + hashID ).on('value', snap => {
            var conversation = snap.val();
            dispatch({
                type: "GET_CONVERSATION_SUCCESS",
                conversation:conversation,
                userClicked: userClicked
            })
        })
        
    }
}



export const sendMessage = (authUser,userClicked,message) => { 
   
    
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firebase = getFirebase();
        const hashID = hashConversationID(authUser.uid,userClicked.uid)
        var date = new Date(); // some mock date
        var lastMilliseconds = date.getTime();

        firebase.database().ref('conversation/' + hashID + "" ).update({
            history: message,
            lastMessageAt: lastMilliseconds
        }).then( () => { 
            dispatch({ 
                type: "SEND_MESSAGE_SUCCESS",
            })
        }).catch( err => { 
            dispatch({ 
                type: "SEND_MESSAGE_ERROR",
                err: err,
            })
        });
        
    }
}