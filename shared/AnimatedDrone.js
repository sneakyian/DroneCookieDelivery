import React, { useRef, useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


export default function AnimatedDrone({ source, startX, startY, endX, endY, duration, size, opacity, delay, rotate }) {
    const xAnim = useRef(new Animated.Value(startX)).current;
    const yAnim = useRef(new Animated.Value(startY)).current;
    const rotAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(xAnim, { toValue: endX, duration, delay, useNativeDriver: false }),
          Animated.timing(xAnim, { toValue: startX, duration, useNativeDriver: false }),
        ]),
        Animated.sequence([
          Animated.timing(yAnim, { toValue: endY, duration, delay, useNativeDriver: false }),
          Animated.timing(yAnim, { toValue: startY, duration, useNativeDriver: false }),
        ]),
        Animated.timing(rotAnim, {
          toValue: 1,
          duration: duration * 2,
          useNativeDriver: false,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [xAnim, yAnim, rotAnim, startX, endX, startY, endY, duration, delay]);

  const spin = rotAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [`${rotate}deg`, `${rotate + 30}deg`],
  });

  return (
    <Animated.Image
      source={source}
      style={{
        position: 'absolute',
        left: xAnim,
        top: yAnim,
        width: size,
        height: size,
        opacity: opacity,
        transform: [{ rotate: spin }],
        zIndex: -1,
      }}
      pointerEvents="none"
      resizeMode="contain"
    />
  );
}
