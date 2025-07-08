import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LandingPage({ navigation }) {
  const [user, setUser] = useState(null);

  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -30, duration: 1200, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1200, useNativeDriver: true })
      ])
    ).start();
  }, [floatAnim]);

  useEffect(() => {
    // Check if user is saved in AsyncStorage
    const getUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (e) {
        console.log('No user data');
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/LandingPage/CookieDrone.png')}
        style={[styles.logo, { transform: [{ translateY: floatAnim }] }]}
      />
      <Text style={styles.title}>Fly Biscuits</Text>
      <Text style={styles.subtitle}>Fresh cookies. Flown to you.</Text>

      {user ? (
        <>
          <Text style={styles.welcome}>Welcome, {user.name || user.email}!</Text>
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => navigation.navigate('CreateOrder')}
          >
            <Text style={styles.orderButtonText}>Order Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.orderButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF8E7' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10, color: '#6B3E26', fontFamily: 'sans-serif-medium' },
  subtitle: { fontSize: 18, marginBottom: 40, color: '#8C7B6B' },
  welcome: { fontSize: 20, marginBottom: 20, color: '#6B3E26' },
  orderButton: { backgroundColor: '#6B3E26', padding: 16, borderRadius: 10, elevation: 2, width: 200, alignItems: 'center', marginBottom: 12 },
  orderButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  signUpButton: { backgroundColor: '#FFD700', padding: 16, borderRadius: 10, elevation: 2, width: 200, alignItems: 'center' },
  signUpButtonText: { color: '#6B3E26', fontWeight: 'bold', fontSize: 18 },
  logoutButton: { marginTop: 20, backgroundColor: '#ccc', padding: 12, borderRadius: 10, width: 200, alignItems: 'center' },
  logoutButtonText: { color: '#6B3E26', fontWeight: 'bold', fontSize: 16 },
});
