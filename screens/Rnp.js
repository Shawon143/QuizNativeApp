import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
// import RNPickerSelect from "react-native-picker-select";
import { format, parse } from "date-fns"; // Ensure date-fns is installed
import { LinearGradient } from "expo-linear-gradient";

const Rnp = ({ navigation }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [selectedCategory, setSelectedCategory] = useState("Select a Category");
  // const [categories, setCategories] = useState([{ label: "Select a Category", value: "Select a Category" }]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        console.log("Fetching quizzes...");
        const response = await axios.get(
          "https://quizapp-backend-ml1y.onrender.com/api/quizzes"
        );
        console.log("Fetched quizz done:");
        setQuizzes(response.data);
        // const uniqueCategories = [...new Set(response.data.map((quiz) => quiz.category))];
        // const formattedCategories = uniqueCategories.map((category) => ({ label: category, value: category }));
        // setCategories([{ label: "All", value: "All" }, ...formattedCategories]);
      } catch (error) {
        console.error("Error fetching quizzes:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const filterQuizzesByCategory = () => {
    // if (selectedCategory === "All") {
    return quizzes;
    // } else {
    // return selectedCategory === "Select a Category"
    // ? quizzes
    // : quizzes.filter((quiz) => quiz.category === selectedCategory);
    // }
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

    Object.keys(groupedQuizzes).forEach((date) => {
      groupedQuizzes[date].sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.createdAt);
        const dateB = new Date(b.updatedAt || b.createdAt);
        return dateB - dateA;
      });
    });

    const sortedDates = Object.keys(groupedQuizzes).sort((a, b) => {
      const dateA = parse(a, "dd/MM/yyyy", new Date());
      const dateB = parse(b, "dd/MM/yyyy", new Date());
      return dateB - dateA;
    });

    return sortedDates.map((date) => ({
      title: date,
      data: groupedQuizzes[date],
    }));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#6200EE", "#03DAC6"]}
      style={styles.container}
      start={[0, 0]}
      end={[2, 1]}
    >
      {/* <RNPickerSelect
        onValueChange={(value) => setSelectedCategory(value)}
        items={categories}
        placeholder={{ label: "Select a Category", value: "Select a Category" }}
        style={pickerSelectStyles}
        value={selectedCategory}
      /> */}
      {quizzes.length > 0 ? (
        <SectionList
          sections={groupQuizzesByDate(filterQuizzesByCategory())}
          keyExtractor={(item) => item._id.toString()}
          showsVerticalScrollIndicator={true}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.quizItemContainer}
              onPress={() => navigation.navigate("Quiz", { quizId: item._id })}
            >
              <LinearGradient
                colors={["#6200EE", "#03DAC6"]}
                style={styles.quizItem}
                start={[0, 0]}
                end={[2, 5]}
              >
                <Text style={styles.quizTitle}>{item.title}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
        />
      ) : (
        <Text style={styles.noQuizzesText}>No quizzes available</Text>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#000",
  },
  quizItemContainer: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    width: "100%",
  },
  quizItem: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    width: "100%",
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  noQuizzesText: {
    fontSize: 18,
    color: "#888",
    marginTop: 20,
  },
});

export default Rnp;
