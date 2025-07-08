import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, PanResponder, Dimensions } from 'react-native';

const cookies = [
  { name: 'Chocolate Chip', image: require('../assets/cookies/choc-chip.png') },
  { name: 'Oatmeal', image: require('../assets/cookies/oatmeal.png') },
  { name: 'Snickerdoodle', image: require('../assets/cookies/SnickerDoodle.png') },
  { name: 'Sugar', image: require('../assets/cookies/sugar.png') },
];

const screenHeight = Dimensions.get('window').height;
const cartHeight = 100; // Height of cart area

export default function CreateOrderPage() {
  const [cart, setCart] = useState([]);
  const dragY = useRef(new Animated.Value(0)).current;
  const dragX = useRef(new Animated.Value(0)).current;
  const [draggingIndex, setDraggingIndex] = useState(null);

  // Track if item is over the cart area
  const [overCart, setOverCart] = useState(false);

  // Only one PanResponder for simplicity, can be expanded for multi-drag
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => draggingIndex !== null,
      onPanResponderGrant: () => {},
      onPanResponderMove: (_, gestureState) => {
        dragY.setValue(gestureState.dy);
        dragX.setValue(gestureState.dx);

        // Check if currently over the cart area
        if (
          gestureState.moveY >
          screenHeight - cartHeight - 40 // adjust as needed
        ) {
          setOverCart(true);
        } else {
          setOverCart(false);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (
          gestureState.moveY >
          screenHeight - cartHeight - 40 // dropped over cart
        ) {
          setCart([...cart, cookies[draggingIndex]]);
        }
        setDraggingIndex(null);
        dragY.setValue(0);
        dragX.setValue(0);
        setOverCart(false);
      },
    })
  ).current;

  // Render cookie images
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pick your Cookie</Text>
      <View style={styles.cookieRow}>
        {cookies.map((cookie, i) =>
          draggingIndex === i ? (
            // Dragged cookie is rendered as Animated.Image
            <Animated.Image
              key={cookie.name}
              source={cookie.image}
              style={[
                styles.cookieImage,
                {
                  zIndex: 2,
                  position: 'absolute',
                  top: 60,
                  left: i * 90 + 30,
                  transform: [{ translateY: dragY }, { translateX: dragX }],
                },
              ]}
              {...panResponder.panHandlers}
            />
          ) : (
            <Image
              key={cookie.name}
              source={cookie.image}
              style={styles.cookieImage}
              onTouchStart={() => setDraggingIndex(i)}
            />
          )
        )}
      </View>

      {/* Cart Area */}
      <View
        style={[
          styles.cartArea,
          { backgroundColor: overCart ? '#ffd700' : '#eee' },
        ]}
      >
        <Text style={styles.cartText}>Cart: {cart.length} cookie(s)</Text>
        <View style={styles.cartItems}>
          {cart.map((cookie, idx) => (
            <Image
              key={idx}
              source={cookie.image}
              style={styles.cartCookieThumb}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8E7', paddingTop: 40 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  cookieRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 30 },
  cookieImage: { width: 80, height: 80, margin: 10, borderRadius: 50, borderWidth: 2, borderColor: '#6B3E26' },
  cartArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: cartHeight,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 2,
    borderColor: '#d9a066',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  cartText: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  cartItems: { flexDirection: 'row' },
  cartCookieThumb: { width: 40, height: 40, margin: 4, borderRadius: 20, borderWidth: 1, borderColor: '#6B3E26' },
});
