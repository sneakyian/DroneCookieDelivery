import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function UserInfo({ route, navigation }) {
  const { cartItems } = route.params;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Info</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
      />
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('OrderStatus', { cartItems, name, address, contact })}
      >
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#FFF8E7' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15, width: '100%' },
  nextButton: { backgroundColor: '#6B3E26', padding: 15, borderRadius: 10, marginTop: 20, width: '100%' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
});
