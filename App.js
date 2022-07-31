import React from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import VerificationCodeScreen from "./screens/VerificationCodeScreen";
import AnimatedSplash from "react-native-animated-splash-screen";
import OAuthAddSteps from "./screens/OAuthAdditionalStep";
import * as RootNavigation from "./utils/RootNavigation";
import { useAuth } from "./hooks/useAuth";
import HomeScreen from "./screens/Home";
import firebase from "firebase/compat/app";
import firebaseConfig from "./firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default function App() {
  const [isSplashReady, setIsSplashReady] = React.useState(false);
  const [isAddNeeded, setIsAddNeeded] = React.useState(true);

  const Stack = createNativeStackNavigator();
  const { isSignedIn, user } = useAuth();

  const check = async () => {
    db.collection("users")
      .doc(JSON.parse(await AsyncStorage.getItem("user-more")).uid)
      .get()
      .then((res) => {
        // console.log("res:   ", res.data());
        console.log(
          "now restureuingi addidanstep ",
          res.data().additionalSteps
        );
        setIsAddNeeded(res.data().additionalSteps);
        // return res.data().additionalSteps;
      });
  };

  React.useEffect(() => {
    check();
    setTimeout(() => {
      setIsSplashReady(true);
    }, 1000);
    if (isSignedIn) {
      console.log("\n\nFirst Load\n====================");
      console.log("user is logged in");
      if (isAddNeeded) {
        RootNavigation.navigate("OAuthAdditionalSteps");
      } else {
        RootNavigation.navigate("Home");
      }
    }
  }, [isSignedIn, isAddNeeded]);

  return (
    <>
      <AnimatedSplash
        translucent={true}
        isLoaded={isSplashReady}
        logoImage={require("./assets/splash.png")}
        backgroundColor={"#C8E6E8"}
        logoHeight={150}
        logoWidth={150}
      >
        <NavigationContainer ref={RootNavigation.navigationRef}>
          <Stack.Navigator>
            {isSignedIn && isAddNeeded ? (
              <>
                <Stack.Screen
                  name="OAuthAdditionalSteps"
                  component={OAuthAddSteps}
                  options={{
                    headerShown: false,
                    gestureEnabled: false,
                  }}
                />
              </>
            ) : isSignedIn && !isAddNeeded ? (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Welcome"
                  component={WelcomeScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="VerificationCode"
                  component={VerificationCodeScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="OAuthAdditionalSteps"
                  component={OAuthAddSteps}
                  options={{
                    headerShown: false,
                    gestureEnabled: false,
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AnimatedSplash>
    </>
  );
}
