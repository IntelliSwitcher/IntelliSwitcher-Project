import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Header from "../components/CompHeader";
import DonutChart from "../components/CompDonutChart";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";

const HomeScreen = () => {
  const [temp, setTemp] = useState(null); // Initial value is null
  const [hum, setHum] = useState(null); // Initial value is null

  // useEffect hook to fetch data from the API
  useEffect(() => {
    // Replace with your API URL
    axios
      .get(
        "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relativehumidity_2m"
      )
      .then((res) => {
        const index = res.data.hourly.time.findIndex(
          (item) =>
            item === new Date().toISOString().split(".")[0].slice(0, 14) + "00"
        );
        const humidity = res.data.hourly.relativehumidity_2m[index];
        const temp = res.data.hourly.temperature_2m[index];
        setTemp(temp);
        setHum(humidity);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#35155D" }}>
      <Header />
      <ScrollView style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.name}>Kavishka</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.currPowUsage, { backgroundColor: "#95F3A1" }]}>
              <Text style={{ color: "#333", fontWeight: 600 }}>Live Usage</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[{ fontSize: 40 }, { color: "#029432" }]}>
                  100
                </Text>
                <Text
                  style={[
                    { fontSize: 20, marginTop: 15 },
                    { color: "#029432" },
                  ]}
                >
                  W
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "50%",
                padding: 30,
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <FontAwesome5 name="temperature-low" size={24} color="#fcc" />
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: 10,
                    fontWeight: 500,
                    color: "#fff",
                  }}
                >
                  {temp} C
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Entypo name="water" size={24} color="#ccf" />
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: 10,
                    fontWeight: 500,
                    color: "#fff",
                  }}
                >
                  {hum}%
                </Text>
              </View>
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
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
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
            <TouchableOpacity
              style={{
                width: "100%",
                paddingVertical: 10,
                paddingHorizontal: 30,
                borderRadius: 20,
                backgroundColor: "#FCD308",
                flexDirection: "row",
                marginTop: 30,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "500", marginRight: "auto" }}
              >
                Edit goal
              </Text>
              <AntDesign name="rightcircleo" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.welcome,
            {
              marginTop: 0,
              backgroundColor: "transparent",
              alignItems: "flex-start",
            },
          ]}
        >
          <Text style={{ color: "#fff", fontSize: 30, marginBottom: 20 }}>
            Next Month
          </Text>
          <View
            style={{
              backgroundColor: "#ffffff33",
              width: "100%",
              padding: 20,
              paddingVertical: 35,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
              <Text style={{ color: "#fff", fontSize: 15 }}>
                Power usage (predicted)
              </Text>
              <Text
                style={{
                  marginLeft: "auto",
                  fontSize: 17,
                  color: "#FCD308",
                  fontWeight: 600,
                }}
              >
                70kWh
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#fff", fontSize: 15 }}>
                Price (predicted)
              </Text>
              <Text
                style={{
                  marginLeft: "auto",
                  fontSize: 17,
                  color: "#FCD308",
                  fontWeight: 600,
                }}
              >
                Rs.12,520.00
              </Text>
            </View>
          </View>
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
