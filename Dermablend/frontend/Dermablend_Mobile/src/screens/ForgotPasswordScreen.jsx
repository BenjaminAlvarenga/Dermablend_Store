import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import ScreenHeader from "../components/ScreenHeader";
import TextField from "../components/TextField";
import PrimaryButton from "../components/PrimaryButton";
import { recoveryService } from "../services/recoveryService";
import { translateAuthError } from "../utils/authErrors";
import { isBlank, isValidEmail } from "../utils/validators";
import { COLORS, FONT_SIZE, RADIUS, SPACING } from "../utils/theme";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleSubmit = async () => {
    if (loading) return;
    setError("");

    if (isBlank(email)) {
      setError("Ingresa tu correo electrónico.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }

    setLoading(true);
    try {
      const response = await recoveryService.requestRecovery(email);
      setConfirmationMessage(
        response?.message ||
          "Si la cuenta existe, recibirás un correo con instrucciones para restablecer tu contraseña."
      );
      setSent(true);
    } catch (err) {
      setError(translateAuthError(err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <ScreenHeader title="Recuperar contraseña" onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {sent ? (
            <View style={styles.confirmationCard}>
              <View style={styles.confirmationIcon}>
                <Feather name="mail" size={26} color={COLORS.successText} />
              </View>
              <Text style={styles.confirmationTitle}>Revisa tu correo</Text>
              <Text style={styles.confirmationText}>{confirmationMessage}</Text>
              <Text style={styles.confirmationHint}>
                El enlace incluye un código de recuperación válido por 1 hora. Si ya lo tienes,
                continúa para establecer tu nueva contraseña.
              </Text>

              <PrimaryButton
                label="Ya tengo mi código"
                onPress={() => navigation.navigate("ResetPassword")}
                style={styles.confirmationButton}
              />
              <PrimaryButton
                label="Volver a iniciar sesión"
                variant="outline"
                onPress={() => navigation.navigate("Login")}
                style={styles.confirmationButton}
              />
            </View>
          ) : (
            <View style={styles.card}>
              <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
              <Text style={styles.subtitle}>
                Ingresa el correo asociado a tu cuenta y te enviaremos instrucciones para
                restablecer tu contraseña.
              </Text>

              <View style={styles.form}>
                <TextField
                  label="Correo electrónico"
                  value={email}
                  onChangeText={(value) => {
                    setEmail(value);
                    if (error) setError("");
                  }}
                  placeholder="ejemplo@correo.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit}
                />

                {!!error && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                )}

                <PrimaryButton
                  label="Enviar instrucciones"
                  loadingLabel="Enviando..."
                  loading={loading}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxl,
  },
  card: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxl,
  },
  title: {
    color: COLORS.ink,
    fontSize: FONT_SIZE.heading,
    fontWeight: "800",
    marginBottom: 6,
  },
  subtitle: {
    color: COLORS.inkMuted,
    fontSize: FONT_SIZE.base,
    lineHeight: 20,
    marginBottom: SPACING.xl,
  },
  form: {
    gap: SPACING.lg,
  },
  errorContainer: {
    backgroundColor: COLORS.errorBg,
    borderColor: COLORS.errorBorder,
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
  },
  errorText: {
    color: COLORS.errorText,
    fontSize: FONT_SIZE.base,
    fontWeight: "500",
  },
  confirmationCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxl,
    alignItems: "center",
  },
  confirmationIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.successBg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.lg,
  },
  confirmationTitle: {
    fontSize: FONT_SIZE.title,
    fontWeight: "800",
    color: COLORS.ink,
    marginBottom: SPACING.sm,
  },
  confirmationText: {
    fontSize: FONT_SIZE.base,
    color: COLORS.ink,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: SPACING.sm,
  },
  confirmationHint: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.inkMuted,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: SPACING.xl,
  },
  confirmationButton: {
    width: "100%",
    marginTop: SPACING.sm,
  },
});
