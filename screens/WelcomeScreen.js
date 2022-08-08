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
  ActivityIndicator,
  Pressable,
  StatusBar,
  Alert,
} from "react-native";
import React from "react";
import styles from "../assets/stylesheet/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import facebookLogin from "../utils/loginWithFacebook";
import "firebase/compat/auth";
import "firebase/compat/firestore";
var pkg = require("../package.json");
console.log(pkg.version);
import useAuth from "../hooks/useAuth";

// const { width, height } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [nextButtonDisabled, setNextButtonDisabled] = React.useState(true);
  const [fbButtonDisabled, setFbButtonDisabled] = React.useState(false);

  StatusBar.setBarStyle("dark-content", true);

  const checkIfPhoneIsValidType = () => {
    var regex = /^\d+$/;
    // firstly, check if the phone number is valid via regex
    if (!regex.test(phoneNumber)) return false;
    if (phoneNumber.length >= 9 && phoneNumber.length <= 11) {
      return true;
    } else {
      return false;
    }
  };

  const handleNextButton = () => {
    console.log("next button pressed");
    var phone = (phoneNumber * 1).toString();
    if (checkIfPhoneIsValidType()) {
      navigation.navigate("VerificationCode", {
        phoneNumber: "+84" + phone,
      });
    } else {
      Alert.alert("Vui lòng điền số điện thoại hợp lệ!");
    }
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.welcomeScreen.Container}>
          <Image
            source={require("../assets/welcome/welcome-banner.jpg")}
            style={styles.welcomeScreen.Banner}
          />
          <View style={styles.welcomeScreen.MainSection}>
            <Text style={styles.welcomeScreen.Title}>Xin chào Beagooer!</Text>
            <Text style={styles.welcomeScreen.Message}>
              Nhập số di động của bạn để tiếp tục
            </Text>
            <View style={styles.welcomeScreen.TextInputContainer}>
              <View style={styles.welcomeScreen.CountryCode}>
                <Text style={styles.welcomeScreen.CountryCodeText}>🇻🇳 +84</Text>
              </View>
              <View style={{ flex: 1 }}>
                <TextInput
                  placeholder="Nhập số điện thoại"
                  style={styles.welcomeScreen.PhoneNumberInput}
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
            <Text style={styles.welcomeScreen.TermsAndConditions}>
              Bằng việc tiếp tục, bạn đã đồng ý với{"\n"}
              <Text style={styles.global.textLink}>
                Chính sách bảo mật
              </Text> và{" "}
              <Text style={styles.global.textLink}>Điều khoản sử dụng</Text>
            </Text>
            <View
              style={[
                styles.global.largeButtonPrimary,
                nextButtonDisabled ? { opacity: 0.5 } : { opacity: 1 },
              ]}
            >
              <TouchableOpacity
                disabled={nextButtonDisabled}
                onPress={handleNextButton}
              >
                <Text style={styles.global.largeButtonText}>Tiếp tục</Text>
              </TouchableOpacity>
            </View>
            <SafeAreaView style={styles.welcomeScreen.BottomButtonContainer}>
              <View
                style={[
                  styles.global.largeButtonFacebookLogin,
                  fbButtonDisabled ? { opacity: 0.5 } : { opacity: 1 },
                ]}
              >
                <Pressable
                  style={{ flexDirection: "row" }}
                  onPress={() => {
                    facebookLogin(setFbButtonDisabled);
                    setFbButtonDisabled(true);
                  }}
                  disabled={fbButtonDisabled}
                >
                  <View style={styles.global.loginProviderIconContainer}>
                    <Ionicons name="logo-facebook" size={28} color={"white"} />
                  </View>
                  <Text style={styles.global.loginProviderText}>
                    Đăng nhập bằng Facebook
                  </Text>
                  <ActivityIndicator
                    style={styles.global.whiteActivityIndicator}
                    color="#fff"
                    animating={fbButtonDisabled}
                  />
                </Pressable>
              </View>
              <View style={styles.global.largeButtonDefault}>
                <Pressable style={{ flexDirection: "row" }}>
                  <View style={styles.global.loginProviderIconContainer}>
                    <Ionicons name="logo-apple" size={28} color={"black"} />
                  </View>
                  <Text style={styles.global.loginProviderTextBlack}>
                    Đăng nhập bằng Apple ID
                  </Text>
                </Pressable>
              </View>
              <Text style={styles.global.versionText}>
                {pkg.version + " " + pkg.versionType}
              </Text>
            </SafeAreaView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default WelcomeScreen;
