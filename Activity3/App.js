import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

import styles from "./src/styles/Styles";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (inputText.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      text: inputText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInputText("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }

        return task;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const renderTask = ({ item }) => {
    return (
      <View style={styles.taskContainer}>

        {/* CHECKBOX / TASK BUTTON */}
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => toggleTask(item.id)}
        >
          <Text style={styles.checkBox}>
            {item.completed ? "✓" : "○"}
          </Text>

          <Text
            style={[
              styles.taskText,
              item.completed && styles.completedTask,
            ]}
          >
            {item.text}
          </Text>
        </TouchableOpacity>

        {/* DELETE BUTTON */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(item.id)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>

      </View>
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>My To-Do List</Text>

      {/* INPUT */}
      <View style={styles.inputContainer}>

        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={inputText}
          onChangeText={setInputText}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addTask}
        >
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>

      </View>

      {/* TASK LIST */}
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks yet.
          </Text>
        }
      />

    </View>
  );
}