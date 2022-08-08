import React from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import useAuth from "../hooks/useAuth";

const HomeScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  StatusBar.setBarStyle("dark-content", true);

  const { signOutUser } = useAuth();

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView
        className="bg-white flex-1 mx-4 pt-20 mt-[-10px]"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => {
                setRefreshing(false);
              }, 800);
            }}
            progressViewOffset={70}
          />
        }
      >
        <Text>Test Screen</Text>
        <TouchableOpacity
          onPress={signOutUser}
          className="bg-red-500 shadow p-4 w-24 rounded-3xl"
        >
          <Text className="text-white">Sign Out</Text>
        </TouchableOpacity>
        <Image source={require("../assets/welcome/welcome-banner.jpg")} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
