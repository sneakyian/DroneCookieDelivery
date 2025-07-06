import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function OrderStatus({ route, navigation }) {
  const { cartItems, name, address, contact } = route.params;

  // Here you would fetch/order status from backend, for now just a placeholder!
  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.header}>Your drone is on its way!</Text>
  //     <ActivityIndicator size="large" color="#6B3E26" style={{ marginVertical: 30 }} />
  //     <Text style={styles.text}>Delivering to:</Text>
  //     <Text style={styles.text}>{name}</Text>
  //     <Text style={styles.text}>{address}</Text>
  //     <Text style={styles.text}>Contact: {contact}</Text>
  //     <Text style={styles.text}>Order:</Text>
  //     {cartItems.map(item => (
  //       <Text key={item.name} style={styles.text}>
  //         {item.quantity} x {item.name}
  //       </Text>
  //     ))}
  //   </View>
  // );

  useEffect(() => {
    // POST order to backend when screen loads
    axios.post('http://66.249.68.32:4000/orders', {
      name,
      address,
      contact,
      cart: cartItems,
    })
      .then(response => {
        // Optionally: Show confirmation or update status
        Alert.alert('Order Placed!', 'Your drone is on its way!');
      })
      .catch(error => {
        Alert.alert('Error', 'Order could not be placed.');
        console.error(error);
      });
  }, []);
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#FFF8E7' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 4 },
});
