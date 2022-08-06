import { useState, useEffect } from "react";
import firebase, { auth } from "firebase/compat/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebaseConfig from "../firebase";
import * as RootNavigation from "../utils/RootNavigation";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export function useAuth() {
  const [authState, setAuthState] = useState({
    isSignedIn: false,
  });

  const readStorage = async () => {
    const userData = await AsyncStorage.getItem("current-user");
    if (userData != "null" && userData != null) {
      setAuthState({
        isSignedIn: true,
      });
      // console.log("user login state is *found*, now returning true");
      return true;
    } else {
      setAuthState({
        isSignedIn: false,
      });
      console.log("user login state not found, now returning false");
      return false;
    }
  };

  const writeStorage = async (type, data) => {
    try {
      if (type == "credential") {
        await AsyncStorage.setItem("current-user", JSON.stringify(data));
      } else {
        await AsyncStorage.setItem("user-more", JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signOutUser = async () => {
    console.log("signing out user");
    await AsyncStorage.clear();
    firebase.auth().signOut();
    setTimeout(() => {
      RootNavigation.navigate("Welcome");
    }, 800);
  };

  useEffect(() => {
    readStorage()
      .then((isSignedIn) => {
        if (isSignedIn) {
          // do something...
          // console.log("is signed in hook true");
          // signOutUser();
        } else {
          const unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged((user) => {
              setAuthState({
                isSignedIn: !!user,
              });
              writeStorage("credential", user);
              console.log("firebase curenus:  ", firebase.auth().currentUser);
              writeStorage("more", firebase.auth().currentUser);
            });
          return () => unregisterAuthObserver();
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => readStorage();
  }, []);
  return { auth, ...authState, signOutUser };
}

export default useAuth;
