import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";

const QuizListScreen = ({ navigation }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.107:5000/api/quizzes"
        );

        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {quizzes.length > 0 ? (
        <FlatList
          data={quizzes}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.quizItem}
              onPress={() => navigation.navigate("Quiz", { quizId: item._id })}
            >
              <Text style={styles.quizTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noQuizzesText}>No quizzes available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  quizItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  noQuizzesText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default QuizListScreen;
