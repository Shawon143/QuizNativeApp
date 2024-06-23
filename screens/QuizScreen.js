import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import styles from "../styles/QuizScreenStyles"; // Import the styles

const QuizScreen = ({ route, navigation }) => {
  const { quizId } = route.params;
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15); // Timer for each question

  const timerRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://192.168.1.107:5000/api/quizzes/${quizId}`)
      .then((response) => setQuiz(response.data))
      .catch((error) => console.error(error));
  }, [quizId]);

  useEffect(() => {
    // Start timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerRef.current); // Cleanup timer on unmount
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
      setTimeLeft(15); // Reset timer for next question
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

    // Move to the next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(15); // Reset timer for next question
        setSelectedAnswer(null); // Reset selected answer for the next question
      } else {
        setShowResult(true); // Show quiz result after last question
      }
    }, 1000); // Delay to show the correct/incorrect color briefly
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
        disabled={selectedAnswer !== null} // Disable button after selecting an answer
      >
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  if (!quiz) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (showResult) {
    return (
      <View style={styles.container}>
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
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.quizTitle}>{quiz.title}</Text>
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
    </View>
  );
};

export default QuizScreen;
