import { useState, useEffect } from "react";
import firebase, { auth } from "firebase/compat/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAuth() {
  const [authState, setAuthState] = useState({
    isSignedIn: false,
    pending: true,
    user: null,
    // additionalSteps: null,
  });

  const readStorage = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user != "null") {
        setAuthState({
          isSignedIn: true,
          pending: false,
          user: JSON.parse(user),
        });
        console.log("user found, now returning true");
        console.log("data from storage: ", await AsyncStorage.getItem("user"));
        return true;
      } else {
        setAuthState({
          isSignedIn: false,
          pending: false,
          user: null,
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

  useEffect(() => {
    readStorage()
      .then((isSignedIn) => {
        if (isSignedIn) {
          // navigate("OAuthAdditionalSteps");
          // do something...
        } else {
          const unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged((user) => {
              setAuthState({ user, pending: false, isSignedIn: !!user });
              writeStorage(user);
            });
          return () => unregisterAuthObserver();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { auth, ...authState };
}

export default useAuth;
