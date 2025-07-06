import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Button } from 'react-native';

const cookies = [
  { name: 'Chocolate Chip', image: require('../assets/cookies/choc-chip.png') },
  { name: 'Oatmeal', image: require('../assets/cookies/oatmeal.png') },
  { name: 'Snickerdoodle', image: require('../assets/cookies/SnickerDoodle.png') },
  { name: 'Sugar', image: require('../assets/cookies/sugar.png') },
];

export default function CreateOrderPage({ navigation }) {
  const [quantities, setQuantities] = useState([0, 0, 0, 0]);

  const addQuantity = (index) => {
    const newQ = [...quantities];
    newQ[index]++;
    setQuantities(newQ);
  };

  const removeQuantity = (index) => {
    const newQ = [...quantities];
    if (newQ[index] > 0) newQ[index]--;
    setQuantities(newQ);
  };

  const cartItems = cookies
    .map((cookie, i) => ({ ...cookie, quantity: quantities[i] }))
    .filter(item => item.quantity > 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pick your Cookies</Text>
      <FlatList
        data={cookies}
        keyExtractor={item => item.name}
        renderItem={({ item, index }) => (
          <View style={styles.cookieCard}>
            <Image source={item.image} style={styles.cookieImage} />
            <Text style={styles.cookieName}>{item.name}</Text>
            <View style={styles.quantityRow}>
              <TouchableOpacity onPress={() => removeQuantity(index)} style={styles.qtyButton}>
                <Text style={styles.qtyButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantities[index]}</Text>
              <TouchableOpacity onPress={() => addQuantity(index)} style={styles.qtyButton}>
                <Text style={styles.qtyButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.cartArea}>
        <Text style={styles.cartTitle}>Cart:</Text>
        {cartItems.length === 0 && <Text style={styles.emptyCart}>No cookies selected</Text>}
        {cartItems.map((item, idx) => (
          <Text key={item.name}>{item.quantity} x {item.name}</Text>
        ))}
        {cartItems.length > 0 && (
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => navigation.navigate('ConfirmOrder', { cartItems })}
          >
            <Text style={styles.orderButtonText}>Place Order</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8E7', paddingTop: 40 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  cookieCard: { alignItems: 'center', marginBottom: 20 },
  cookieImage: { width: 80, height: 80, borderRadius: 40 },
  cookieName: { fontSize: 16, fontWeight: 'bold', marginVertical: 6 },
  quantityRow: { flexDirection: 'row', alignItems: 'center' },
  qtyButton: { backgroundColor: '#ddd', borderRadius: 10, padding: 8, marginHorizontal: 10 },
  qtyButtonText: { fontSize: 18, fontWeight: 'bold' },
  qtyText: { fontSize: 18, width: 30, textAlign: 'center' },
  cartArea: { backgroundColor: '#fff', padding: 15, borderRadius: 10, margin: 10 },
  cartTitle: { fontWeight: 'bold', marginBottom: 5 },
  emptyCart: { color: '#888', fontStyle: 'italic' },
  orderButton: { backgroundColor: '#6B3E26', padding: 15, borderRadius: 10, marginTop: 10 },
  orderButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
});
