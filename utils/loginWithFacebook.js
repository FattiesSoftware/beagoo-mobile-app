import * as Facebook from "expo-facebook";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseConfig } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const setItem = async (value) => {
  await AsyncStorage.setItem("new-user", JSON.stringify(value));
};

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
          // console.log(res);
          console.log("additional info: ", res.additionalUserInfo);
          console.log("credential info:   ", credential);
          if (res.additionalUserInfo.isNewUser) {
            setItem(true);
            console.log("new user creating..........", res.user.uid);
            db.collection("users")
              .doc(res.user.uid)
              .set({
                name: res.user.displayName,
                email: res.user.email,
                photo: res.user.photoURL,
                createdAt: new Date(),
                additionalSteps: true,
                needToUpdateAvatar: true,
              })
              .then(() => {
                db.collection("posts")
                  .add({
                    type: "avatar",
                    image: res.user.photoURL,
                    owner: res.user.uid,
                    ownerName: res.user.displayName,
                    shouldShowOnFeed: true,
                    caption: "",
                    like: 0,
                    comment: 0,
                    share: 0,
                    createdAt: new Date(),
                  })
                  .catch((err) => console.error(err));
              })
              .catch((err) => console.error(err));
          } else {
            console.log("user already exists");
            setItem(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setFbButtonDisabled(false);
        });
    } else {
      setFbButtonDisabled(false);
    }
  } catch ({ message }) {
    console.log(`Facebook login error: ` + message);
    setFbButtonDisabled(false);
  }
};

export default facebookLogin;
