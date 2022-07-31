import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import styles from "../../assets/stylesheet/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;
import useAuth from "../../hooks/useAuth";
import DatePicker from "react-native-date-picker";
import moment from "moment";

const OAuthAddSteps = () => {
  const [nextButtonDisabled, setNextButtonDisabled] = React.useState(true);
  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [dateValue, setDateValue] = React.useState("");
  // moment(date).format("DD/MM/YYYY")
  StatusBar.setBarStyle("dark-content", true);

  const { signOutUser } = useAuth();

  const getName = async () => {
    await AsyncStorage.getItem("user").then((user) => {
      if (user != "null") {
        setName(JSON.parse(user).displayName);
      }
    });
  };

  React.useEffect(() => {
    getName();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.additionalScreen.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.additionalScreen.mainSection}>
          <TouchableWithoutFeedback onPress={signOutUser}>
            <Text style={styles.additionalScreen.title}>
              Cập nhật thông tin 📝
            </Text>
          </TouchableWithoutFeedback>
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
                    value={name}
                    placeholderTextColor={"#A9A9A9"}
                    onChangeText={(text) => setName(text)}
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
                  <Pressable onPress={() => setOpen(true)}>
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
                      pointerEvents="none"
                      editable={false}
                      value={dateValue}
                    />
                  </Pressable>
                  <DatePicker
                    modal
                    date={date}
                    open={open}
                    maximumDate={new Date()}
                    minimumDate={new Date("1900-01-01")}
                    onConfirm={(date) => {
                      setOpen(false);
                      setDate(date);
                      setDateValue(moment(date).format("DD/MM/YYYY"));
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                    mode="date"
                    locale="vi"
                  />
                </View>
              </View>
            </View>
            <View style={{ marginBottom: 30 }}>
              <Text style={styles.additionalScreen.inputTitle}>
                Giới tính<Text style={{ color: "#D21D10" }}>*</Text>
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  justifyContent: "space-around",
                }}
              >
                <Pressable
                  onPress={() => {
                    if (gender == "" || gender == "female") {
                      setGender("male");
                    } else {
                      setGender("");
                    }
                  }}
                >
                  <View
                    style={[
                      {
                        width: 140,
                        height: 160,
                        borderWidth: 0.2,
                        borderColor: "gray",
                        borderRadius: 10,
                      },
                      gender == "male" && {
                        borderWidth: 2,
                        // backgroundColor: "#D9E9F2",
                        borderColor: "#51B7F2",
                      },
                    ]}
                  >
                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={require("../../assets/welcome/male.png")}
                        style={[
                          { width: 70, height: 88 },
                          gender == "male"
                            ? { marginTop: 0 }
                            : { marginTop: 2 },
                        ]}
                      />
                    </View>
                    <Text
                      style={[
                        { textAlign: "center" },
                        gender == "male"
                          ? { marginBottom: 13 }
                          : { marginBottom: 15 },
                      ]}
                    >
                      Nam
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    if (gender == "" || gender == "male") {
                      setGender("female");
                    } else {
                      setGender("");
                    }
                  }}
                >
                  <View
                    style={[
                      {
                        width: 140,
                        height: 160,
                        borderWidth: 0.2,
                        borderColor: "gray",
                        borderRadius: 10,
                      },
                      gender == "female" && {
                        borderWidth: 2,
                        borderColor: "#51B7F2",
                      },
                    ]}
                  >
                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={require("../../assets/welcome/female.png")}
                        style={[
                          { width: 56, height: 88 },
                          gender == "female"
                            ? { marginTop: 0 }
                            : { marginTop: 2 },
                        ]}
                      />
                    </View>
                    <Text
                      style={[
                        { textAlign: "center" },
                        gender == "female"
                          ? { marginBottom: 13 }
                          : { marginBottom: 15 },
                      ]}
                    >
                      Nữ
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}></View>
          <View
            style={[
              styles.global.largeButtonPrimary,
              nextButtonDisabled ? { opacity: 0.5 } : { opacity: 1 },
              { justifyContent: "flex-end" },
            ]}
          >
            <TouchableOpacity
              disabled={nextButtonDisabled}
              onPress={() => {
                navigation.navigate("VerificationCode", {
                  phoneNumber: phoneNumber,
                });
              }}
            >
              <Text style={styles.global.largeButtonText}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default OAuthAddSteps;
