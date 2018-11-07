
export const createUser = (user) => {
    
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firestore = getFirestore();
        const getListUser = []
        
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



export const setUserOnline = (userAuth) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firebase = getFirebase();
        const firestore = getFirestore(); 


        firestore.collection('users').doc(userAuth.uid.toString()).update({
            status: "online",
        }).then (() =>{ 
            dispatch({ 
                type: "SET_USER_ONLINE_SUCCESS",
            })
        }).catch((err) => {
            dispatch({ 
                type: "SET_USER_ONLINE_ERROR",
                err: err,
            })
        })

    }
}


export const setUserOffline = (userAuth) => { 
    return (dispatch, getState, {getFirebase, getFirestore}) => { 
        // const firebase = getFirebase();
        
        var date = new Date(); // some mock date
        var lastMilliseconds = date.getTime();

        const firestore = getFirestore();

        firestore.collection('users').doc(userAuth.uid.toString()).update({
            status: "offline",
            lastLoginAt: lastMilliseconds,
        }).then (() =>{ 
            dispatch({ 
                type: "SET_USER_OFFLINE_SUCCESS",
            })
        }).catch((err) => {
            dispatch({ 
                type: "SET_USER_OFFLINE_ERROR",
                err: err,
            })
        })

    }
}


export const setPriorityFriend = (userAuth) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        // const firebase = getFirebase();

        const firestore = getFirestore();

        firestore.collection('users').doc(userAuth.uid.toString()).update({
            priority: !userAuth.priority,
        }).then (() =>{ 
            dispatch({ 
                type: "SET_USER_OFFLINE_SUCCESS",
            })
        }).catch((err) => {
            dispatch({ 
                type: "SET_USER_OFFLINE_ERROR",
                err: err,
            })
        })

    }
}
