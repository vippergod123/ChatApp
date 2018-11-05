
export const createUser = (user) => {
    
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firestore = getFirestore();
        const getListUser = []
        
    
        firestore.collection('users').get().then( snap => { 
            snap.forEach( doc=> { 
                getListUser.push({
                    user: doc.data()
                })
            })
                const index = getListUser.findIndex( each => each.user.uid === user.uid)
                console.log(index);
                
                if ( index === -1 ) { 
                    firestore.collection("users").add({ 
                        ...user,
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
                else {
                   
                }
        })
    }
}


export const getUserFromFireStore = () => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firestore = getFirestore();
        const getListUser = []

        

        firestore.collection('users').get().then( snap => { 
            snap.forEach( doc=> { 
                getListUser.push({
                    user: doc.data()
                })
            })
                getListUser.map( each => console.log("ASD"))
            dispatch({ 
                type: "GET_USER_STORE_SUCCESS",
                getListUser: getListUser,
            })
  
        }).catch( (err) => { 
            dispatch({
                type: "GET_USER_STORE_ERROR",
                err: err,
            });
        });
        
    }
}



export const setUserOnline = (userAuth) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firebase = getFirebase();

        

        firebase.database().ref('Friends/' + userAuth.uid ).update({
            
            status:'online',
            displayName: userAuth.displayName,
            uid: userAuth.uid,
            photoURL: userAuth.photoURL,
        }).then( () => { 
            dispatch({ 
                type: "SET_USER_ONLINE_SUCCESS",
            })
        }).catch( err => { 
            dispatch({ 
                type: "SET_USER_ONLINE_ERROR",
                err: err,
            })
        });
    }
}


export const setUserOffline = (user) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firebase = getFirebase();

        var date = new Date(); // some mock date
        var lastMilliseconds = date.getTime();

        firebase.database().ref('Friends/' + user.uid).update({
            lastLoginAt: lastMilliseconds,
            status:'offline',
            
        }).then( () => { 
            dispatch({ 
                type: "SET_USER_OFFLINE_SUCCESS",
            })
        }).catch( err => { 
            dispatch({ 
                type: "SET_USER_OFFLINE_ERROR",
                err: err,
            })
        });
    }
}


export const setPriorityFriend = (user) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firebase = getFirebase();

        firebase.database().ref('Friends/' + user.uid).update({
            priority: !user.priority
            
        }).then( () => { 
            dispatch({ 
                type: "SET_PRIORITY_FRIEND",
            })
        }).catch( err => { 
            dispatch({ 
                type: "SET_PRIORITY_FRIEND_ERROR",
                err: err,
            })
        });
    }
}
