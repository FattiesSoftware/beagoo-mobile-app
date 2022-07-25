import * as Facebook from "expo-facebook";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebaseConfig from "../firebase";

firebase.initializeApp(firebaseConfig);

const facebookLogin = async (setFbButtonDisabled) => {
  try {
    await Facebook.initializeAsync({
      appId: "1087511252159238",
      appName: "Beagoo",
    });
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"],
    });
    if (type === "success") {
      console.log(token);
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setFbButtonDisabled(false);
    }
  } catch ({ message }) {
    console.log(`Facebook login error: ` + message);
  }
};

export default facebookLogin;
