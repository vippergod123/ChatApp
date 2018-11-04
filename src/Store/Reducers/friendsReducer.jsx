const initState = {}
const friendsDatabaseReducer = (state = initState, action) => { 
    switch( action.type ) { 
        ////
        case "GET_FRIENDS_SUCCESS":
            console.log('GET_FRIENDS_SUCCESS');
            return action.friends;
        
        ////
        case "MAKE_FRIENDS_SUCCESS":
            console.log('MAKE_FRIENDS_SUCCESS');
            return state
            
        case "MAKE_FRIENDS_SUCCESS_ERROR":
            console.log('MAKE_FRIENDS_SUCCESS_ERROR');
            return state
        ////            
       

        default:
            return state
    }
    
}

export default friendsDatabaseReducer