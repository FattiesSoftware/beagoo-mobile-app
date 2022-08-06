import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { firebaseConfig } from "../firebase";

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export function uploadImageToStorage(path, imageName) {
  return new Promise((resolve, reject) => {
    const reference = storage.ref(imageName);
    const task = reference.put(path);

    task.on(
      "state_changed",
      function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            // console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            // console.log("Upload is running");
            break;
        }
      },
      function (error) {
        // Handle unsuccessful uploads
        reject(error);
      },
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          // console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
}

export default uploadImageToStorage;
