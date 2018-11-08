import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'

export const handleChangeFile = (event) => {
    const file = event.target.files[0];
    console.log(file);
    
    let formData = new FormData();
    formData.append('file', file);

    var firebase = getFirebase()
    var storageRef = firebase.storage().ref('conversations/4001/upload/images/'+file.name);
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
          });
        
      });
    //Make a request to server and send formData
}
