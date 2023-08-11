import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios
      .post("/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data.token);
        axios.defaults.headers.common["Authorization"] = `${res.data.token}`;
        navigation.navigate("home");
      })
      .catch((err) => {
        console.log(err);
      });
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
        <Image
          style={{ height: 120, objectFit: "contain" }}
          source={require("../assets/lightbulb.png")}
        />
        <Text
          style={{
            fontSize: 40,
            marginTop: 10,
            marginBottom: 10,
            color: "#fff",
            fontFamily: "Raleway-SemiBold",
          }}
        >
          IntelliSwitcher
        </Text>
        <View style={{ paddingVertical: 30 }}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Enter your email"
            placeholderTextColor="#ccc"
          />

          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Enter your password"
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
            justifyContent: "center",
            width: 200,
          }}
          onPress={login}
        >
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Login</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 12, marginVertical: 15, color: "#aaa" }}>
          OR
        </Text>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: 20,
            backgroundColor: "#555",
            flexDirection: "row",
            justifyContent: "center",
            width: 200,
          }}
          onPress={() => {
            navigation.navigate("signup");
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: "#eee",
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "#fff",
    paddingBottom: 5,
    fontSize: 15,
  },
  input: {
    height: 40,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 40,
    paddingHorizontal: 10,
    width: 300,
    color: "#fff",
    fontSize: 18,
  },
});

export default LoginScreen;
