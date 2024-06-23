import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SectionList } from "react-native";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import { format, parse } from "date-fns";
import styles from "../styles/QuizListScreenStyles";

const QuizListScreen = ({ navigation }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Select a Category");
  const [categories, setCategories] = useState([
    { label: "Select a Category", value: "Select a Category" },
  ]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.107:5000/api/quizzes"
        );

        setQuizzes(response.data);
        const uniqueCategories = [
          ...new Set(response.data.map((quiz) => quiz.category)),
        ];
        const formattedCategories = uniqueCategories.map((category) => ({
          label: category,
          value: category,
        }));
        setCategories([{ label: "All", value: "All" }, ...formattedCategories]);
      } catch (error) {
        console.error("Error fetching quizzes:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const filterQuizzesByCategory = () => {
    if (selectedCategory === "All") {
      return quizzes;
    } else {
      return selectedCategory === "Select a Category"
        ? quizzes
        : quizzes.filter((quiz) => quiz.category === selectedCategory);
    }
  };

  const groupQuizzesByDate = (quizzes) => {
    const groupedQuizzes = quizzes.reduce((acc, quiz) => {
      const date = format(
        new Date(quiz.updatedAt || quiz.createdAt),
        "dd/MM/yyyy"
      );
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(quiz);
      return acc;
    }, {});

    // Sort quizzes within each group by update date first, then by creation date (newest first)
    Object.keys(groupedQuizzes).forEach((date) => {
      groupedQuizzes[date].sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.createdAt);
        const dateB = new Date(b.updatedAt || b.createdAt);
        return dateB - dateA; // Sort descending (newest first)
      });
    });

    // Sort sections by date (newest first)
    const sortedDates = Object.keys(groupedQuizzes).sort((a, b) => {
      const dateA = parse(a, "dd/MM/yyyy", new Date());
      const dateB = parse(b, "dd/MM/yyyy", new Date());
      return dateB - dateA; // Sort descending (newest first)
    });

    return sortedDates.map((date) => ({
      title: date,
      data: groupedQuizzes[date],
    }));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => setSelectedCategory(value)}
        items={categories}
        placeholder={{ label: "Select a Category", value: "Select a Category" }}
        style={pickerSelectStyles}
        value={selectedCategory}
      />
      {quizzes.length > 0 ? (
        <SectionList
          sections={groupQuizzesByDate(filterQuizzesByCategory())}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.quizItem}
              onPress={() => navigation.navigate("Quiz", { quizId: item._id })}
            >
              <Text style={styles.quizTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
        />
      ) : (
        <Text style={styles.noQuizzesText}>No quizzes available</Text>
      )}
    </View>
  );
};

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "white", // background color of the input
    marginBottom: 10, // space between the input and the SectionList
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "white", // background color of the input
    marginBottom: 10, // space between the input and the SectionList
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
  placeholder: {
    color: "#333",
  },
};

export default QuizListScreen;
