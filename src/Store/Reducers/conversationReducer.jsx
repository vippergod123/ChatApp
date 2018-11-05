const initState = {}
const conversationReducers = (state = initState, action) => { 
    switch( action.type ) { 
        ////
        case "CREAT_CONVERSATION_SUCCESS":
            console.log('CREAT_CONVERSATION_SUCCESS');
            return state;
        case "CREAT_CONVERSATION_ERROR":
            console.log('CREAT_CONVERSATION_ERROR', action.err);
            return state;
        ////
        ////            
        case "GET_CONVERSATION_SUCCESS":
            console.log('GET_CONVERSATION_SUCCESS');
            return {
                conversation: action.conversation,
                userClicked: action.userClicked
            }
                
        case "GET_CONVERSATION_ERROR":
            console.log('GET_CONVERSATION_ERROR', action.err);
            return state;
        
        ////
        ////            
        case "SEND_MESSAGE_SUCCESS":
            console.log('SEND_MESSAGE_SUCCESS');
            return action.conversation;
        case "SEND_MESSAGE_ERROR":
            console.log('SEND_MESSAGE_ERROR', action.err);
            return state;


        default:
            return state
    }
    
}

export default conversationReducers