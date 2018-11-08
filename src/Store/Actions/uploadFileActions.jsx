export const uploadImage  = (file) => { 
    return (dispatch,getState, {getFirebase, getFirestore}) => { 
        var firebase = getFirebase();

        var storageRef = firebase.storage().ref('img/'+file.name);
        var task = storageRef.put(file);
        
        task.on('state_changed', function progress(snapshot) {
            
        })

        dispatch({
            type: "UPLOAD_IMAGE_SUCCESS"
        })
    }
}