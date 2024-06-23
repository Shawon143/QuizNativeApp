import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/HomeScreenStyles"; // Import the styles

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to QuizApp</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("QuizList")}
      >
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
