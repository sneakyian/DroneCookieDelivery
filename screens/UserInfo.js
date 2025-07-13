import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

export default function UserInfo({ route, navigation }) {
  const { cartItems } = route.params;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');

  // Custom Autocomplete Component
  const CustomPlacesAutocomplete = ({ value, onChangeText }) => {
    const [predictions, setPredictions] = useState([]);
    const API_KEY = 'AIzaSyB2TlD5fue8-QotuM4urqNOpxEYdbdxzcs'; // Your key
    const debounceTimer = useRef(null); // Use ref to persist timer across renders

    useEffect(() => {
      if (value.length >= 2) {
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => fetchPredictions(value), 300); // 300ms debounce
      } else {
        setPredictions([]);
      }
      return () => clearTimeout(debounceTimer.current);
    }, [value]);

    const fetchPredictions = async (input) => {
      try {
        const response = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask': 'suggestions.placePrediction.placeId,suggestions.placePrediction.text,suggestions.placePrediction.structuredFormat', // Corrected fields for autocomplete
          },
          body: JSON.stringify({
            input,
            languageCode: 'en',
            // includedPrimaryTypes: ['street_address'], // Comment this out temporarily if it causes issues
          }),
        });

        if (!response.ok) {
          const errorText = await response.text(); // Get full error message from Google
          console.error(`Autocomplete error: HTTP ${response.status} - ${errorText}`);
          throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setPredictions(data.suggestions || []);
      } catch (error) {
        console.error('Autocomplete error:', error);
        setPredictions([]);
      }
    };

    const fetchPlaceDetails = async (placeId) => {
      try {
        const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
          method: 'GET',
          headers: {
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask': 'displayName.text,formattedAddress,location,addressComponents', // Adjusted for object fields like displayName.text
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Details error: HTTP ${response.status} - ${errorText}`);
          throw new Error(`Details error! status: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Full Details:', data); // Access data.location.latitude, data.formattedAddress, etc.
        return data.formattedAddress || data.displayName?.text || value; // Prefer formattedAddress, fallback to displayName
      } catch (error) {
        console.error('Details fetch error:', error);
        return value; // Fallback
      }
    };

    return (
      <View style={styles.autocompleteContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter address"
          value={value}
          onChangeText={onChangeText}
        />
        <FlatList
          data={predictions}
          keyExtractor={(item) => item.placePrediction.placeId}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.autocompleteItem}
              onPress={async () => {
                const selectedAddress = await fetchPlaceDetails(item.placePrediction.placeId);
                onChangeText(selectedAddress);
                setPredictions([]); // Clear list after selection
              }}
            >
              <Text style={styles.autocompleteItemText}>{item.placePrediction.text.text}</Text>
            </TouchableOpacity>
          )}
          style={styles.autocompleteList}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Info</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <CustomPlacesAutocomplete value={address} onChangeText={setAddress} />
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
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15, width: '100%', height: 48, color: '#333', fontSize: 16, backgroundColor: 'white', paddingHorizontal: 10 },
  nextButton: { backgroundColor: '#6B3E26', padding: 15, borderRadius: 10, marginTop: 20, width: '100%' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
  autocompleteContainer: { width: '100%', marginBottom: 15 },
  autocompleteList: { maxHeight: 200, backgroundColor: 'white', borderColor: '#ccc', borderWidth: 1, borderTopWidth: 0, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 },
  autocompleteItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  autocompleteItemText: { color: '#6B3E26' },
});