import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import * as NativeSplashScreen from "expo-splash-screen";
import { Animated } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";
import { ProductsProvider } from "./src/context/ProductsContext";
import { useAuth } from "./src/hooks/useAuth";
import { useProducts } from "./src/hooks/useProducts";
import MainNavigator from "./src/navigation/MainNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import SplashScreen from "./src/screens/SplashScreen";

// Mantiene visible el splash nativo (definido en app.json) hasta que nuestro
// Splash Screen animado en JS esté listo para tomar el control, evitando un
// parpadeo en blanco entre ambos.
NativeSplashScreen.preventAutoHideAsync().catch(() => {});

const Stack = createStackNavigator();

// Navigator que decide qué mostrar según el estado de autenticación.
// Muestra el Splash Screen mientras se verifica si existe una sesión guardada
// y hace un fundido suave hacia Login/Registro o hacia la app principal.
function RootNavigator() {
  const { isAuthenticated, isBooting } = useAuth();
  const { prefetch } = useProducts();
  const [splashFinished, setSplashFinished] = useState(false);
  const contentOpacity = useRef(new Animated.Value(0)).current;

  const showApp = splashFinished;

  // Nuestro Splash Screen en JS ya está montado y visible, así que el splash
  // nativo puede ocultarse de inmediato sin causar ningún parpadeo.
  // Aprovechamos el tiempo del Splash para precargar el catálogo de
  // productos en segundo plano, sin bloquear la transición a Login/Home.
  useEffect(() => {
    NativeSplashScreen.hideAsync().catch(() => {});
    prefetch();
  }, []);

  useEffect(() => {
    if (showApp) {
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 320,
        useNativeDriver: true,
      }).start();
    }
  }, [showApp]);

  if (!showApp) {
    return (
      <SplashScreen ready={!isBooting} onFinish={() => setSplashFinished(true)} />
    );
  }

  return (
    <Animated.View style={{ flex: 1, opacity: contentOpacity }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          // Usuario autenticado → Tabs con Inicio, Productos, Carrito, Perfil
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          // Sin sesión → Login + Register (AuthNavigator maneja la navegación entre ambas)
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </Animated.View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <NavigationContainer>
              <StatusBar style="auto" />
              <RootNavigator />
            </NavigationContainer>
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
