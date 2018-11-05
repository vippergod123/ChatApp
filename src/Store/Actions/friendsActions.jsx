export const makeFriends = (authUser) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firebase = getFirebase();


        var date = new Date(); // some mock date
        var lastMilliseconds = date.getTime();
        
        firebase.database().ref('Friends/' + authUser.uid ).update({
            displayName: authUser.displayName,
            uid: authUser.uid,
            photoURL: authUser.photoURL,
            lastLoginAt: lastMilliseconds,
        }).then( () => { 
            dispatch({ 
                type: "MAKE_FRIENDS_SUCCESS",
            })
        }).catch( err => { 
            dispatch({ 
                type: "MAKE_FRIENDS_SUCCESS_ERROR",
                err: err,
            })
        });
    }
}

export const getFriends = () => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firebase = getFirebase();
        var getListUser = []
        firebase.database().ref('Friends/').on('value', snap => {
            var ads = snap.val();
            Object.keys(ads).map((objectKey, index) => {
                var value = ads[objectKey];
                getListUser.push(value)
            })
            
            dispatch({
                type:  "GET_FRIENDS_SUCCESS",
                friends: getListUser
            })
            getListUser = []
        })
        
    }
}


// var getListUser = []
// this.database.on('value', snap => {
//     var ads = snap.val();

//     Object.keys(ads).map(function(objectKey, index) {
//         var value = ads[objectKey];
//         getListUser.push(value);
//     })

//     this.setState({
//         listUserOnline: getListUser
//     })
//     getListUser = []
// })