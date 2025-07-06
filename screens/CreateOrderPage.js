import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

const cookies = [
  { name: 'Chocolate Chip', image: require('../assets/cookies/choc-chip.png') },
  { name: 'Oatmeal',        image: require('../assets/cookies/oatmeal.png') },
  { name: 'Snickerdoodle',  image: require('../assets/cookies/snickerdoodle.png') },
  { name: 'Sugar',          image: require('../assets/cookies/sugar.png') },
];


export default function CreateOrderPage() {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pick your Cookie</Text>
      <FlatList
        data={cookies}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.cookieCard,
              selected === index && { borderColor: '#6B3E26', borderWidth: 2 }
            ]}
            onPress={() => setSelected(index)}
          >
            <Image source={item.image} style={styles.cookieImage} />
            <Text style={styles.cookieName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.name}
        contentContainerStyle={styles.grid}
      />
      {selected !== null && (
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Place Order</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#FFF8E7', paddingTop: 40 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  grid: { alignItems: 'center' },
  cookieCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    margin: 10,
    width: 140,
    elevation: 2,
  },
  cookieImage: { width: 80, height: 80, marginBottom: 10 },
  cookieName: { fontSize: 16, fontWeight: '600' },
  orderButton: { marginTop: 20, backgroundColor: '#6B3E26', padding: 15, borderRadius: 10 },
  orderButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});
