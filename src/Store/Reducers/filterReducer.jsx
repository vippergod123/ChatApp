const initState = {}
const filterReducer = (state = initState, action) => { 
    switch( action.type ) { 
        ////
        case "FILTER_FRIENDS_SUCCESS":
            console.log('FILTER_FRIENDS_SUCCESS');
            return {
                filter: action.filter
            };
        
        default:
            return state
    }
    
}

export default filterReducer