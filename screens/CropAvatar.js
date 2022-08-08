import { StatusBar, Platform } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { CropView } from "react-native-image-crop-tools";

const cropViewRef = React.createRef();

const CropAvatar = ({ navigation }) => {
  StatusBar.setBarStyle("dark-content", true);

  const {
    params: { image },
  } = useRoute();

  return (
    <>
      <CropView
        sourceUrl={image}
        ref={cropViewRef}
        className="flex-1"
        onImageCrop={(res) => {
          // console.warn(res);
          console.log(res.uri.slice(150, res.uri.length));

          navigation.navigate({
            name: "AvatarSelected",
            params: {
              image: Platform.OS == "android" ? "file://" + res.uri : res.uri,
            },
            merge: true,
          });
        }}
        keepAspectRatio
        aspectRatio={{ width: 1, height: 1 }}
      />
    </>
  );
};

export { CropAvatar, cropViewRef };
