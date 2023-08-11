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
          IntelliSwitcher
        </Text>
        <Text
          style={{
            color: "#ccc",
            width: 280,
            fontSize: 18,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Powering Intelligence For Your Living Space
        </Text>
        <View
          style={{
            paddingVertical: 40,
            flexDirection: "row",
            flexWrap: "wrap",
            width: 280,
          }}
        >
          <Text style={{ width: "5%", fontSize: 18, color: "#fff" }}>•</Text>
          <Text
            style={{
              color: "#ccc",
              width: "95%",
              fontSize: 18,
              textAlign: "left",
              marginBottom: 10,
            }}
          >
            Smart scheduling for optimal usage
          </Text>
          <Text style={{ width: "5%", fontSize: 18, color: "#fff" }}>•</Text>
          <Text
            style={{
              color: "#ccc",
              width: "95%",
              fontSize: 18,
              textAlign: "left",
              marginBottom: 10,
            }}
          >
            Real time energy consumption insight
          </Text>
          <Text style={{ width: "5%", fontSize: 18, color: "#fff" }}>•</Text>
          <Text
            style={{
              color: "#ccc",
              width: "95%",
              fontSize: 18,
              textAlign: "left",
              marginBottom: 10,
            }}
          >
            Automated Alerts
          </Text>
          <Text style={{ width: "5%", fontSize: 18, color: "#fff" }}>•</Text>
          <Text
            style={{
              color: "#ccc",
              width: "95%",
              fontSize: 18,
              textAlign: "left",
              paddingBottom: 30,
            }}
          >
            Predictive Analysis
          </Text>
        </View>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 40,
            borderRadius: 20,
            backgroundColor: "#FCD308",
          }}
          onPress={() => navigation.navigate("signup")}
        >
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StartupScreen;
