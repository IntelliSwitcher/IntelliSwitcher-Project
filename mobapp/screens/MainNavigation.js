import React from "react";
import HomeScreen from "../screens/HomeScreen";
import StartupScreen from "../screens/StartupScreen";
import SignupScreen from "./SignupScreen";
import MoreinfoScreen from "./MoreinfoScreen";
import CategoryScreen from "./CategoryScreen";
import StepsScreen from "./StepsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const MainNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="startup"
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="startup" component={StartupScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="moreinfo" component={MoreinfoScreen} />
      <Stack.Screen name="category" component={CategoryScreen} />
      <Stack.Screen name="steps" component={StepsScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
