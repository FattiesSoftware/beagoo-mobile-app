import { View, Text, SafeAreaView } from "react-native";
import React from "react";

const VerificationCodeScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView>
      <Text>{route.params.phoneNumber}</Text>
    </SafeAreaView>
  );
};

export default VerificationCodeScreen;
