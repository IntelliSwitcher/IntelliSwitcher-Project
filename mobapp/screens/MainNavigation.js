import React from "react";
import HomeScreen from "../screens/HomeScreen";
import StartupScreen from "../screens/StartupScreen";
import SignupScreen from "./SignupScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const MainNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="startup"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="startup" component={StartupScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
