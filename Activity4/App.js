import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./HomeScreen";
import RecipeDetails from "./RecipeDetails";
import RecipeList from "./RecipeList";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Recipes"
          component={RecipeList}
        />

        <Stack.Screen
          name="RecipeDetails"
          component={RecipeDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}