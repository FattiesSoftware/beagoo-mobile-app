import {
  View,
  Text,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import UserAvatar from "./UserAvatar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const window = Dimensions.get("window");

const MainSideMenu = () => {
  const [uid, setUid] = React.useState("");

  React.useEffect(() => {
    AsyncStorage.getItem("user-more").then((data) => {
      setUid(JSON.parse(data).uid);
    });
  });

  return (
    <>
      <ScrollView
        className={`flex-1 bg-white w-[${window.width}] border-l-[0.4px] border-[#B3B3B3]`}
      >
        <SafeAreaView className="flex-1 ml-6 mr-4 mt-[-1px]">
          <View className="mt-5">
            <TouchableOpacity activeOpacity={0.5}>
              <View>
                <UserAvatar userId={uid} size={50} />
                <Text className="text-lg mt-1 font-bold">Duong Tung Anh</Text>
                <Text className="text-gray-500 text-[13px]">
                  Bea ID: 13081239071
                </Text>
              </View>
            </TouchableOpacity>
            <View className="flex-row mt-3 flex-wrap w-full">
              <TouchableOpacity activeOpacity={0.5}>
                <View className="flex-row mb-2">
                  <Text className="font-medium text-[13px]">7</Text>
                  <Text className="text-gray-500 text-[13px]">
                    {" "}
                    Đang theo dõi{"  "}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5}>
                <View className="flex-row mb-2">
                  <Text className="font-medium text-[13px]">20</Text>
                  <Text className="text-gray-500 text-[13px]">
                    {" "}
                    Người theo dõi
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default MainSideMenu;
