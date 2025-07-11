import React, { useRef, useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function AnimatedCloud({ source, startY, size, opacity, duration, delay }) {
  const xAnim = useRef(new Animated.Value(-size)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(xAnim, { toValue: width, duration, delay, useNativeDriver: false }),
        Animated.timing(xAnim, { toValue: -size, duration: 0, useNativeDriver: false })
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [xAnim, width, size, duration, delay]);

  return (
    <Animated.Image
      source={source}
      style={{
        position: 'absolute',
        left: xAnim,
        top: startY,
        width: size,
        height: size * 0.6,
        opacity: 1,
        zIndex: 1,
      }}
      pointerEvents="none"
      resizeMode="contain"
    />
  );
}
