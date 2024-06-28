// components/CircularTimer.js
import React, { useEffect, useRef } from "react";
import { View, Animated, Text, StyleSheet } from "react-native";

const CircularTimer = ({ duration, timeLeft }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: timeLeft,
      duration: duration * 1000,
      useNativeDriver: false,
    }).start();
  }, [timeLeft, duration]);

  const rotate = animatedValue.interpolate({
    inputRange: [0, duration],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.outerCircle}>
        <Animated.View
          style={[
            styles.halfCircle,
            {
              transform: [{ rotate }],
            },
          ]}
        />
        <View style={styles.innerCircle}>
          <Text style={styles.timerText}>{timeLeft}s</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  outerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: "#e6e6e6",
    justifyContent: "center",
    alignItems: "center",
  },
  halfCircle: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: "#3b5998",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 18,
    color: "#6200EE",
  },
});

export default CircularTimer;
