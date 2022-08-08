import React from "react";
import { LogBox, StatusBar, Pressable, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "./screens/WelcomeScreen";
import VerificationCodeScreen from "./screens/VerificationCodeScreen";
import AnimatedSplash from "react-native-animated-splash-screen";
import OAuthAddSteps from "./screens/OAuthAdditionalStep";
import * as RootNavigation from "./utils/RootNavigation";
import { useAuth } from "./hooks/useAuth";
import HomeScreen from "./screens/Home";
import firebase from "firebase/compat/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddProfilePicture from "./screens/AddProfilePicture";
import { TailwindProvider } from "tailwindcss-react-native";
import AvatarSelected from "./screens/AvatarSelected";
import { CropAvatar, cropViewRef } from "./screens/CropAvatar";
import DefaultHeader from "./components/DefaultHeader";
import { firebaseConfig } from "./firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import MainHeader from "./components/MainHeader";
import SideMenu from "@chakrahq/react-native-side-menu";
import MainSideMenu from "./components/MainSideMenu";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#10A7FF",
    background: "white",
  },
};

export default function App() {
  const [isSplashReady, setIsSplashReady] = React.useState(false);
  const [isAddNeeded, setIsAddNeeded] = React.useState(null);
  const [isAvatarUpdateNeeded, setIsAvatarUpdateNeeded] = React.useState(null);
  const [isNewUser, setIsNewUser] = React.useState(null);

  const Stack = createNativeStackNavigator();
  const { isSignedIn, signOutUser } = useAuth();

  StatusBar.setBarStyle("dark-content", true);

  LogBox.ignoreLogs([
    "Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
  ]);

  const check = async () => {
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
            setIsAvatarUpdateNeeded(true);
            console.log(err);
          });
      } catch (error) {
        console.log(error);
        signOutUser();
      }
    } else {
      console.log("no user-more");
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
          routes: [{ name: "Main" }, { name: "ChangeAvatar" }],
        });
      } else if (isAvatarUpdateNeeded === false && isAddNeeded === false) {
        RootNavigation.dispatch({
          index: 1,
          routes: [{ name: "Main" }],
        });
      }
    } else {
      console.log("user is not logged in");
    }
  }, [isSignedIn, isAddNeeded, isAvatarUpdateNeeded]);

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

  const MainScreen = ({ navigation }) => {
    const [currentScreen, setCurrentScreen] = React.useState("HomeScreen");
    const [setting, setSetting] = React.useState(false);
    const Tab = createBottomTabNavigator();
    const menu = <MainSideMenu />;

    return (
      <SideMenu
        menu={menu}
        menuPosition="right"
        isOpen={setting}
        onChange={(isOpen) => setSetting(isOpen)}
        openMenuOffset={300}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "albums" : "albums-outline";
              } else if (route.name === "Newsfeed") {
                iconName = focused ? "newspaper" : "newspaper-outline";
              } else if (route.name === "Chat") {
                iconName = focused ? "chatbubble" : "chatbubble-outline";
              } else if (route.name === "Notifications") {
                iconName = focused ? "notifications" : "notifications-outline";
              } else if (route.name === "Menu") {
                iconName = focused ? "menu" : "menu-outline";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarButton: (props) => (
              <Pressable
                {...props}
                onPress={(e) => {
                  if (route.params.currentScreen == currentScreen) {
                    return;
                  } else {
                    // console.log(currentScreen);
                    navigation.navigate(route.name, {
                      previous_screen: currentScreen,
                    });
                    setCurrentScreen(route.params.currentScreen);
                  }
                  // console.log(route.params.currentScreen);
                }}
              />
            ),
            tabBarStyle: {
              borderTopColor: "#B3B3B3",
              // backgroundColor: "transparent",
              // position: "absolute",
              position: "absolute",
            },
            tabBarLabelStyle: {
              fontWeight: "500",
            },
            tabBarBackground: () => (
              <BlurView tint="light" intensity={1000} style={{ flex: 1 }} />
            ),
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{
              currentScreen: "HomeScreen",
            }}
            options={{
              title: "Khám phá",
              headerShown: true,
              headerBackButtonMenuEnabled: false,
              headerTransparent: true,
              header: () => {
                return (
                  <MainHeader
                    title={"Khám phá"}
                    haveBottomBorder={false}
                    setSetting={setSetting}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      </SideMenu>
    );
  };

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
        <NavigationContainer ref={RootNavigation.navigationRef} theme={MyTheme}>
          <TailwindProvider>
            <StatusBar translucent backgroundColor="transparent" />
            <Stack.Navigator
              screenOptions={{
                cardStyle: { backgroundColor: "#fff" },
              }}
            >
              {isSignedIn == true ? (
                <>
                  <Stack.Screen
                    options={{
                      title: "Trang chính",
                      headerShown: false,
                      gestureEnabled: false,
                      animation: "none",
                    }}
                    name="Main"
                    component={MainScreen}
                  />
                  <Stack.Screen
                    name="ChangeAvatar"
                    component={ChangeAvatar}
                    options={{
                      headerShown: false,
                      presentation: "fullScreenModal",
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
