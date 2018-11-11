export const createFriend = (userLogged, listUsers) => {
    
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firestore = getFirestore();

        var date = new Date(); // some mock date
        var createMilisecond = date.getTime();
        
        listUsers = listUsers.filter(each => each.uid !== userLogged.uid);

        listUsers.map(each => { 
            each.lastMessage = 0;
            each.priority = false;
            each.lastLoginAt = createMilisecond;
            each.status = "online"
        })

        
        
        firestore.collection('friends').doc(userLogged.uid).set({                    
            friends: listUsers,
        }).then( () =>  { 
            dispatch({
                type: "CREATE_FRIEND",
            });
        }).catch((err) => {
            dispatch({
                type: "CREATE_FRIEND_ERROR",
                err: err,
            });
        })
    }
}


export const addFriend = (userLogged, listUsers, friends) => {
    
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firestore = getFirestore();

        var date = new Date(); // some mock date
        var createMilisecond = date.getTime();
        
        listUsers = listUsers.filter(each => each.uid !== userLogged.uid);

        listUsers.map(each => { 
            each.lastMessage = 0;
            each.priority = false;
            each.lastLoginAt = createMilisecond;
        })



        
        listUsers.forEach(each => { 
            friends.forEach(friend => { 
                if ( each.uid === friend.uid) {
                    each.lastMessage = friend.lastMessage;
                    each.priority = friend.priority;
                    each.lastLoginAt = friend.lastLoginAt;
                    each.status = friend.status
                }
            })
        })

      
        firestore.collection('friends').doc(userLogged.uid).set({                    
            friends: listUsers,
        }).then( () =>  { 
            dispatch({
                type: "ADD_FRIEND",
            });
        }).catch((err) => {
            dispatch({
                type: "ADD_FRIEND_ERROR",
                err: err,
            });
        })
    }
}