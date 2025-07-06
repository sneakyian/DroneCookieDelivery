import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ConfirmOrder({ route, navigation }) {
  const { cartItems } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Confirm Your Order</Text>
      {cartItems.map(item => (
        <Text key={item.name} style={styles.itemText}>
          {item.quantity} x {item.name}
        </Text>
      ))}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => navigation.navigate('UserInfo', { cartItems })}
      >
        <Text style={styles.buttonText}>Confirm & Enter Info</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#FFF8E7' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  itemText: { fontSize: 18, marginBottom: 10 },
  confirmButton: { backgroundColor: '#6B3E26', padding: 15, borderRadius: 10, marginTop: 20 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});
