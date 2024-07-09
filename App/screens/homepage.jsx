import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_100Thin,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";

const HomePage = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_100Thin,
    // Poppins_100ExtraLight ,
    // Poppins_100Light,
    Poppins_500Medium,
    // Poppins_600SemiBold,
    Poppins_700Bold,
    // Poppins_800ExtraBold,
    Poppins_900Black,
  });
  const navigation = useNavigation();

  return (
    // <ScrollView style={{ flex: 1 }}>
    <View style={{ height: "100%", backgroundColor: "#efdace" }}>
      <View style={{ height: "28%" }}>
        <Image
          source={require("../../assets/HomePage_background.png")}
          style={{
            height: "100%",
            width: "100%",
            flex: 1,
            position: "absolute",
          }}
          resizeMode="stretch"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 25,
            paddingTop: 20,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Poppins_700Bold",
                color: "#ffff",
              }}
            >
              Features
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins_500Medium",
                color: "#ffff",
              }}
            >
              Last Updated 30/06/2024
            </Text>
          </View>
          <Feather
            style={{ marginTop: 4 }}
            name="settings"
            size={18}
            color="white"
          />
        </View>
      </View>

      <View
        style={{
          height: "72%",
          backgroundColor: "#efdace",
          borderEndStartRadius: 20,
          borderTopEndRadius: 30,
          borderTopStartRadius: 30,
          flexDirection: "row",
          paddingHorizontal: 25,
          paddingVertical: 20,
          gap: 25,
          marginTop: -50,
        }}
      >
        <View style={{ flex: 1, flexDirection: "column", gap: 25 }}>
          <TouchableOpacity
            style={{
              // paddingHorizontal: 16,
              // paddingVertical: 20,
              borderWidth: 1,
              borderColor: "#000000",
              borderRadius: 16,
              // flex: 1,
              height: "30%",
              justifyContent: "center",
              backgroundColor: "#fff",
            }}
            onPress={() => navigation.navigate("Paint Work")}
          >
            <View style={{}}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Image
                  style={{ width: "55%" }}
                  source={require("../../assets/HomeImgOne.png")}
                  resizeMode="stretch"
                />
              </View>

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginTop: 8,
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                Home Construction
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              // paddingHorizontal: 16,
              // paddingVertical: 20,
              borderWidth: 1,
              borderColor: "#000000",
              borderRadius: 16,
              // flex: 1,
              height: "30%",
              justifyContent: "center",
              backgroundColor: "#fff",
            }}
            onPress={() => navigation.navigate("Aluminum")}
          >
            <View style={{}}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Image
                  style={{ width: "50%" }}
                  source={require("../../assets/HomeImgTwo.png")}
                  resizeMode="stretch"
                />
              </View>

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginTop: 8,
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                Construction Material
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              // paddingHorizontal: 16,
              // paddingVertical: 20,
              borderWidth: 1,
              borderColor: "#000000",
              borderRadius: 16,
              // flex: 1,
              height: "30%",
              justifyContent: "center",
              backgroundColor: "#fff",
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <View style={{}}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Image
                  style={{ width: "60%" }}
                  source={require("../../assets/HomeImgThree.png")}
                  resizeMode="stretch"
                />
              </View>

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginTop: 8,
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                Roofing Calculation
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, flexDirection: "column", gap: 25 }}>
          <TouchableOpacity
            style={{
              // paddingHorizontal: 16,
              // paddingVertical: 20,
              borderWidth: 1,
              borderColor: "#000000",
              borderRadius: 16,
              // flex: 1,
              height: "30%",
              justifyContent: "center",
              backgroundColor: "#fff",
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <View style={{}}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Image
                  style={{ width: "68%" }}
                  source={require("../../assets/HomeImgFour.png")}
                  resizeMode="stretch"
                />
              </View>

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginTop: 8,
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                Cement & Concrete
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              // paddingHorizontal: 16,
              // paddingVertical: 20,
              borderWidth: 1,
              borderColor: "#000000",
              borderRadius: 16,
              // flex: 1,
              height: "30%",
              justifyContent: "center",
              backgroundColor: "#fff",
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <View style={{}}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Image
                  style={{ width: "50%" }}
                  source={require("../../assets/HomeImgFive.png")}
                  resizeMode="stretch"
                />
              </View>

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginTop: 8,
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                Construction Converter
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              // paddingHorizontal: 16,
              // paddingVertical: 20,
              borderWidth: 1,
              borderColor: "#000000",
              borderRadius: 16,
              // flex: 1,
              height: "30%",
              justifyContent: "center",
              backgroundColor: "#fff",
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <View style={{}}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Image
                  style={{ width: "58%" }}
                  source={require("../../assets/HomeImgSix.png")}
                  resizeMode="stretch"
                />
              </View>

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins_500Medium",
                  marginTop: 8,
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                Water Tank & Vessels
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
    // </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
  },
});
