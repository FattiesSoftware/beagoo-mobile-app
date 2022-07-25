import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import styles from "../../assets/stylesheet/styles";
import Ionicons from "react-native-vector-icons/Ionicons";

const OAuthAddSteps = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.additionalScreen.container}>
        <View style={styles.additionalScreen.mainSection}>
          <Text style={styles.additionalScreen.title}>
            Cập nhật thông tin 📝
          </Text>
          <Text style={styles.additionalScreen.secondary}>
            Hãy cập nhật thông tin để mọi người dễ dàng kết nối với bạn hơn nhé
          </Text>
          <View style={styles.additionalScreen.inputContainer}>
            <View style={{ marginBottom: 30 }}>
              <Text style={styles.additionalScreen.inputTitle}>
                Tên hiển thị<Text style={{ color: "#D21D10" }}>*</Text>
              </Text>
              <View
                style={{
                  backgroundColor: "#F7F7F6",
                  borderRadius: 10,
                  flexDirection: "row",
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: "#F0F0F0",
                }}
              >
                <View style={{ alignSelf: "center", paddingLeft: 10 }}>
                  <Ionicons
                    name="person-circle-outline"
                    size={25}
                    color={"#767676"}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput
                    placeholder="Nhập họ tên"
                    style={{
                      fontSize: 16,
                      width: "100%",
                      padding: 13,
                      fontWeight: "600",
                      color: "#333333",
                    }}
                    placeholderTextColor={"#A9A9A9"}
                  />
                </View>
              </View>
            </View>
            <View style={{ marginBottom: 30 }}>
              <Text style={styles.additionalScreen.inputTitle}>
                Ngày sinh<Text style={{ color: "#D21D10" }}>*</Text>
              </Text>
              <View
                style={{
                  backgroundColor: "#F7F7F6",
                  borderRadius: 10,
                  flexDirection: "row",
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: "#F0F0F0",
                }}
              >
                <View style={{ alignSelf: "center", paddingLeft: 10 }}>
                  <Ionicons
                    name="calendar-outline"
                    size={25}
                    color={"#767676"}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <TextInput
                    placeholder="Chọn ngày sinh"
                    style={{
                      fontSize: 16,
                      width: "100%",
                      padding: 13,
                      fontWeight: "600",
                      color: "#333333",
                    }}
                    placeholderTextColor={"#A9A9A9"}
                    editable={false}
                  />
                </View>
              </View>
            </View>
            <View style={{ marginBottom: 30 }}>
              <Text style={styles.additionalScreen.inputTitle}>
                Giới tính<Text style={{ color: "#D21D10" }}>*</Text>
              </Text>
              <View style={{ flexDirection: "row" }}></View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default OAuthAddSteps;
