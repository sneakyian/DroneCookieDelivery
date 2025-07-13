import React from 'react';
// then use MONGO_URI in your data-access layer
import { MONGO_URI } from '@env';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
//import 'react-native-get-random-values';


export default function App() {
  return <AppNavigator />;
}

// const App = () => (
//   <SafeAreaView style={styles.container}>
//     <Text style={styles.text}>Welcome to Drone</Text>
//   </SafeAreaView>
// );

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   text: { fontSize: 20 }
// });
