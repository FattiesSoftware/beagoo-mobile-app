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
      if (data != null && data != "null") {
        setUid(JSON.parse(data).uid);
      }
    });
  });

  return (
    <>
      <View
        className={`flex-1 bg-white w-[${window.width}] border-l-[0.4px] border-[#B3B3B3]`}
      >
        <SafeAreaView className="flex-1 ml-6 mr-4 mt-[-1px]">
          <View className="mt-5">
            <TouchableOpacity activeOpacity={0.5}>
              <View>
                <UserAvatar userId={uid} size={50} />
                <Text className="text-xl mt-1 font-bold">Duong Tung Anh</Text>
                <Text className="text-gray-500 text-[14px]">
                  Bea ID: 13081239071
                </Text>
              </View>
            </TouchableOpacity>
            <View className="flex-row mt-3 flex-wrap w-full">
              <TouchableOpacity activeOpacity={0.5}>
                <View className="flex-row mb-2">
                  <Text className="font-medium text-[14px]">7</Text>
                  <Text className="text-gray-500 text-[14px]">
                    {" "}
                    Đang theo dõi{"  "}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5}>
                <View className="flex-row mb-2">
                  <Text className="font-medium text-[14px]">20</Text>
                  <Text className="text-gray-500 text-[14px]">
                    {" "}
                    Người theo dõi
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView className="flex-1">
            <TouchableOpacity activeOpacity={0.5}>
              <View>
                <View></View>
                <Text>Hồ sơ</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};

export default MainSideMenu;
