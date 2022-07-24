import { StyleSheet } from "react-native";
import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  welcomeBanner: {
    width: "100%",
    height: 200 + statusBarHeight,
  },
  welcomeMainSection: {
    paddingHorizontal: 25,
    paddingVertical: 25,
    flex: 1,
  },
  welcomeTitle: { fontSize: 25, fontWeight: "600" },
  welcomeMessage: { fontSize: 17, fontWeight: "300", lineHeight: 35 },
});

export default styles;
