import { Animated } from "react-native";

const createAnimation = (value, duration, easing, delay = 0, toValue = 0) => {
  return Animated.timing(value, {
    toValue,
    duration,
    easing,
    delay,
    useNativeDriver: true,
  });
};

export default createAnimation;
