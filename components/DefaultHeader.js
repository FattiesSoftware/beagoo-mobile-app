import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const DefaultHeader = ({
  onPressGoBack,
  title,
  rightActionTitle,
  onPressRightAction,
}) => {
  return (
    <SafeAreaView className="h-[80px] w-full bg-white flex-1">
      <View className="mt-[-10px] flex-row items-center justify-center px-4 flex-1 border-gray-200 border-b-[1px]">
        <TouchableOpacity
          onPress={onPressGoBack}
          className="absolute left-2 flex-shrink-0 z-20"
        >
          <Ionicons name="chevron-back" size={28} />
        </TouchableOpacity>
        <Text className="flex-1 text-center font-[600] text-[15px]">
          {title}
        </Text>
        <TouchableOpacity
          onPress={onPressRightAction}
          className="absolute right-4 z-20"
        >
          <Text className="text-black text-right">{rightActionTitle}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DefaultHeader;
