
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
  
            getListUser.map(each => { 
                 
            })
        }).catch( (err) => { 
            dispatch({
                type: "GET_USER_STORE_ERROR",
                err: err,
            });
        });
        
    }
}



export const setUserOnline = (user) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firebase = getFirebase();
        // firebase.database().ref('Friends/' + user.uid ).update({
            
        //     status:'online',
        //     displayName: user.displayName,
        //     uid: user.uid,
        //     photoURL: user.photoURL,
        // }).then( () => { 
        //     dispatch({ 
        //         type: "SET_USER_ONLINE_SUCCESS",
        //     })
        // }).catch( err => { 
        //     dispatch({ 
        //         type: "SET_USER_ONLINE_ERROR",
        //         err: err,
        //     })
        // });


        // firebase.database().ref('/Friends/5jI3uuJKljbLFFtpayeN54KW5To2/users').orderByChild('uid').equalTo("DkdFDBMy11N02NqEhuuK60wJs8t2").on("value", function(snapshot) {
        //     console.log(snapshot.val());
        //     snapshot.forEach(function(data) {
        //         data.ref.update({ status: "offline" })
        //     });
        // });
        
    }
}


export const setUserOffline = (user) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firebase = getFirebase();

       

        
        firebase.database().ref('Friends/' + user.uid).update({
            lastLoginAt: user.lastLoginAt,
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

