import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";

import { AuthProvider } from "./src/context/AuthContext";
import { useAuth } from "./src/hooks/useAuth";
import TabMenu from "./src/navigation/TabMenu";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { COLORS } from "./src/utils/theme";

const Stack = createStackNavigator();

// Navigator que decide qué mostrar según el estado de autenticación
function RootNavigator() {
  const { isAuthenticated, isBooting } = useAuth();

  // Mientras carga la sesión guardada, mostrar spinner
  if (isBooting) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.background,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // Usuario autenticado → Drawer con Home, Products, Cart
        <Stack.Screen name="Main" component={TabMenu} />
      ) : (
        // Sin sesión → Login + Register (AuthNavigator maneja la navegación entre ambas)
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
