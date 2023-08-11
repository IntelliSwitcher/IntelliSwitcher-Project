import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MoreinfoScreen = ({ navigation }) => {
  const [place, setPlace] = useState("home");
  const [weekCount, setWeekCount] = useState("");
  const [weekendCount, setWeekendCount] = useState("");

  const submit = async () => {
    try {
      await AsyncStorage.setItem(
        "@more",
        JSON.stringify({
          premises: place,
          weekdaysPeople: weekCount,
          weekendsPeople: weekendCount,
        })
      );
      console.log("Data stored successfully");
      navigation.navigate("category");
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Do nothing or show an alert to inform the user
        return true; // Prevent default behavior (going back)
      };

      // Add the event listener for the hardware back button
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      // Remove the event listener when the screen is unfocused or unmounted
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

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
          More about your usage
        </Text>
        <View style={{ paddingVertical: 20, width: "85%" }}>
          <Text style={styles.label}>Monitored premises</Text>
          <View style={[styles.input, { paddingHorizontal: 0 }]}>
            <Picker
              selectedValue={place}
              onValueChange={(itemValue, itemIndex) => setPlace(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Home" value="home" />
              <Picker.Item label="Company" value="company" />
              <Picker.Item label="Industrial" value="industrial" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
          <Text style={styles.label}>
            How many people resides/works on avarage in weekdays
          </Text>
          <TextInput
            style={styles.input}
            value={weekCount}
            onChangeText={setWeekCount}
            keyboardType="numeric"
            placeholder="Enter the count"
            placeholderTextColor="#ccc"
          />
          <Text style={styles.label}>
            How many people resides/works on avarage in weekends
          </Text>
          <TextInput
            style={styles.input}
            value={weekendCount}
            onChangeText={setWeekendCount}
            keyboardType="numeric"
            placeholder="Enter the count"
            placeholderTextColor="#ccc"
          />
        </View>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: 20,
            backgroundColor: "#FCD308",
            flexDirection: "row",
          }}
          onPress={submit}
        >
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Next</Text>
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

export default MoreinfoScreen;
