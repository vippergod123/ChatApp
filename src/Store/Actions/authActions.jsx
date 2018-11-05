export const signIn = (credentials) => { 
    return (dispatch , getState, {getFirebase}) => { 
        const firebase = getFirebase() ;
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password,
        ).then(() => 
            { 
            dispatch({
                type: "LOGIN_SUCCESS"})
            }).catch((err)=> 
            { 
                dispatch({ 
                    type: "LOGIN_ERROR",
                    err:err,
            })
        })
    }
}

export const signInWithGoogle = (credentials) => { 
    return (dispatch, getState, {getFirebase}) => { 
        const firebase = getFirebase();
        const provider = new firebase.auth.GoogleAuthProvider()
        
        // Set Online database realtime userUID


        firebase.auth().signInWithPopup(
            provider
        ).then(() => 
            {          
            dispatch({
                type: "LOGIN_GOOGLE_SUCCESS"})
            }).catch((err)=> 
            { 
                dispatch({ 
                    type: "LOGIN_GOOGLE_ERROR",
                    err:err,
            })
        })
        
        
    }
}

export const signOut = () => { 
    return (dispatch, getState, {getFirebase}) => { 
        const firebase = getFirebase();
         
        firebase.auth().signOut().then( () => {
            dispatch({
                type: "SIGN_OUT_SUCCESS"
            })
        })
    }  
}
