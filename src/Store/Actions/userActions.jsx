
export const createUser = (user) => {
    
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firestore = getFirestore();
        firestore.collection('users').doc(user.uid).set({                    
            ...user,
            status: "online",
            priority: false,
            friends: [],
            lastLoginAt: null,
        }).then( () =>  { 
            dispatch({
                type: "CREATE_USER",
            });
        }).catch((err) => {
            dispatch({
                type: "CREATE_USER_ERROR",
                err: err,
            });
        })
    }
}



export const setUserOnline = (userLogged) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        var firestore = getFirestore();
        firestore.collection('friends').get().then(snap => {
            
            snap.forEach(item => {
                // item.data().freinds - item.id
                var friends = item.data().friends;
                console.log(friends);
                
                friends.map (each => {
                    if (each.uid === userLogged.uid)
                        each.status = "online";
                })
                console.log(friends);
                
                firestore.collection('friends').doc(item.id.toString()).update ({
                    friends: friends,
                }).then( () =>  { 
                    dispatch({
                        type: "SET_USER_ONLINE_SUCCESS",
                    });
                }).catch((err) => {
                    dispatch({
                        type: "SET_USER_ONLINE_ERROR",
                        err: err,
                    });
                })

            })
            
        })
        
    }
}


export const setUserOffline = (userLogged) => { 
    return (dispatch, getState, {getFirebase, getFirestore}) => { 
        
        var firestore = getFirestore();
        var date = new Date(); // some mock date
        var lastMiliSecond = date.getTime();

        firestore.collection('friends').get().then(snap => {
            
            snap.forEach(item => {
                // item.data().freinds - item.id
                var friends = item.data().friends;
                console.log(friends);
                
                friends.map (each => {
                    if (each.uid === userLogged.uid)
                        each.status = "offline";
                        each.lastLoginAt = lastMiliSecond;
                })
                console.log(friends);
                
                firestore.collection('friends').doc(item.id.toString()).update ({
                    friends: friends,
                }).then( () =>  { 
                    dispatch({
                        type: "SET_USER_OFFLINE_SUCCESS",
                    });
                }).catch((err) => {
                    dispatch({
                        type: "SET_USER_OFFLINE_ERROR",
                        err: err,
                    });
                })

            })
            
        })
        

    }
}


export const setPriorityFriend = (userLogged, friend) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        // const firebase = getFirebase();

        const firestore = getFirestore();
        var friends = firestore.collection('friends').doc(userLogged.uid.toString())
        var listFriends = [];
        friends.get().then( thisDoc => { 
            listFriends = thisDoc.data().friends;
            
            
            listFriends.map (each => {
                
                if (friend.uid === each.uid) { 
                    console.log(each.displayName);
                    
                    each.priority = !each.priority;
                }
            })
            console.log(listFriends);
            
            friends.update ({
                friends: listFriends,
            })
            dispatch({ 
                type: "SET_USER_PRIORITY_SUCCESS",
            })
        }).catch (err => { 
            dispatch({ 
                type: "SET_USER_PRIORITY_ERROR",
                err: err,
            })
        })

    }
}
