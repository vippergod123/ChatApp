import { getFirebase } from 'react-redux-firebase'
import { getFirestore } from 'redux-firestore'

import { HashUID } from '../../GlobalFunction/HashFunction';

export const handleChangeFile = (event, conversation,userLogged) => {
    const file = event.target.files[0];
    console.log(file);

    var history = conversation.history
    var users =  conversation.users
    const hashID = HashUID(users[0].user.uid,users[1].user.uid)
    
    let formData = new FormData();
    formData.append('file', file);

    var firebase = getFirebase()
    var storageRef = firebase.storage().ref('conversations/'+ hashID.toString() +'/upload/images/');
    var task = storageRef.put(file);
    
    task.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        case firebase.storage.TaskState.SUCCESS: // or 'running'
            console.log('Upload is SUCCESS');
            break;
        }
      }, err => {
            console.log(err);
            
      }, (downloadURL) => {
        console.log('Upload is SUCCESS');
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL);
              const firestore = getFirestore();

              
              var date = new Date(); // some mock date
              var lastMilliseconds = date.getTime();
              
              history.push( {
                  sendAt: lastMilliseconds,
                  uid: userLogged.uid,
                  text: downloadURL,
              })

              firestore.collection('conversations').doc(hashID.toString()).update({                    
                  history: history,
                  lastMessageAt: lastMilliseconds
              })
          });        
      });
    //Make a request to server and send formData
}

