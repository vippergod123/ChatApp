
// myRedcuer
import authReducer from './authReducer'
import  userDatabaseReducer from "./userDatabaseReducer"
import conversationReducer from "./conversationReducer"
//FirebaseReducer
import {combineReducers} from 'redux'
import { firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'

const rootReducer = combineReducers( { 
    auth:authReducer,
    users: userDatabaseReducer,
    conversation: conversationReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
})

export default  rootReducer