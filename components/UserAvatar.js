import { View, Image } from "react-native";
import React from "react";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "../firebase";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const UserAvatar = ({
  userId,
  size,
  style,
  className,
  imageClassName,
  imageStyle,
}) => {
  const [imageUri, setImageUri] = React.useState(null);

  const getAvatar = () => {
    if (userId) {
      db.collection("users")
        .doc(userId)
        .get()
        .then((doc) => {
          setImageUri(doc.data().photo);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  getAvatar();

  return (
    <View className={className} style={style}>
      <Image
        source={{ uri: imageUri }}
        className={"rounded-full " + imageClassName}
        style={[
          { width: size, height: size },
          imageStyle,
          { backgroundColor: "#D8D8D8" },
        ]}
      />
    </View>
  );
};

export default UserAvatar;
