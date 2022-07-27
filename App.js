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

export default function App() {
  const [isSplashReady, setIsSplashReady] = React.useState(false);

  const Stack = createNativeStackNavigator();
  const { pending, isSignedIn, user, auth, additionalSteps } = useAuth();

  React.useEffect(() => {
    setTimeout(() => {
      setIsSplashReady(true);
    }, 1000);
    if (isSignedIn) {
      console.log("\n\nFirst Load\n====================");
      console.log("user is logged in");
      if (additionalSteps) {
        RootNavigation.navigate("OAuthAdditionalSteps");
        // console.log("app index add steps2: ", additionalSteps);
      }
      console.log("app index add steps: ", additionalSteps);
    }
  }, [isSignedIn]);

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
            {isSignedIn && additionalSteps ? (
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
            ) : isSignedIn && !additionalSteps ? (
              <>
                <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
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
