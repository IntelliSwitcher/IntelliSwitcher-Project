import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import Header from "../components/CompHeader";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Header />
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.name}>Kavishka</Text>
          <View style={[styles.currPowUsage, { backgroundColor: "#95F3A133" }]}>
            <Text style={{ color: "#333", fontWeight: 600 }}>Live Usage</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[{ fontSize: 40 }, { color: "#029432" }]}>100</Text>
              <Text
                style={[{ fontSize: 20, marginTop: 15 }, { color: "#029432" }]}
              >
                W
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.welcome,
            {
              marginTop: 20,
              backgroundColor: "#8CABFF",
              alignItems: "flex-start",
            },
          ]}
        >
          <Text style={{ color: "#fff", fontSize: 30, marginBottom: 30 }}>
            This Month
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={[styles.welcome, { flex: 1, alignItems: "flex-start" }]}
            >
              <Text style={{ fontSize: 22 }}>55 kWh</Text>
              <Text style={{ fontSize: 12 }}>Power usage</Text>
            </View>
            <View
              style={[styles.welcome, { flex: 1, alignItems: "flex-start" }]}
            >
              <Text style={{ fontSize: 22 }}>Rs:750.00</Text>
              <Text style={{ fontSize: 12 }}>Price</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
            <View
              style={[styles.welcome, { flex: 1, alignItems: "flex-start" }]}
            >
              <Text style={{ fontSize: 22 }}>100 kWh</Text>
              <Text style={{ fontSize: 12 }}>Power usage limit</Text>
            </View>
            <View
              style={[styles.welcome, { flex: 1, alignItems: "flex-start" }]}
            >
              <Text style={{ fontSize: 22 }}>Rs:12250.00</Text>
              <Text style={{ fontSize: 12 }}>Max Price</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  welcome: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 16,
    flexDirection: "column",
    alignItems: "center",
  },
  greeting: {
    color: "#35155D",
    fontSize: 32,
    fontWeight: "500",
    alignSelf: "flex-start",
  },
  name: {
    color: "#35155D",
    fontSize: 23,
    fontWeight: "300",
    alignSelf: "flex-start",
  },
  currPowUsage: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 75,
    marginVertical: 20,
    paddingBottom: 5,
  },
});

export default HomeScreen;
