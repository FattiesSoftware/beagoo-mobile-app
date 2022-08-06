import { Text, SafeAreaView } from "react-native";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";

const VerificationCodeScreen = ({ navigation, route }) => {
  useFocusEffect(
    React.useCallback(() => {
      console.log("focused verif code screen");
    }, [])
  );

  return (
    <SafeAreaView>
      <Text>{route.params.phoneNumber}</Text>
    </SafeAreaView>
  );
};

export default VerificationCodeScreen;
