import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/HomeScreenStyles"; // Import the styles

const HomeScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#6200EE", "#03DAC6"]}
      start={[0, 0]}
      end={[2, 5]}
      style={styles.container}
    >
      <Text style={styles.welcomeText}>Welcome to QuizApp</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("QuizList")}
      >
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("api")}
      >
        <Text style={styles.buttonText}>Start api</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("rnp")}
      >
        <Text style={styles.buttonText}>rnp api</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Test")}
      >
        <Text style={styles.buttonText}>test time</Text>
      </TouchableOpacity> */}
    </LinearGradient>
  );
};

export default HomeScreen;
