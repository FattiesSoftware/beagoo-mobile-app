import React from "react";
import { SafeAreaView, StatusBar, Text, TouchableOpacity } from "react-native";
import useAuth from "../hooks/useAuth";

const HomeScreen = () => {
  StatusBar.setBarStyle("dark-content", true);

  const { signOutUser } = useAuth();

  return (
    <>
      <SafeAreaView>
        <Text>Test Screen</Text>
        <TouchableOpacity
          onPress={signOutUser}
          className="bg-red-500 shadow p-4 w-24 rounded-3xl"
        >
          <Text className="text-white">Sign Out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
