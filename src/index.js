import React from 'react'
import { render } from 'react-dom'
import App from './App'


import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import rootReducer from './Store/Reducers/rootReducer'

import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'
import { getFirestore, reduxFirestore } from 'redux-firestore'
import firebaseConfig from './Config/firebaseConfig'
// import getMiddlewares from './Config/middlewares'

const store = createStore(rootReducer,
    compose(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(firebaseConfig),
        reactReduxFirebase(firebaseConfig, { useFirestoreForProfile: true, userProfile: "users", attachAuthIsReady: true })));


render( <Provider store = { store } >
        <App />
        </Provider>, document.getElementById('root'));