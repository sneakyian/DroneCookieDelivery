import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://YOUR_COMPUTER_IP:4000/users/signup', { email, name, password });
      if (res.data.success) {
        Alert.alert('Signup Success', 'Account created! You can now log in.');
        navigation.navigate('Login'); // If you have a login screen
      } else {
        Alert.alert('Error', res.data.error || 'Signup failed.');
      }
    } catch (err) {
      Alert.alert('Signup Failed', err.response?.data?.error || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create an Account</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF8E7', padding: 20 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#6B3E26' },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15, fontSize: 16 },
  signupButton: { backgroundColor: '#6B3E26', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  signupText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});
