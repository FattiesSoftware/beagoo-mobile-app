import React from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";

const HomeScreen = () => {
  StatusBar.setBarStyle("dark-content", true);

  return (
    <>
      <SafeAreaView>
        <Text>Test Screen</Text>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
