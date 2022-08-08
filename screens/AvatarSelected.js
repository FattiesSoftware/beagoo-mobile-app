import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import AnimatedCheckbox from "react-native-checkbox-reanimated";
import DefaultHeader from "../components/DefaultHeader";
import uploadImageToStorage from "../hooks/uploadImageToStorage";
import RNProgressHud from "progress-hud";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateAvatarNeeded, updateAvatarUrl } from "../utils/updateUser";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const AvatarSelected = ({ navigation, route }) => {
  const [toggleCheckBox, setToggleCheckBox] = React.useState(true);
  const [imageUri, setImageUri] = React.useState(null);
  const [caption, setCaption] = React.useState("");

  StatusBar.setBarStyle("dark-content", true);

  const uploadImage = async () => {
    console.log(
      "uoidddd: ",
      JSON.parse(await AsyncStorage.getItem("user-more")).uid
    );
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const filename = imageUri.substring(imageUri.lastIndexOf("/") + 1);
      const downloadURL = await uploadImageToStorage(blob, filename);
      console.log("uriiii22222:  ", imageUri);
      console.log("caption: ", caption);
      console.log("toggleCheckBox: ", toggleCheckBox);
      console.log("downloadURL: ", downloadURL);
      updateAvatarNeeded(null, false);
      console.log("success changed needToUpdateAvatar to false");
      updateAvatarUrl(null, downloadURL);
      console.log("success changed avatarUrl to ", downloadURL);
      db.collection("posts")
        .add({
          type: "avatar",
          image: downloadURL,
          owner: JSON.parse(await AsyncStorage.getItem("user-more")).uid,
          ownerName: JSON.parse(await AsyncStorage.getItem("user-more"))
            .displayName,
          shouldShowOnFeed: toggleCheckBox,
          caption: caption,
          like: 0,
          comment: 0,
          share: 0,
          createdAt: new Date(),
        })
        .catch((err) => console.log(err));
      console.log("success added post");
      RNProgressHud.dismiss();
      navigation.popToTop();
      navigation.goBack(null);
    } catch (err) {
      console.error(err);
      RNProgressHud.dismiss();
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => {
        return (
          <DefaultHeader
            title="Xem trước ảnh đại diện"
            rightActionTitle={"Lưu"}
            onPressGoBack={navigation.goBack}
            onPressRightAction={() => {
              //   console.log(imageUri);
              RNProgressHud.showWithStatus("Đang tải lên...");
              uploadImage();
            }}
          />
        );
      },
    });
  }, [route.params.image, imageUri, caption, toggleCheckBox]);

  React.useEffect(() => {
    console.log("r9uaeopdiasd spic;sd: ", route.params?.image);
    console.log("caption2: ", caption);
    console.log("toggleCheckBox2: ", toggleCheckBox);
    setImageUri(route.params?.image);
  }, [route.params.image, imageUri, caption, toggleCheckBox]);

  return (
    <>
      <View className="bg-white flex-1 p-4">
        <Pressable onPress={Keyboard.dismiss}>
          <>
            <View className="flex-row items-center mb-6">
              <Text className=" text-[#9395A6]">Đến: </Text>
              <Ionicons name="earth" size={19} color="#9395A6" />
              <Text className="font-semibold text-[#9395A6]"> Công khai</Text>
            </View>
            <View>
              <TextInput
                placeholder="Nói gì đó về ảnh đại diện của bạn"
                placeholderTextColor="#9395A6"
                numberOfLines={4}
                multiline
                className="max-h-16 h-16"
                value={caption}
                onChangeText={(text) => {
                  setCaption(text);
                  console.log(caption);
                }}
              />
            </View>
            <View className="flex-1 items-center">
              <View
                className="w-72 h-72 rounded-full border-4 border-white"
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <Image
                  source={{ uri: imageUri }}
                  className="w-full h-full rounded-full"
                />
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <View className="absolute right-5 bottom-5 bg-gray-200 w-11 h-11 rounded-full items-center justify-center border-4 border-white">
                    <Ionicons name="camera" size={25} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CropAvatar", { image: imageUri })
                }
              >
                <View className="p-2.5 bg-gray-300 rounded-lg flex-row items-center mt-4">
                  <Ionicons name="crop" size={17} />
                  <Text className="text-black font-medium"> Chỉnh sửa</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        </Pressable>
      </View>
      <SafeAreaView className="bg-white border-t-[1px] border-gray-200 flex-row items-center justify-between">
        <View className="px-4 mt-3 mb-3">
          <Text>Chia sẻ lên Trang cá nhân</Text>
        </View>
        <Pressable
          onPress={() =>
            setToggleCheckBox((prev) => {
              return !prev;
            })
          }
          className="w-6 h-6 mr-4 mt-4 mb-3"
        >
          <AnimatedCheckbox
            checked={toggleCheckBox}
            highlightColor="#10A7FF"
            checkmarkColor="#ffffff"
            boxOutlineColor="#10A7FF"
          />
        </Pressable>
      </SafeAreaView>
    </>
  );
};

export default AvatarSelected;
