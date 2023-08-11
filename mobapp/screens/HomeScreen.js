import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Header from "../components/CompHeader";
import DonutChart from "../components/CompDonutChart";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#35155D" }}>
      <Header />
      <ScrollView style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.name}>Kavishka</Text>
          <View style={[styles.currPowUsage, { backgroundColor: "#95F3A1" }]}>
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
              backgroundColor: "transparent",
              alignItems: "flex-start",
            },
          ]}
        >
          <Text style={{ color: "#fff", fontSize: 30, marginBottom: 30 }}>
            This Month
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ flex: 1, height: 150 }}>
              <DonutChart
                usage={100}
                usageIn={50}
                usageColor={"#8CABFF"}
                usageInColor={"#4477CE"}
                size={200}
              >
                <Text style={{ fontSize: 22, color: "#fff" }}>55 kWh</Text>
                <Text
                  style={{ fontSize: 12, color: "#ccc", textAlign: "center" }}
                >
                  Power usage
                </Text>
              </DonutChart>
            </View>
            <View style={{ flex: 1, height: 150 }}>
              <DonutChart
                usage={100}
                usageIn={50}
                usageColor={"#8CABFF"}
                usageInColor={"#4477CE"}
                size={160}
              >
                <Text style={{ fontSize: 15, color: "#fff" }}>Rs.456.00</Text>
                <Text
                  style={{ fontSize: 11, color: "#ccc", textAlign: "center" }}
                >
                  Price
                </Text>
              </DonutChart>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.welcome,
            {
              marginTop: 20,
              backgroundColor: "transparent",
              alignItems: "flex-start",
            },
          ]}
        >
          <Text style={{ color: "#fff", fontSize: 30, marginBottom: 30 }}>
            Next Month
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}></View>
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: height,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  welcome: {
    borderRadius: 10,
    backgroundColor: "#ffffff33",
    padding: 16,
    flexDirection: "column",
    alignItems: "center",
  },
  greeting: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "500",
    alignSelf: "flex-start",
  },
  name: {
    color: "#ddd",
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
