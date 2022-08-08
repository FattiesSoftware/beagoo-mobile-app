import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const DefaultHeader = ({
  onPressGoBack,
  title,
  rightActionTitle,
  onPressRightAction,
  haveBackButton = true,
  haveBottomBorder = true,
}) => {
  return (
    <SafeAreaView
      className={`h-[${
        Platform.OS == "android" ? 80 : 100
      }px] w-full bg-white flex-1`}
    >
      <View
        className={`flex-row items-center justify-center flex-1 py-4 ${
          haveBottomBorder && "border-gray-200 border-b-[1px]"
        } ${Platform.OS == "android" && "mt-7"}`}
      >
        {haveBackButton && (
          <TouchableOpacity
            onPress={onPressGoBack}
            className="absolute left-2 flex-shrink-0 z-20"
          >
            <Ionicons name="chevron-back" size={28} />
          </TouchableOpacity>
        )}
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
