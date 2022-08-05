import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";
import { updateAvatarNeeded } from "../utils/updateUser";

const AddProfilePicture = () => {
  const navigation = useNavigation();
  StatusBar.setBarStyle("dark-content", true);

  const handlePress = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
    });
    if (!result.didCancel) {
      navigation.navigate("AvatarSelected", {
        image: result.assets[0].uri,
      });
    } else {
      console.log("canceled");
    }
  };

  const handleExit = () => {
    updateAvatarNeeded(null, false);
    navigation.goBack();
  };

  return (
    <View className="bg-white flex-1">
      <SafeAreaView className="mt-7 flex-1">
        <View className="flex-row">
          <Text className="text-center font-[600] text-[15px] flex-1">
            Hoàn thiện thông tin
          </Text>
          <TouchableOpacity onPress={handleExit}>
            <Text className="absolute right-4">Thoát</Text>
          </TouchableOpacity>
        </View>
        <View className="my-14 items-center flex-1">
          <Pressable onPress={handlePress}>
            <View className="rounded-full bg-gray-200 w-32 h-32 border-solid border-white border-2 shadow-sm items-center justify-center">
              <Ionicons name="camera" size={25} />
            </View>
          </Pressable>
          <Text className="mt-4 font-medium text-[16px]">
            Thêm ảnh đại diện
          </Text>
          <Text className="mt-1.5 font-light text-gray-600">
            Chọn ngay 1 bức ảnh đẹp nhất của bạn
          </Text>
        </View>
        <View className="my-4 space-y-2">
          <TouchableOpacity
            onPress={handlePress}
            className="bg-[#10A7FF] mx-4 h-10 rounded-lg justify-center items-center flex-row"
          >
            <Ionicons name="camera" size={20} color="white" />
            <Text className="font-medium text-center text-white ml-1.5">
              Chọn từ thư viện
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleExit}
            className="bg-white mx-4 h-10 rounded-lg justify-center items-center flex-row border-[0.5px] border-gray-300"
          >
            <Text className="font-medium text-center text-black ml-1.5">
              Cập nhật sau
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddProfilePicture;
