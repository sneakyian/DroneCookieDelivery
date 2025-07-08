import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';

export default function LandingPage({ navigation }) {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -50, duration: 1500, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1500, useNativeDriver: true })
      ])
    ).start();
  }, [floatAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/LandingPage/CookieDrone.png')}
        style={[styles.logo, { transform: [{ translateY: floatAnim }] }]}
      />
      <Text style={styles.title}>Fly Biscuits</Text>
      <Text style={styles.subtitle}>Fresh cookies. Flown to you.</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
       <Text style={{ color: '#6B3E26' }}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateOrder')}>
        <Text style={styles.buttonText}>Order Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF8E7' },
  logo: { width: 150, height: 150, marginBottom: 30 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10, color: '#6B3E26', fontFamily: 'sans-serif-medium' },
  subtitle: { fontSize: 18, marginBottom: 40, color: '#8C7B6B' },
  button: { backgroundColor: '#6B3E26', padding: 16, borderRadius: 10, elevation: 2 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});


// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// export default function LandingPage({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Image source={require('../assets/LandingPage/CookieDrone.png')} style={styles.logo} />
//       <Text style={styles.title}>Sky Biscuits</Text>
//       <Text style={styles.subtitle}>Fresh cookies. Flown to you.</Text>
//       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateOrder')}>
//         <Text style={styles.buttonText}>Order Now</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF8E7' },
//   logo: { width: 120, height: 120, marginBottom: 30 },
//   title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
//   subtitle: { fontSize: 18, marginBottom: 40 },
//   button: { backgroundColor: '#6B3E26', padding: 16, borderRadius: 10 },
//   buttonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
// });
