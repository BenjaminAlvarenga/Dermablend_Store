import { View, Text, StyleSheet, Pressable } from "react-native";
import { COLORS } from "../utils/theme";

export default function RegisterScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Crear cuenta</Text>
      <Text style={styles.subtitle}>Pantalla de registro — próximamente</Text>
      <Pressable onPress={() => navigation.navigate("Login")} style={styles.btn}>
        <Text style={styles.btnText}>← Volver al Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background, padding: 24 },
  title: { fontSize: 22, fontWeight: "700", color: COLORS.ink, marginBottom: 8 },
  subtitle: { fontSize: 14, color: COLORS.inkMuted, marginBottom: 24 },
  btn: { backgroundColor: COLORS.buttonBg, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 20 },
  btnText: { color: COLORS.ink, fontWeight: "600" },
});
