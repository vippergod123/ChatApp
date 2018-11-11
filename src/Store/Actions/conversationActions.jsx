
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
            lastMessage: createMilisecond,
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

     
        
    }
}



export const sendMessage = (conversation,userLogged,message) => { 
   
    
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firestore = getFirestore();

        var history = conversation.history
        var users =  conversation.users
        var date = new Date(); // some mock date
        var lastMilliseconds = date.getTime();
        
        history.push( {
            sendAt: lastMilliseconds,
            uid: userLogged.uid,
            text: message,
            displayName: userLogged.displayName,
        })

        const hashID = hashConversationID(users[0].user.uid,users[1].user.uid)
        firestore.collection('conversations').doc(hashID.toString()).update({                    
            history: history,
            lastMessageAt: lastMilliseconds
        })  

        firestore.collection('friends').doc(users[0].user.uid.toString()).get().then( thisDoc => { 
            var listFriends = [];
            listFriends = thisDoc.data().friends;
            
            
            listFriends.map (each => {
                if (each.uid === users[1].user.uid) { 
                    each.lastMessage = lastMilliseconds;
                }
            })
 
            
            firestore.collection('friends').doc(users[0].user.uid.toString()).update ({
                friends: listFriends,
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
        })

       
        firestore.collection('friends').doc(users[1].user.uid.toString()).get().then( thisDoc => { 
            var listFriends = [];
            listFriends = thisDoc.data().friends;
            
            
            listFriends.map (each => {
                if (each.uid === users[0].user.uid) { 
                    each.lastMessage = lastMilliseconds;
                }
            })
            
            firestore.collection('friends').doc(users[1].user.uid.toString()).update ({
                friends: listFriends,
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
        })

        


        


    }
}