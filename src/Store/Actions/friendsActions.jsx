export const makeFriends = (authUser, listUser) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firebase = getFirebase();

        listUser = listUser.filter(function( obj ) {
            return obj.user.uid !== authUser.uid ;
        });

        var friends = []
        listUser.map(each=> { 
            friends.push({
                status:'online',
                displayName: each.user.displayName,
                uid: each.user.uid,
                photoURL: each.user.photoURL,
            })
        })

        
        firebase.database().ref('Friends/' + authUser.uid ).update({
        
            users: friends
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

export const getFriends = (authUID) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        const firebase = getFirebase();
        var getListUser = []
        firebase.database().ref('Friends/' + authUID.uid ).on('value', snap => {
            var ads = snap.val();
            Object.keys(ads).map(function(objectKey, index) {
                var value = ads[objectKey];
                getListUser = value
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