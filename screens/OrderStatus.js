import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function OrderStatus({ route, navigation }) {
  const { cartItems, name, address, contact } = route.params;

  // Here you would fetch/order status from backend, for now just a placeholder!
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your drone is on its way!</Text>
      <ActivityIndicator size="large" color="#6B3E26" style={{ marginVertical: 30 }} />
      <Text style={styles.text}>Delivering to:</Text>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{address}</Text>
      <Text style={styles.text}>Contact: {contact}</Text>
      <Text style={styles.text}>Order:</Text>
      {cartItems.map(item => (
        <Text key={item.name} style={styles.text}>
          {item.quantity} x {item.name}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#FFF8E7' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 4 },
});
