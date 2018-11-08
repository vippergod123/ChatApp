
// myRedcuer
import authReducer from './authReducer'
import  userDatabaseReducer from "./userDatabaseReducer"
import conversationReducer from "./conversationReducer"
import friendsReducer  from "./friendsReducer"
import uploadFileReducer from './uploadFileReducer';

//FirebaseReducer
import {combineReducers} from 'redux'
import { firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'



const rootReducer = combineReducers( { 
    
    users: userDatabaseReducer,
    friends: friendsReducer,
    uploadFile: uploadFileReducer,

    auth:authReducer,
    conversation: conversationReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
})

export default  rootReducer