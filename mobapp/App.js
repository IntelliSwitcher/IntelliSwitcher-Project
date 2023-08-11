import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import MainNavigation from "./screens/MainNavigation";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.8.144:3011";
axios.defaults.headers.post["Content-Type"] = "application/json";

const fetchFonts = async () => {
  await Font.loadAsync({
    "Raleway-Light": require("./assets/fonts/Raleway-Light.ttf"),
    "Raleway-Regular": require("./assets/fonts/Raleway-Regular.ttf"),
    "Raleway-SemiBold": require("./assets/fonts/Raleway-SemiBold.ttf"),
    "Raleway-Bold": require("./assets/fonts/Raleway-Bold.ttf"),
  });
};

export default App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    async function loadFontsAndData() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await fetchFonts();
        setDataLoaded(true);
        SplashScreen.hideAsync();
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    }

    loadFontsAndData();
  }, []);

  if (!dataLoaded) {
    return null; // You can return a loading component here if you prefer
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
