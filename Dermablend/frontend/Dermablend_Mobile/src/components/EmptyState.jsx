import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../utils/theme";

/**
 * Estado vacío/error reutilizable para listas (productos, carrito, búsquedas).
 * @param {{ icon?: string, title: string, description?: string, actionLabel?: string, onAction?: () => void, tone?: "default"|"error" }} props
 */
export default function EmptyState({
  icon = "inbox",
  title,
  description,
  actionLabel,
  onAction,
  tone = "default",
}) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.iconCircle, tone === "error" && styles.iconCircleError]}>
        <Feather
          name={icon}
          size={26}
          color={tone === "error" ? COLORS.errorText : COLORS.accentDark}
        />
      </View>
      <Text style={styles.title}>{title}</Text>
      {!!description && <Text style={styles.description}>{description}</Text>}
      {!!actionLabel && (
        <Pressable
          style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
          onPress={onAction}
        >
          <Text style={styles.actionText}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.buttonBg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  iconCircleError: {
    backgroundColor: COLORS.errorBg,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.ink,
    textAlign: "center",
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: COLORS.inkMuted,
    textAlign: "center",
    lineHeight: 18,
  },
  actionButton: {
    marginTop: 16,
    backgroundColor: COLORS.buttonBg,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  actionButtonPressed: {
    backgroundColor: COLORS.buttonBgPressed,
  },
  actionText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.ink,
  },
});
