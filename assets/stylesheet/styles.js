import { StyleSheet } from "react-native";
import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;

const styles = StyleSheet.create({
  welcomeScreen: {
    Container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    Banner: {
      width: "100%",
      height: 200 + statusBarHeight,
    },
    MainSection: {
      paddingHorizontal: 25,
      paddingVertical: 25,
      flex: 1,
    },
    Title: { fontSize: 25, fontWeight: "600" },
    Message: { fontSize: 17, fontWeight: "300", lineHeight: 35 },
    TextInputContainer: {
      backgroundColor: "#F7F7F6",
      borderRadius: 10,
      flexDirection: "row",
      marginTop: 15,
      borderWidth: 1,
      borderColor: "#F0F0F0",
    },
    CountryCode: {
      padding: 13,
      borderRightWidth: 1,
      borderRightColor: "#F0F0F0",
    },
    CountryCodeText: { fontSize: 18, fontWeight: "300" },
    PhoneNumberInput: {
      fontSize: 18,
      width: "100%",
      padding: 13,
    },
    TermsAndConditions: {
      marginTop: 13,
      fontSize: 12,
      lineHeight: 18,
      fontWeight: "400",
      color: "gray",
    },

    BottomButtonContainer: {
      flex: 1,
      justifyContent: "flex-end",
      marginBottom: -20,
    },
  },
  additionalScreen: {
    container: {
      flex: 1,
      backgroundColor: "white",
      paddingTop: statusBarHeight,
    },
    mainSection: {
      paddingHorizontal: 25,
      paddingVertical: 25,
      flex: 1,
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      marginBottom: 10,
      color: "black",
    },
    secondary: {
      lineHeight: 19,
      fontWeight: "300",
    },
    inputContainer: {
      marginTop: 25,
    },
    inputTitle: {
      fontSize: 16,
      fontWeight: "300",
    },
  },
  global: {
    largeButtonPrimary: {
      marginTop: 23,
      backgroundColor: "#10A7FF",
      borderRadius: 10,
    },
    largeButtonText: {
      padding: 13,
      fontSize: 16,
      fontWeight: "600",
      color: "white",
      textAlign: "center",
    },
    largeButtonFacebookLogin: {
      marginTop: 23,
      backgroundColor: "#4267B2",
      borderRadius: 10,
    },
    loginProviderIconContainer: {
      paddingVertical: 7,
      paddingLeft: 10,
    },
    loginProviderText: {
      padding: 13,
      fontSize: 16,
      fontWeight: "600",
      color: "white",
      textAlign: "center",
      flex: 1,
    },
    textLink: { color: "#4AA9E2" },
    whiteActivityIndicator: {
      position: "absolute",
      right: 10,
      top: 0,
      bottom: 0,
    },
    largeButtonDefault: {
      marginTop: 10,
      backgroundColor: "#F1F1F3",
      borderRadius: 10,
    },
    loginProviderTextBlack: {
      padding: 13,
      fontSize: 16,
      fontWeight: "600",
      color: "black",
      textAlign: "center",
      flex: 1,
    },
    versionText: {
      fontWeight: "500",
      color: "gray",
      fontSize: 12,
      textAlign: "center",
      lineHeight: 35,
    },
  },
  fullStretch: {
    backgroundColor: "#AAC4CB",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default styles;
