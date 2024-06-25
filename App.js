import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import QuizListScreen from "./screens/QuizListScreen";
import QuizScreen from "./screens/QuizScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#6200EE" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            fontFamily: "Roboto",
          },
          headerBackTitleStyle: {
            fontFamily: "Roboto",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "BrainBuster" }}
        />
        <Stack.Screen
          name="QuizList"
          component={QuizListScreen}
          options={{ title: "Quizzes List" }}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ title: "Quiz" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
