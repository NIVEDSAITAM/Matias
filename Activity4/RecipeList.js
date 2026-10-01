import React from "react";
import { View, Text, Button } from "react-native";

import styles from "./src/styles/Styles";

const recipes = [
  {
    name: "Chicken Adobo",
    price: "₱150",
    description: "A Filipino dish made with chicken, soy sauce, and vinegar.",
  },

  {
    name: "Pancit",
    price: "₱120",
    description: "A Filipino noodle dish with vegetables and meat.",
  },

  {
    name: "Fried Rice",
    price: "₱100",
    description: "Rice fried with vegetables, egg, and seasonings.",
  },
];

export default function RecipeList({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Recipe List
      </Text>

      {recipes.map((recipe, index) => (
        <View style={styles.recipe} key={index}>

          <Text style={styles.recipeName}>
            {recipe.name}
          </Text>

          <Button
            title="View Details"
            onPress={() =>
              navigation.navigate("RecipeDetails", {
                name: recipe.name,
                price: recipe.price,
                description: recipe.description,
              })
            }
          />

        </View>
      ))}

    </View>
  );
}