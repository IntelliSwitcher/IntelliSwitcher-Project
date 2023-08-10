import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

const App = () => {
  return <SafeAreaView style={styles.safeArea}></SafeAreaView>;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
