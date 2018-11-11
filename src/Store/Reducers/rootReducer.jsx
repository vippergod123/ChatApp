
// myRedcuer
import authReducer from './authReducer'
import  userDatabaseReducer from "./userDatabaseReducer"
import conversationReducer from "./conversationReducer"
import filterReducer  from "./filterReducer"
import uploadFileReducer from './uploadFileReducer';
import friendsReducer from "./friendsReducer"
//FirebaseReducer
import {combineReducers} from 'redux'
import { firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'



const rootReducer = combineReducers( { 
    
    users: userDatabaseReducer,
    filter: filterReducer,
    friends: friendsReducer,
    uploadFile: uploadFileReducer,
    
    auth:authReducer,
    conversation: conversationReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
})

export default  rootReducer