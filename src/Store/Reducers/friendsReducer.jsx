const initState = {}
const friendsReducer = (state = initState, action) => { 
    switch( action.type ) { 
        ////
        case "FILTER_FRIENDS_SUCCESS":
            console.log('FILTER_FRIENDS_SUCCESS');
            return {
                filterFriends: action.filterFriends
            };
        
        default:
            return state
    }
    
}

export default friendsReducer