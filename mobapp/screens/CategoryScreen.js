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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const CategoryScreen = ({ navigation }) => {
  const [place, setPlace] = useState("home");
  const [continues, setContinues] = useState("");
  const [standby, setstandby] = useState("");
  const [cold, setCold] = useState("");
  const [active, setActive] = useState("");

  const submit = async () => {
    try {
      let more = JSON.parse(await AsyncStorage.getItem("@more"));
      const applianceCounts = {
        continuous: continues,
        standby: standby,
        cold: cold,
        active: active,
      };
      more = { ...more, applianceCounts };
      console.log(axios.defaults.headers);

      axios
        .post("/basicInfo/submit", {
          more,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      //   navigation.navigate("");
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

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
          More about your appliances
        </Text>
        <View style={{ paddingVertical: 20, width: "85%" }}>
          <Text style={[styles.label, { fontSize: 20 }]}>
            how many electrical aplliances of following catergories you have
          </Text>
          <Text style={styles.label}>
            Continuous (router,survalance camera)
          </Text>
          <TextInput
            style={styles.input}
            value={continues}
            onChangeText={setContinues}
            keyboardType="numeric"
            placeholder="Enter the count"
            placeholderTextColor="#ccc"
          />
          <Text style={styles.label}>
            Standby (TV, Radio, Speaker, Laptop, PC)
          </Text>
          <TextInput
            style={styles.input}
            value={standby}
            onChangeText={setstandby}
            keyboardType="numeric"
            placeholder="Enter the count"
            placeholderTextColor="#ccc"
          />
          <Text style={styles.label}>Cold (Fridges, Freezers)</Text>
          <TextInput
            style={styles.input}
            value={cold}
            onChangeText={setCold}
            keyboardType="numeric"
            placeholder="Enter the count"
            placeholderTextColor="#ccc"
          />
          <Text style={styles.label}>
            Active (kettles,heaters,hot-water shower,
            Lightnening-CFL,Lightnening_LED)
          </Text>
          <TextInput
            style={styles.input}
            value={active}
            onChangeText={setActive}
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

export default CategoryScreen;
