const initState = {}
const uploadFileReducer = (state = initState, action) => { 
    switch( action.type ) { 
        ////
        case "UPLOAD_IMAGE_SUCCESS":
            console.log('UPLOAD_IMAGE_SUCCESS');
            return state;


        default:
            return state
    }
    
}

export default uploadFileReducer