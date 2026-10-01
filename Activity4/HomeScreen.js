import React from "react";
import { View, Text, Button } from "react-native";

import styles from "./src/styles/Styles";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Recipe Book
      </Text>

      <Text style={styles.text}>
        Welcome to my Recipe Book!
      </Text>

      <Button
        title="View Recipes"
        onPress={() => navigation.navigate("Recipes")}
      />

    </View>
  );
}