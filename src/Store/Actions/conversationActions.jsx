
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

        firebase.database().ref('conversation/' + hashID ).update({
            
            users:[
                {uid:authUID},
                {uid:paramUID}
            ],
            timeCreatedAt: new Date(),
            history: [
                {
                    sendAt: "12h30",
                    uid: authUID,
                    text: "hello there",
                },
                {
                    sendAt: "12h31",
                    uid: paramUID,
                    text: "what's ur name ?",
                },
                {
                    sendAt: "12h35",
                    uid: authUID,
                    text: "Duy",
                },
                {
                    sendAt: "12h30",
                    uid: authUID,
                    text: "And you?",
                },
                {
                    sendAt: "12h31",
                    uid: paramUID,
                    text: "Xyz, nice to meet you",
                },
                {
                    sendAt: "12h35",
                    uid: authUID,
                    text: "yeah right! Me tooo ",
                }
            ]
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


