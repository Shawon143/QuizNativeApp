import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    color: "#FFFFFF",
    marginBottom: 20,
    fontWeight: "bold",
    fontFamily: "Roboto",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#03DAC6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: "70%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
});
