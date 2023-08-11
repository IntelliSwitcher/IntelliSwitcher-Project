import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

const StartupScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#35155D",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{ height: 120, objectFit: "contain" }}
          source={require("../assets/lightbulb.png")}
        />
        <Text
          style={{
            fontSize: 40,
            marginTop: 10,
            marginBottom: 30,
            color: "#fff",
            fontFamily: "Raleway-SemiBold",
          }}
        >
          IntelliSwitch
        </Text>
        <Text
          style={{
            color: "#ccc",
            width: 200,
            fontSize: 18,
            textAlign: "center",
            marginBottom: 100,
          }}
        >
          Powering Intelligence For Your Living Space
        </Text>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 40,
            borderRadius: 20,
            backgroundColor: "#FCD308",
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StartupScreen;
