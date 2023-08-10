import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>IntelliSwitch</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: "Raleway-SemiBold",
    fontSize: 24,
  },
});

export default Header;
