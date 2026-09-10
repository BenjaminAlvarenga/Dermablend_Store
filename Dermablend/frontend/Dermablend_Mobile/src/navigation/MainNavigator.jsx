import { createStackNavigator } from "@react-navigation/stack";
import TabMenu from "./TabMenu";
import ProductDetailScreen from "../screens/ProductDetailScreen";

const Stack = createStackNavigator();

/**
 * Envuelve las pestañas principales en un Stack para poder empujar el
 * detalle de producto por encima de cualquier tab, con su propio header
 * y sin ocultar la navegación inferior al volver.
 */
export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabMenu} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ presentation: "card" }}
      />
    </Stack.Navigator>
  );
}
