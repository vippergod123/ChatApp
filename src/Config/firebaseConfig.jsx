import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'
import 'firebase/firebase-database'

var config = {
    apiKey: "AIzaSyBDXnQO4CmhfgvvTrduoRnt1Cx0t3lJmdQ",
    authDomain: "chatapp074.firebaseapp.com",
    databaseURL: "https://chatapp074.firebaseio.com",
    projectId: "chatapp074",
    storageBucket: "chatapp074.appspot.com",
    messagingSenderId: "78211760043"
  };


firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots:true});

export default firebase;