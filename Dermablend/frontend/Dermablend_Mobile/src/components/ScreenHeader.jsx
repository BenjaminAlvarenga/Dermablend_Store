import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, FONT_SIZE, SPACING } from "../utils/theme";

/**
 * Encabezado simple con botón de retroceso, reutilizado en pantallas
 * empujadas sobre un Stack (detalle de producto, recuperación de contraseña).
 */
export default function ScreenHeader({ title, onBack }) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onBack} style={styles.backButton} hitSlop={10}>
        <Feather name="arrow-left" size={20} color={COLORS.ink} />
      </Pressable>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.backButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
    color: COLORS.ink,
  },
});
