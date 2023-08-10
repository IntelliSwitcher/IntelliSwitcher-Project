import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

const homeScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Hello This is home</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default homeScreen;
