import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import CartScreen from '../screens/CartScreen.jsx';
import ProductsScreen from '../screens/ProductsScreen.jsx';
import HomeScreen from '../screens/HomeScreen.jsx';
import { COLORS } from '../utils/theme.js';

const Drawer = createDrawerNavigator();

export default function TabMenu() {
  return (
    <Drawer.Navigator
      initialRouteName="Products"
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          backgroundColor: COLORS.card,
          width: 240,
        },
        drawerActiveTintColor: COLORS.ink,
        drawerInactiveTintColor: COLORS.inkMuted,
        drawerActiveBackgroundColor: COLORS.buttonBg,
        drawerItemStyle: {
          borderRadius: 12,
          marginHorizontal: 8,
        },
        drawerLabelStyle: {
          fontWeight: '600',
          fontSize: 14,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: 'Inicio',
          drawerIcon: ({ color, size }) => (
            <Feather name="home" size={size - 2} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          drawerLabel: 'Productos',
          drawerIcon: ({ color, size }) => (
            <Feather name="grid" size={size - 2} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Cart"
        component={CartScreen}
        options={{
          drawerLabel: 'Mi carrito',
          drawerIcon: ({ color, size }) => (
            <Feather name="shopping-bag" size={size - 2} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}