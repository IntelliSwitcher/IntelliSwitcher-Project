import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/CompHeader";

const App = () => {
  const Stack = createNativeStackNavigator();
  const fontLoading = async () => {
    try {
      const [fontsLoaded] = await useFonts({
        "Raleway-Light": require("./assets/fonts/Raleway-Light.ttf"),
        "Raleway-Regular": require("./assets/fonts/Raleway-Regular.ttf"),
        "Raleway-SemiBold": require("./assets/fonts/Raleway-SemiBold.ttf"),
        "Raleway-Bold": require("./assets/fonts/Raleway-Bold.ttf"),
      });
      return fontsLoaded;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fontLoading();
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
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
