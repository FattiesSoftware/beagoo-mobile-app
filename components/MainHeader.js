import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import UserAvatar from "./UserAvatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import Ionicons from "react-native-vector-icons/Ionicons";

const MainHeader = ({
  onPressGoBack,
  title,
  rightActionTitle,
  onPressRightAction,
  haveBackButton = true,
  haveBottomBorder = true,
  setSetting,
}) => {
  const [uid, setUid] = React.useState("");

  React.useEffect(() => {
    AsyncStorage.getItem("user-more").then((data) => {
      setUid(JSON.parse(data).uid);
    });
  });

  return (
    <BlurView
      intensity={100}
      className={`h-[${
        Platform.OS == "android" ? 80 : 100
      }px] w-full bg-white flex-1 bg-transparent`}
    >
      <SafeAreaView className="bg-transparent">
        <View
          className={`flex-row items-center justify-between flex-1 py-4 mx-4 ${
            haveBottomBorder && "border-gray-200 border-b-[1px]"
          } ${Platform.OS == "android" && "mt-7"}`}
        >
          <View className="flex-row items-center">
            <Text className="font-extrabold text-3xl">{title}</Text>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity>
              <View className="mr-4">
                <Ionicons name="search" size={25} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSetting((setting) => !setting)}>
              <UserAvatar userId={uid} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </BlurView>
  );
};

export default MainHeader;
