import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.greeting}>Good Morning</Text>
        <Text style={styles.name}>Kavishka</Text>
        <View style={[styles.currPowUsage, { backgroundColor: "#95F3A1" }]}>
          <Text style={[styles.usage, { color: "#029432" }]}>100</Text>
          <Text style={[styles.unit, { color: "#029432" }]}>W</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  welcome: {
    borderRadius: 10,
    backgroundColor: "#2C53A3",
    padding: 16,
    flexDirection: "column",
    alignItems: "center",
  },
  greeting: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "300",
    alignSelf: "flex-start",
  },
  name: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "300",
    alignSelf: "flex-start",
  },
  currPowUsage: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 75,
    marginVertical: 20,
    paddingBottom: 5,
  },
  usage: {
    fontSize: 40,
    fontWeight: "500",
  },
  unit: {
    fontSize: 20,
    marginTop: 12,
    fontFamily: "Raleway-SemiBold",
  },
});

export default HomeScreen;
