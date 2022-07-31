import { useState, useEffect } from "react";
import firebase, { auth } from "firebase/compat/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebaseConfig from "../firebase";

firebase.initializeApp(firebaseConfig);

export function useAuth() {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;

  // console.log("db: ", db);
  // console.log("FB User:    => ", firebase.auth());

  const [authState, setAuthState] = useState({
    isSignedIn: false,
    pending: true,
    user: null,
    additionalSteps: true,
  });

  const checkForAdditionalSteps = () => {
    console.log("executing check");
    // console.log("auth staet user: ", user);
    if (firebase.auth().currentUser != null) {
      console.log("uid :  ", user.uid);
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((res) => {
          // console.log("res:   ", res.data());
          console.log("additional steps: ", res.data().additionalSteps);
          console.log("type:: ", typeof res.data().additionalSteps);
          if (res.data().additionalSteps) {
            return true;
          } else {
            return false;
          }
        });
    }
  };

  const readStorage = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user != "null" && user != null) {
        setAuthState({
          isSignedIn: true,
          pending: false,
          user: JSON.parse(user),
          additionalSteps: checkForAdditionalSteps(),
        });
        console.log("user found, now returning true");
        console.log("if tru:::  ", checkForAdditionalSteps());
        // console.log(
        //   "data from storage: ",
        //   JSON.parse(await AsyncStorage.getItem("user"))
        // );
        return true;
      } else {
        setAuthState({
          isSignedIn: false,
          pending: false,
          user: null,
          additionalSteps: checkForAdditionalSteps(),
        });
        console.log("user login state not found, now returning false");
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const writeStorage = async (user) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };

  const signOutUser = async () => {
    console.log("signing out user");
    await AsyncStorage.clear();
    firebase.auth().signOut();
  };

  useEffect(() => {
    readStorage()
      .then((isSignedIn) => {
        if (isSignedIn) {
          // do something...
          console.log("is signed in hook true");
          // signOutUser();
          // setAuthState({
          //   ...authState,
          //   additionalSteps:  v,
          // });
        } else {
          const unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged((user) => {
              setAuthState({
                user,
                pending: false,
                isSignedIn: !!user,
                additionalSteps: checkForAdditionalSteps(),
              });
              writeStorage(user);
            });
          return () => unregisterAuthObserver();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { auth, ...authState, signOutUser };
}

export default useAuth;
