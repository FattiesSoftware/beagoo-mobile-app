import { View, Text, ScrollView, Dimensions, SafeAreaView } from "react-native";
import React from "react";

const window = Dimensions.get("window");

const MainSideMenu = () => {
  return (
    <ScrollView
      className={`flex-1 bg-white w-[${window.width}] border-l-[0.4px] border-[#B3B3B3]`}
      style={{ width: window.width }}
    >
      <SafeAreaView className="flex-1">
        <Text>SideMenu</Text>
      </SafeAreaView>
    </ScrollView>
  );
};

export default MainSideMenu;
