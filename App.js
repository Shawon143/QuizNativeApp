import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import QuizListScreen from "./screens/QuizListScreen";
import QuizScreen from "./screens/QuizScreen";
import Home from "./screens/Home";
import Rnp from "./screens/Rnp";
import Time from "./screens/Time";
import TestCircularProgress from "./screens/TestCircularProgress";

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
          name="api"
          component={Home}
          options={{ title: "api List" }}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ title: "Quiz" }}
        />
        <Stack.Screen
          name="Time"
          component={Time}
          options={{ title: "Time" }}
        />
        {/* <Stack.Screen
          name="Test"
          component={TestCircularProgress}
          options={{ title: "Test" }}
        /> */}
        <Stack.Screen name="rnp" component={Rnp} options={{ title: "rnp" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
