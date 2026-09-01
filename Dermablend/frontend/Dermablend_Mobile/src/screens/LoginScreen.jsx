import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuth } from "../hooks/useAuth";
import { COLORS } from "../utils/theme";
import DecorativeBlob from "./welcome/DecorativeBlob";

export default function LoginScreen({ navigation, route }) {
  const { login, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const justVerified = route?.params?.justVerified;

  const handleSubmit = async () => {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Ingresa tu correo y contraseña.");
      return;
    }

    const result = await login({ email: email.trim(), password });
    if (!result.ok) {
      setError(result.message || "Error al iniciar sesión.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <DecorativeBlob position="top" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.tagText}>DERMABLEND</Text>

          <Text style={styles.title}>Bienvenido de vuelta</Text>
          <Text style={styles.subtitle}>
            Inicia sesión para continuar con tu compra y tus pedidos.
          </Text>

          {justVerified && (
            <View style={styles.verifiedBanner}>
              <Text style={styles.verifiedText}>
                ✓ Cuenta verificada. Ahora puedes iniciar sesión.
              </Text>
            </View>
          )}

          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="ejemplo@correo.com"
                placeholderTextColor={COLORS.inkMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Tu contraseña"
                  placeholderTextColor={COLORS.inkMuted}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  hitSlop={8}
                >
                  <Text style={styles.eyeText}>{showPassword ? "👁️" : "🔒"}</Text>
                </Pressable>
              </View>
            </View>

            {!!error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>⚠ {error}</Text>
              </View>
            )}

            <Pressable
              onPress={handleSubmit}
              disabled={loading}
              style={({ pressed }) => [
                styles.submitButton,
                pressed && styles.submitButtonPressed,
                loading && styles.submitButtonDisabled,
              ]}
            >
              {loading ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator size="small" color={COLORS.ink} />
                  <Text style={styles.submitButtonText}>Ingresando...</Text>
                </View>
              ) : (
                <Text style={styles.submitButtonText}>Iniciar sesión</Text>
              )}
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>¿Aún no tienes cuenta? </Text>
            <Pressable onPress={() => navigation.navigate("Register")} hitSlop={6}>
              <Text style={styles.footerLink}>Regístrate</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  card: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 30,
    shadowColor: "#3A2418",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  tagText: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  title: {
    color: COLORS.ink,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    color: COLORS.inkMuted,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  verifiedBanner: {
    backgroundColor: COLORS.successBg,
    borderColor: COLORS.successBorder,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  verifiedText: {
    color: COLORS.successText,
    fontSize: 13,
    fontWeight: "600",
  },
  form: {
    gap: 16,
  },
  fieldGroup: {
    gap: 6,
  },
  label: {
    color: COLORS.inkMuted,
    fontSize: 13,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.ink,
    fontSize: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.ink,
    fontSize: 15,
  },
  eyeButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  eyeText: {
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: COLORS.errorBg,
    borderColor: COLORS.errorBorder,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  errorText: {
    color: COLORS.errorText,
    fontSize: 13,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: COLORS.buttonBg,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  submitButtonPressed: {
    backgroundColor: COLORS.buttonBgPressed,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: COLORS.ink,
    fontSize: 15,
    fontWeight: "700",
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    color: COLORS.inkMuted,
    fontSize: 14,
  },
  footerLink: {
    color: COLORS.accentDark,
    fontSize: 14,
    fontWeight: "700",
  },
});