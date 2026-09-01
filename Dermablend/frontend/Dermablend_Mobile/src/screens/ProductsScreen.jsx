import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../utils/theme";

export default function ProductsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>🧴 Productos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background },
  text: { fontSize: 18, color: COLORS.ink, fontWeight: "600" },
});