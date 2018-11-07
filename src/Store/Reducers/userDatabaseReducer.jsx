const initState = {}
const userDatabaseReducer = (state = initState, action) => { 
    switch( action.type ) { 
        ////
        case "CREATE_USER":
            console.log('CREATE_USER');
            return state;
        case "CREATE_USER_ERROR":
            console.log('CREATE_USER_ERROR', action.err);
            return state;
        ////
        ////
        case "SET_USER_ONLINE_SUCCESS":
            console.log('SET_USER_ONLINE_SUCCESS');
            return state;
        case "SET_USER_ONLINE_ERROR":
            console.log('SET_USER_ONLINE_ERROR', action.err);
            return state;
        ////
        ////
        case "SET_USER_OFFLINE_SUCCESS":
            console.log('SET_USER_OFFLINE_SUCCESS');
            return state;
        case "SET_USER_OFFLINE_ERROR":
            console.log('SET_USER_OFFLINE_ERROR', action.err);
            return state;   
        //
        //
        case "SET_PRIORITY_FRIEND":
            console.log('SET_PRIORITY_FRIEND');
            return state;
        case "SET_PRIORITY_FRIEND_ERROR":
            console.log('SET_PRIORITY_FRIEND_ERROR', action.err);
            return state;  

        default:
            return state
    }
    
}

export default userDatabaseReducer