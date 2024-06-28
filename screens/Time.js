import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const QuizScreen = ({ route, navigation }) => {
  const { quizId } = route.params;
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  const timerRef = useRef(null);

  useEffect(() => {
    axios
      .get(`https://quizapp-backend-ml1y.onrender.com/api/quizzes/${quizId}`)
      .then((response) => setQuiz(response.data))
      .catch((error) => console.error(error));
  }, [quizId]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleTimeout();
    }
  }, [timeLeft]);

  const handleTimeout = () => {
    clearInterval(timerRef.current);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(15);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleAnswer = (selectedOption) => {
    clearInterval(timerRef.current);

    const correctAnswer = quiz.questions[currentQuestionIndex].answer;

    if (selectedOption === correctAnswer) {
      setScore(score + 1);
      setSelectedAnswer({ option: selectedOption, correct: true });
    } else {
      setSelectedAnswer({ option: selectedOption, correct: false });
    }

    setTimeout(() => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(15);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const renderOptions = () => {
    return quiz.questions[currentQuestionIndex].options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.optionButton,
          selectedAnswer &&
            option === selectedAnswer.option &&
            (selectedAnswer.correct
              ? styles.correctOption
              : styles.incorrectOption),
        ]}
        onPress={() => handleAnswer(option)}
        disabled={selectedAnswer !== null}
      >
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  if (!quiz) {
    return (
      <LinearGradient
        colors={["#6200EE", "#03DAC6"]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.loadingText}>Loading...</Text>
      </LinearGradient>
    );
  }

  if (showResult) {
    return (
      <LinearGradient
        colors={["#6200EE", "#03DAC6"]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.resultText}>Quiz Completed!</Text>
        <Text style={styles.resultText}>
          Your Score: {score}/{quiz.questions.length}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("QuizList")}
        >
          <Text style={styles.buttonText}>Back to Quiz List</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#6200EE", "#03DAC6"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.questionText}>
        {quiz.questions[currentQuestionIndex].question}
      </Text>
      <View style={styles.timerContainer}>
        <AnimatedCircularProgress
          size={60}
          width={8}
          fill={(timeLeft / 15) * 100}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
        >
          {() => <Text style={styles.timerText}>{timeLeft}s</Text>}
        </AnimatedCircularProgress>
      </View>
      <View style={styles.optionsContainer}>{renderOptions()}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  questionText: {
    fontSize: 22,
    color: "#FFFFFF",
    textAlign: "center",
    margin: 20,
  },
  timerContainer: {
    margin: 20,
  },
  timerText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  optionsContainer: {
    width: "80%",
  },
  optionButton: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    marginVertical: 10,
  },
  optionText: {
    fontSize: 18,
    color: "#6200EE",
  },
  correctOption: {
    backgroundColor: "#00FF00",
  },
  incorrectOption: {
    backgroundColor: "#FF0000",
  },
  resultText: {
    fontSize: 22,
    color: "#FFFFFF",
    textAlign: "center",
    margin: 20,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#6200EE",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
});

export default QuizScreen;
