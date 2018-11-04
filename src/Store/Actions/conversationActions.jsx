
function hashConversationID(a,b) { 
    var hashA = 0
    var hashB = 0
    for (var i = 0; i<a.length; i++){
        var temp = a.charCodeAt(i)
        hashA +=  temp
    }

    for (var i = 0; i<b.length; i++){
        var temp = b.charCodeAt(i)
        hashB +=  temp
    }
    return hashA+hashB
}

export const createConversation = (authUID,paramUID) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firebase = getFirebase();
        const hashID = hashConversationID(authUID,paramUID)

        var date = new Date(); // some mock date
        var createMilisecond = date.getTime();

        firebase.database().ref('conversation/' + hashID ).update({
            
            users:[
                {uid:authUID},
                {uid:paramUID}
            ],
            timeCreatedAt: createMilisecond,
            history: [{
                sendAt: createMilisecond,
                text: "Hello !",
                uid: paramUID
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



export const getConversation = (authUID,paramUID) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firebase = getFirebase();
        const hashID = hashConversationID(authUID,paramUID)
        
        firebase.database().ref('conversation/' + hashID ).on('value', snap => {
            var conversation = snap.val();
            dispatch({
                type: "GET_CONVERSATION_SUCCESS",
                conversation:conversation
            })
        })
        
    }
}



export const sendMessage = (authUID,paramUID,message) => { 
   
    
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firebase = getFirebase();
        const hashID = hashConversationID(authUID,paramUID)
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