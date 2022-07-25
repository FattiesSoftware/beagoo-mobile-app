import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import VerificationCodeScreen from "./screens/VerificationCodeScreen";
import AnimatedSplash from "react-native-animated-splash-screen";
import OAuthAddSteps from "./screens/OAuthAdditionalStep";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { navigationRef, navigate } from "./utils/RootNavigation";

export default function App() {
  const [isSplashReady, setIsSplashReady] = React.useState(false);

  const Stack = createNativeStackNavigator();
  // const nav = useNavigation();

  React.useEffect(() => {
    setTimeout(() => {
      setIsSplashReady(true);
    }, 1300);
    console.log(firebase.auth().currentUser);
    const authStateSubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log("user is logged in");
        navigate("OAuthAdditionalSteps");
        console.log(firebase.auth().currentUser);
      }
    });
    return authStateSubscribe;
  }, [firebase.auth().currentUser]);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isSplashReady}
      logoImage={require("./assets/splash.png")}
      backgroundColor={"#C8E6E8"}
      logoHeight={150}
      logoWidth={150}
    >
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
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
        </Stack.Navigator>
      </NavigationContainer>
    </AnimatedSplash>
  );
}
