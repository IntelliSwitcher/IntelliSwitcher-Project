import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const StepsScreen = ({ navigation }) => {
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
        <Text
          style={{
            fontSize: 40,
            marginTop: 10,
            marginBottom: 10,
            color: "#fff",
            fontFamily: "Raleway-SemiBold",
            width: "93%",
          }}
        >
          Steps to setup the device
        </Text>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: 20,
            backgroundColor: "#FCD308",
            flexDirection: "row",
          }}
          onPress={() => navigation.navigate("home")}
        >
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "#fff",
    paddingBottom: 10,
    fontSize: 15,
    marginTop: 20,
    fontWeight: "500",
  },
  input: {
    height: 40,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    width: "auto",
    color: "#fff",
    fontWeight: "300",
  },
});

export default StepsScreen;
