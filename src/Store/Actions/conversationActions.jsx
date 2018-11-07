
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
        const firestore = getFirestore();
        const hashID = hashConversationID(authUser.uid,userClicked.uid)

        var date = new Date(); // some mock date
        var createMilisecond = date.getTime();


        firestore.collection('conversations').doc(hashID.toString()).set({                    
            
            users:[
                {user: authUser},
                {user:  userClicked}
            ],
            timeCreatedAt: createMilisecond,
            lastMessage: 0,
            history: [{
                sendAt: createMilisecond,
                text: "Hello !",
                uid: authUser.uid
            }]

        }).then( () =>  { 
            dispatch({
                type: "CREAT_CONVERSATION_SUCCESS",
            });
        }).catch((err) => {
            dispatch({
                type: "CREAT_CONVERSATION_ERROR",
                err: err,
            });
        })

        // firebase.database().ref('conversation/' + hashID ).update({
            
        //     users:[
        //         {user: authUser},
        //         {user:  userClicked}
        //     ],
        //     timeCreatedAt: createMilisecond,
        //     history: [{
        //         sendAt: createMilisecond,
        //         text: "Hello !",
        //         uid: authUser.uid
        //     }]
        // }).then( () => { 
        //     dispatch({ 
        //         type: "CREAT_CONVERSATION_SUCCESS",
        //     })
        // }).catch( err => { 
        //     dispatch({ 
        //         type: "CREAT_CONVERSATION_ERROR",
        //         err: err,
        //     })
        // });
        
    }
}



export const sendMessage = (authUser,userClicked,message) => { 
   
    
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firebase = getFirebase();
        const firestore = getFirestore();

        const hashID = hashConversationID(authUser.uid,userClicked.uid)
        var date = new Date(); // some mock date
        var lastMilliseconds = date.getTime();
        firestore.collection('conversations').doc(hashID.toString()).update({                    
            history: message,
            lastMessageAt: lastMilliseconds
        }).then( () =>  { 
            dispatch({
                type: "SEND_MESSAGE_SUCCESS",
            });
        }).catch((err) => {
            dispatch({
                type: "SEND_MESSAGE_ERROR",
                err: err,
            });
        })  
    }
}