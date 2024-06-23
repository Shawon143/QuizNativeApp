// QuizScreenStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
  },
  quizTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#555",
  },
  timerContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  timerText: {
    fontSize: 18,
    color: "#d9534f", // Red color for timer
  },
  optionsContainer: {
    width: "100%",
    alignItems: "center",
  },
  optionButton: {
    width: "100%",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  correctOption: {
    backgroundColor: "#4CAF50", // Green color for correct answer
  },
  incorrectOption: {
    backgroundColor: "#FF5722", // Red color for incorrect answer
  },
  resultText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
