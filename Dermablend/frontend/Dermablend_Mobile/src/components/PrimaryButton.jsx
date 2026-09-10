import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { COLORS, RADIUS, FONT_SIZE } from "../utils/theme";

/**
 * Botón principal reutilizable con estado de carga y bloqueo contra envíos
 * múltiples mientras `loading` es verdadero.
 */
export default function PrimaryButton({
  label,
  loadingLabel,
  onPress,
  loading = false,
  disabled = false,
  variant = "solid", // "solid" | "outline"
  style,
}) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variant === "outline" && styles.outline,
        pressed && !isDisabled && (variant === "outline" ? styles.outlinePressed : styles.solidPressed),
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === "outline" ? COLORS.accentDark : COLORS.ink} />
      ) : (
        <Text style={[styles.label, variant === "outline" && styles.labelOutline]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: COLORS.buttonBg,
    borderRadius: RADIUS.pill,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: COLORS.accent,
  },
  solidPressed: {
    backgroundColor: COLORS.buttonBgPressed,
  },
  outlinePressed: {
    backgroundColor: COLORS.accentSoft,
  },
  disabled: {
    opacity: 0.55,
  },
  label: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "700",
    color: COLORS.ink,
    letterSpacing: 0.2,
  },
  labelOutline: {
    color: COLORS.accentDark,
  },
});
