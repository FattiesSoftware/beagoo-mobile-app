import React from "react";
import { LogBox, StatusBar, View } from "react-native";
import {
  NavigationContainer,
  useNavigation,
  CommonActions,
} from "@react-navigation/native";
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
import AddProfilePicture from "./screens/AddProfilePicture";
import { TailwindProvider } from "tailwindcss-react-native";
import AvatarSelected from "./screens/AvatarSelected";
import { CropAvatar, cropViewRef } from "./screens/CropAvatar";
import DefaultHeader from "./components/DefaultHeader";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default function App() {
  const [isSplashReady, setIsSplashReady] = React.useState(false);
  const [isAddNeeded, setIsAddNeeded] = React.useState(null);
  const [isAvatarUpdateNeeded, setIsAvatarUpdateNeeded] = React.useState(null);
  const [isNewUser, setIsNewUser] = React.useState(null);

  const Stack = createNativeStackNavigator();
  const { isSignedIn, signOutUser } = useAuth();

  LogBox.ignoreLogs([
    "Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
  ]);

  const check = async () => {
    // console.log(JSON.parse(await AsyncStorage.getItem("current-user")));
    if (
      (await AsyncStorage.getItem("user-more")) != null &&
      (await AsyncStorage.getItem("user-more")) != "null"
    ) {
      try {
        db.collection("users")
          .doc(JSON.parse(await AsyncStorage.getItem("user-more")).uid)
          .get()
          .then((res) => {
            setIsAddNeeded(res.data().additionalSteps);
            setIsAvatarUpdateNeeded(res.data().needToUpdateAvatar);
          })
          .catch((err) => {
            setIsAddNeeded(true);
            setIsAvatarUpdateNeeded(false);
            console.log(err);
          });
      } catch (error) {
        console.log(error);
        signOutUser();
      }
    } else {
      console.log("no user-more");
      // setIsAddNeeded(true);
    }
  };

  React.useEffect(() => {
    async function check() {
      if (
        (await AsyncStorage.getItem("new-user")) != null &&
        (await AsyncStorage.getItem("new-user")) != "null"
      ) {
        setIsNewUser(JSON.parse(await AsyncStorage.getItem("new-user")));
        console.log(
          "is new user: " + JSON.parse(await AsyncStorage.getItem("new-user"))
        );
      }
    }
    check();
  }, [isNewUser]);

  React.useEffect(() => {
    check();
    console.log("\n\nFirst Load\t" + new Date() + "\n====================");
    console.log("isSIGNEDIN: " + isSignedIn);
    console.log("isAddNeeded: " + isAddNeeded);
    console.log("is new user: ", isNewUser);
    console.log("isAvatarUpdateNeeded: " + isAvatarUpdateNeeded);
    setTimeout(() => {
      setIsSplashReady(true);
    }, 1000);
    if (isSignedIn == true) {
      console.log("user is logged in");
      if (isAddNeeded == true) {
        console.log("additional steps needed");
        RootNavigation.navigate("OAuthAdditionalSteps");
      }
      if (isAvatarUpdateNeeded == true && isAddNeeded === false) {
        RootNavigation.dispatch({
          index: 2,
          routes: [{ name: "Home" }, { name: "ChangeAvatar" }],
        });
      } else if (isAvatarUpdateNeeded === false && isAddNeeded === false) {
        RootNavigation.dispatch({
          index: 1,
          routes: [{ name: "Home" }],
        });
      }
    } else {
      console.log("user is not logged in");
    }
  }, [isSignedIn, isAddNeeded, isAvatarUpdateNeeded, isNewUser]);

  const ModalStack = createNativeStackNavigator();

  const ChangeAvatar = () => (
    <ModalStack.Navigator>
      <ModalStack.Screen
        name="AddProfilePicture"
        component={AddProfilePicture}
        options={{
          headerShown: false,
          presentation: "fullScreenModal",
        }}
      />
      <ModalStack.Screen
        name="AvatarSelected"
        component={AvatarSelected}
        options={{
          presentation: "card",
        }}
      />
      <ModalStack.Screen
        name="CropAvatar"
        component={CropAvatar}
        options={{
          presentation: "fullScreenModal",
          headerShown: true,
          header: () => {
            return (
              <DefaultHeader
                title="Chỉnh sửa ảnh"
                rightActionTitle={"Xong"}
                onPressGoBack={RootNavigation.goBack}
                onPressRightAction={() =>
                  cropViewRef.current?.saveImage(true, 90)
                }
              />
            );
          },
        }}
      />
    </ModalStack.Navigator>
  );

  const SignIn = () => (
    <ModalStack.Navigator>
      <ModalStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          presentation: "fullScreenModal",
          headerShown: false,
        }}
      />
      <ModalStack.Screen
        name="VerificationCode"
        component={VerificationCodeScreen}
        options={{
          headerShown: false,
          presentation: "card",
        }}
      />
    </ModalStack.Navigator>
  );

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
          <TailwindProvider>
            <Stack.Navigator>
              {isSignedIn == true &&
              isAddNeeded == false &&
              isAddNeeded != null ? (
                <>
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                      animation: "none",
                    }}
                  />
                  <Stack.Screen
                    name="ChangeAvatar"
                    component={ChangeAvatar}
                    options={{
                      headerShown: false,
                      presentation: "fullScreenModal",
                    }}
                  />
                </>
              ) : isSignedIn == true && isAddNeeded === true ? (
                <>
                  <Stack.Screen
                    name="OAuthAdditionalSteps"
                    component={OAuthAddSteps}
                    options={{
                      headerShown: false,
                      gestureEnabled: false,
                    }}
                  />
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                      animation: "none",
                    }}
                  />
                  <Stack.Screen
                    name="ChangeAvatar"
                    component={ChangeAvatar}
                    options={{
                      headerShown: false,
                      presentation: "fullScreenModal",
                    }}
                  />
                </>
              ) : isSignedIn == true ? (
                <>
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                      animation: "none",
                    }}
                  />
                  <Stack.Screen
                    name="ChangeAvatar"
                    component={ChangeAvatar}
                    options={{
                      headerShown: false,
                      presentation: "fullScreenModal",
                    }}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{
                      headerShown: false,
                      presentation: "fullScreenModal",
                    }}
                  />
                </>
              )}
            </Stack.Navigator>
          </TailwindProvider>
        </NavigationContainer>
      </AnimatedSplash>
    </>
  );
}
