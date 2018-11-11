const initState = {}
const friendsReducer = (state = initState, action) => { 
    switch( action.type ) { 
        ////
        case "CREATE_FRIEND":
            console.log('CREATE_FRIEND');
            return state;
        case "CREATE_FRIEND_ERROR":
            console.log('CREATE_FRIEND_ERROR', action.err);
            return state;
        ////
        default:
            return state
    }
    
}

export default friendsReducer