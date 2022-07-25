import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import VerificationCodeScreen from "./screens/VerificationCodeScreen";
import { CardStyleInterpolators } from "@react-navigation/stack";
import AnimatedSplash from "react-native-animated-splash-screen";
import OAuthAddSteps from "./screens/OAuthAdditionalStep";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSplashReady, setIsSplashReady] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsSplashReady(true);
    }, 1300);
  });

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isSplashReady}
      logoImage={require("./assets/splash.png")}
      backgroundColor={"#C8E6E8"}
      logoHeight={150}
      logoWidth={150}
    >
      <NavigationContainer>
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
