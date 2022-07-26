import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import VerificationCodeScreen from "./screens/VerificationCodeScreen";
import AnimatedSplash from "react-native-animated-splash-screen";
import OAuthAddSteps from "./screens/OAuthAdditionalStep";
import * as RootNavigation from "./utils/RootNavigation";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const [isSplashReady, setIsSplashReady] = React.useState(false);

  const Stack = createNativeStackNavigator();
  const { pending, isSignedIn, user, auth } = useAuth();

  React.useEffect(() => {
    setTimeout(() => {
      setIsSplashReady(true);
    }, 1300);
    if (isSignedIn) {
      console.log("user is logged in");
      RootNavigation.navigate("OAuthAdditionalSteps");
      console.log("donenee! :    ", user);
    }
  }, [isSignedIn]);

  return (
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
          {isSignedIn ? (
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
  );
}
