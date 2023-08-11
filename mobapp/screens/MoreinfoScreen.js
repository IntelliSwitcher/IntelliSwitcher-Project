import React from "react";
import { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

const MoreinfoScreen = () => {
  const [place, setPlace] = useState("home");
  const [weekCount, setWeekCount] = useState("");
  const [weekendCount, setWeekendCount] = useState("");

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
