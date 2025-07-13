import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
      {/* <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      /> */}

      <GooglePlacesAutocomplete
        placeholder="Enter address"
        minLength={2}
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is a detailed place result
          console.log('Address:', data.description);
          console.log('Full details:', details);
          // You can use details.geometry.location, etc.
          // For example, set the address in your state:
          // setAddress(data.description);
        }}
        query={{
          key: 'AIzaSyB2TlD5fue8-QotuM4urqNOpxEYdbdxzcs', // Replace with your key
          language: 'en',
          types: 'address', // Only return addresses
        }}

        predefinedPlaces={[]} // <- Fixes the error!
        
        textInputProps={{
          value: address,
          onChangeText: setAddress,
          onFocus: () => {},   // Safe no-op to prevent crash
          onBlur: () => {},    // Safe no-op to prevent crash
          placeholder: "Enter address"
          
        }}
        styles={{
  textInput: {
    height: 48,         // or 44, 50 — something reasonable
    color: '#333',
    fontSize: 16,
    width: '100%',      // <-- Add this!
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white', // optional, for contrast
  },
  description: {
    color: '#6B3E26',
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
  
}}

        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={300}
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
  container: { flex: 1, alignItems: 'stretch', justifyContent: 'flex-start', padding: 20, backgroundColor: '#FFF8E7' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15, width: '100%' },
  nextButton: { backgroundColor: '#6B3E26', padding: 15, borderRadius: 10, marginTop: 20, width: '100%' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
});