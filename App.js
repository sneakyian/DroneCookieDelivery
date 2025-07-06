import React from 'react';
import { MONGO_URI } from '@env';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

// then use MONGO_URI in your data-access layer


const App = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.text}>Welcome to Drone-Cookie-Delivery! Th</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 }
});

export default App;
