import React, { useState } from 'react';
import { View, Dimensions, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedDrone from '../shared/AnimatedDrone';
const { width, height } = Dimensions.get('window');

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://192.168.1.215:4000/users/login', { email, password });
      if (res.data.success) {
        await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        navigation.navigate('Landing');
      } else {
        Alert.alert('Login Failed', res.data.error || 'Try again.');
      }
    } catch (err) {
      Alert.alert('Login Error', err.response?.data?.error || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <AnimatedDrone
          source={require('../assets/drones/BackgroundDrone.png')}
          startX={-80} startY={40}
          endX={width - 80} endY={height / 4}
          duration={8000} size={80} opacity={0.13} delay={0} rotate={-15}
        />
      <Text style={styles.header}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF8E7', padding: 20 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#6B3E26' },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15, fontSize: 16 },
  loginButton: { backgroundColor: '#6B3E26', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  loginText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});
