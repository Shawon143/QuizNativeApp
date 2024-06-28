// screens/TestCircularProgress.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const TestCircularProgress = () => {
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Circular Progress Test</Text>
      <AnimatedCircularProgress
        size={100}
        width={10}
        fill={(timeLeft / 15) * 100}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
      >
        {() => <Text style={styles.timerText}>{timeLeft}s</Text>}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
  },
  timerText: {
    fontSize: 20,
    color: "#000",
  },
});

export default TestCircularProgress;
