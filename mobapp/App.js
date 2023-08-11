import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import MainNavigation from "./screens/MainNavigation";
import axios from "axios";

axios.defaults.baseURL = "http://10.30.4.115:3011";

const App = () => {
  const [fontsLoaded] = useFonts({
    "Raleway-Light": require("./assets/fonts/Raleway-Light.ttf"),
    "Raleway-Regular": require("./assets/fonts/Raleway-Regular.ttf"),
    "Raleway-SemiBold": require("./assets/fonts/Raleway-SemiBold.ttf"),
    "Raleway-Bold": require("./assets/fonts/Raleway-Bold.ttf"),
  });

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

export default App;
