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
    backgroundColor: "#35155D",
  },
  title: {
    fontFamily: "Raleway-SemiBold",
    fontSize: 24,
    color: "#fff",
  },
});

export default Header;
