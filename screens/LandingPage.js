import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function LandingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/cookie-drone.png')} style={styles.logo} />
      <Text style={styles.title}>Drone Cookie Delivery</Text>
      <Text style={styles.subtitle}>Fresh cookies. Flown to you.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateOrder')}>
        <Text style={styles.buttonText}>Order Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF8E7' },
  logo: { width: 120, height: 120, marginBottom: 30 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 40 },
  button: { backgroundColor: '#6B3E26', padding: 16, borderRadius: 10 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});
