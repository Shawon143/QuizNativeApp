import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff", // Default text color for loading message
  },
  quizTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFD700", // Gold color for quiz title
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#fff", // Text color for question text against the gradient background
  },
  timerContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  timerText: {
    fontSize: 18,
    color: "#FFD700", // Gold color for timer text against the gradient background
  },
  optionsContainer: {
    width: "100%",
    alignItems: "center",
  },
  optionButton: {
    width: "100%",
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1, // Border width
    borderColor: "#fff", // Border color (white)
  },
  optionText: {
    fontSize: 16,
    color: "#fff", // Text color for option text against the gradient background
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
    color: "#fff", // Text color for result text against the gradient background
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
