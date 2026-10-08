import React from "react";
import { View, Text, Button } from "react-native";

import styles from "./src/styles/Styles";

export default function RecipeDetails({ route, navigation }) {

  const { name, price, description } = route.params;

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {name}
      </Text>

      <Text style={styles.price}>
        Price: {price}
      </Text>

      <Text style={styles.description}>
        {description}
      </Text>

      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />

    </View>
  );
}