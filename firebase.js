// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAr1_cLtXiMDTgec85IoOOGgINaaFtnaAk",
  authDomain: "beagoo.firebaseapp.com",
  projectId: "beagoo",
  storageBucket: "beagoo.appspot.com",
  messagingSenderId: "987880042203",
  appId: "1:987880042203:web:541600cbcae55d0a5c26fe",
  measurementId: "G-YKBMNHXEZP",
};

const app = initializeApp(firebaseConfig);

// create a const db with the firestore instance with long polling option enabled
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

// Initialize Firebase
export { firebaseConfig, db };
