import firebase from "firebase/compat/app";
import { firebaseConfig } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export async function updateAvatarNeeded(uid, needToUpdateAvatar) {
  console.log("setting avatar update needed to: " + needToUpdateAvatar);
  return db
    .collection("users")
    .doc(uid ? uid : JSON.parse(await AsyncStorage.getItem("user-more")).uid)
    .update({
      needToUpdateAvatar,
    });
}

export async function updateAdditionalSteps(uid, additionalSteps) {
  return db
    .collection("users")
    .doc(uid ? uid : JSON.parse(await AsyncStorage.getItem("user-more")).uid)
    .update({
      additionalSteps,
    });
}

export async function updateAvatarUrl(uid, url) {
  return db
    .collection("users")
    .doc(uid ? uid : JSON.parse(await AsyncStorage.getItem("user-more")).uid)
    .update({
      photo: url,
    });
}
