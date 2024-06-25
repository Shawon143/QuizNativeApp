import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#6200EE",
    fontFamily: "Roboto",
  },
  quizItemContainer: {
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    overflow: "hidden",
  },
  quizItem: {
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "Roboto",
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    overflow: "hidden",
    color: "white",
  },
  sectionHeaderGradient: {
    flex: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionHeaderText: {
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF", // Text color inside the gradient background
    backgroundColor: "transparent",
  },
  noQuizzesText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
    fontFamily: "Roboto",
  },
});
