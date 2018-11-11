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