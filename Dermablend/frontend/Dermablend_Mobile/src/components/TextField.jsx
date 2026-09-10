import { forwardRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, RADIUS, SPACING, FONT_SIZE } from "../utils/theme";

/**
 * Campo de texto reutilizable con estados normal, focus, error y disabled.
 * Soporta alternar visibilidad de contraseña (sin emojis, con íconos Feather).
 */
const TextField = forwardRef(function TextField(
  {
    label,
    error,
    secureToggle = false,
    editable = true,
    containerStyle,
    ...inputProps
  },
  ref
) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(secureToggle);
  const hasError = !!error;

  return (
    <View style={[styles.group, containerStyle]}>
      {!!label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputWrapper,
          focused && !hasError && styles.inputWrapperFocused,
          hasError && styles.inputWrapperError,
          !editable && styles.inputWrapperDisabled,
        ]}
      >
        <TextInput
          ref={ref}
          style={styles.input}
          placeholderTextColor={COLORS.inkFaint}
          editable={editable}
          secureTextEntry={secureToggle ? hidden : inputProps.secureTextEntry}
          onFocus={(event) => {
            setFocused(true);
            inputProps.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            inputProps.onBlur?.(event);
          }}
          {...inputProps}
        />

        {secureToggle && (
          <Pressable
            onPress={() => setHidden((v) => !v)}
            hitSlop={10}
            style={styles.toggleButton}
          >
            <Feather
              name={hidden ? "eye-off" : "eye"}
              size={18}
              color={COLORS.inkMuted}
            />
          </Pressable>
        )}
      </View>

      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
});

export default TextField;

const styles = StyleSheet.create({
  group: {
    gap: 6,
  },
  label: {
    color: COLORS.inkMuted,
    fontSize: FONT_SIZE.base,
    fontWeight: "600",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.md,
  },
  inputWrapperFocused: {
    borderColor: COLORS.borderFocus,
  },
  inputWrapperError: {
    borderColor: COLORS.errorBorder,
    backgroundColor: COLORS.errorBg,
  },
  inputWrapperDisabled: {
    opacity: 0.6,
  },
  input: {
    flex: 1,
    paddingHorizontal: SPACING.md + 2,
    paddingVertical: 13,
    color: COLORS.ink,
    fontSize: FONT_SIZE.lg,
  },
  toggleButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
  },
  errorText: {
    color: COLORS.errorText,
    fontSize: FONT_SIZE.sm,
    fontWeight: "500",
  },
});
