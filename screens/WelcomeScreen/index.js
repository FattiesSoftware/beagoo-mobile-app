import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import styles from "../../assets/stylesheet/styles";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [nextButtonDisabled, setNextButtonDisabled] = React.useState(true);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.welcomeContainer}>
          <Image
            source={require("../../assets/welcome/welcome-banner.jpg")}
            style={styles.welcomeBanner}
          />
          <View style={styles.welcomeMainSection}>
            <Text style={styles.welcomeTitle}>Xin chào Beagooer!</Text>
            <Text style={styles.welcomeMessage}>
              Nhập số di động của bạn để tiếp tục
            </Text>
            <View
              style={{
                backgroundColor: "#F7F7F6",
                borderRadius: 10,
                flexDirection: "row",
                marginTop: 15,
                borderWidth: 1,
                borderColor: "#F0F0F0",
              }}
            >
              <View
                style={{
                  padding: 13,
                  borderRightWidth: 1,
                  borderRightColor: "#F0F0F0",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "300" }}>🇻🇳 +84</Text>
              </View>
              <View
                style={{
                  padding: 13,
                }}
              >
                <TextInput
                  placeholder="Nhập số điện thoại"
                  style={{ fontSize: 18 }}
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                  value={phoneNumber}
                  onChangeText={(text) => {
                    if (text.length > 0) {
                      setNextButtonDisabled(false);
                    } else {
                      setNextButtonDisabled(true);
                    }
                    setPhoneNumber(text);
                  }}
                />
              </View>
            </View>
            <Text
              style={{
                marginTop: 13,
                fontSize: 12,
                lineHeight: 18,
                fontWeight: "400",
                color: "gray",
              }}
            >
              Bằng việc tiếp tục, bạn đã đồng ý với{"\n"}
              <Text style={{ color: "#4AA9E2" }}>
                Chính sách bảo mật
              </Text> và{" "}
              <Text style={{ color: "#4AA9E2" }}>Điều khoản sử dụng</Text>
            </Text>
            <View
              style={[
                {
                  marginTop: 23,
                  backgroundColor: "#51B7F2",
                  borderRadius: 10,
                },
                nextButtonDisabled ? { opacity: 0.5 } : { opacity: 1 },
              ]}
            >
              <TouchableOpacity
                disabled={nextButtonDisabled}
                onPress={() =>
                  navigation.navigate("VerificationCode", {
                    phoneNumber: phoneNumber,
                  })
                }
              >
                <Text
                  style={{
                    padding: 13,
                    fontSize: 16,
                    fontWeight: "600",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Tiếp tục
                </Text>
              </TouchableOpacity>
            </View>
            <SafeAreaView
              style={{ flex: 1, justifyContent: "flex-end", marginBottom: -20 }}
            >
              <View
                style={{
                  marginTop: 23,
                  backgroundColor: "#4267B2",
                  borderRadius: 10,
                }}
              >
                <TouchableOpacity style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      paddingVertical: 7,
                      paddingLeft: 10,
                      //   backgroundColor: "red",
                    }}
                  >
                    <Ionicons name="logo-facebook" size={28} color={"white"} />
                  </View>
                  <Text
                    style={{
                      padding: 13,
                      fontSize: 16,
                      fontWeight: "600",
                      color: "white",
                      textAlign: "center",
                      flex: 1,
                    }}
                  >
                    Đăng nhập bằng Facebook
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 10,
                  backgroundColor: "#F1F1F3",
                  borderRadius: 10,
                }}
              >
                <TouchableOpacity style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      paddingVertical: 7,
                      paddingLeft: 10,
                      //   backgroundColor: "red",
                    }}
                  >
                    <Ionicons name="logo-apple" size={28} color={"black"} />
                  </View>
                  <Text
                    style={{
                      padding: 13,
                      fontSize: 16,
                      fontWeight: "600",
                      color: "black",
                      textAlign: "center",
                      flex: 1,
                    }}
                  >
                    Đăng nhập bằng Apple ID
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontWeight: "500",
                  color: "gray",
                  fontSize: 12,
                  textAlign: "center",
                  lineHeight: 35,
                }}
              >
                0.1.0 Pre-release Beta
              </Text>
            </SafeAreaView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default WelcomeScreen;
