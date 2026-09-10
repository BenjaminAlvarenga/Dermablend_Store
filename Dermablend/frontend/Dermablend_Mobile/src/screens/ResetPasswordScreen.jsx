import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import ScreenHeader from "../components/ScreenHeader";
import TextField from "../components/TextField";
import PrimaryButton from "../components/PrimaryButton";
import { recoveryService } from "../services/recoveryService";
import { translateAuthError } from "../utils/authErrors";
import { MIN_PASSWORD_LENGTH, validateResetPasswordFields } from "../utils/validators";
import { COLORS, FONT_SIZE, RADIUS, SPACING } from "../utils/theme";

export default function ResetPasswordScreen({ navigation }) {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  const fieldChangeHandler = (field, setter) => (value) => {
    setter(value);
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    if (formError) setFormError("");
  };

  const handleSubmit = async () => {
    if (loading) return;
    setFormError("");

    const errors = validateResetPasswordFields({ token, newPassword, confirmPassword });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      await recoveryService.resetPassword({ token, newPassword });
      setSuccess(true);
    } catch (err) {
      setFormError(translateAuthError(err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <ScreenHeader title="Restablecer contraseña" onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {success ? (
            <View style={styles.confirmationCard}>
              <View style={styles.confirmationIcon}>
                <Feather name="check" size={26} color={COLORS.successText} />
              </View>
              <Text style={styles.confirmationTitle}>Contraseña actualizada</Text>
              <Text style={styles.confirmationText}>
                Tu contraseña se cambió correctamente. Ya puedes iniciar sesión con tus nuevas
                credenciales.
              </Text>
              <PrimaryButton
                label="Ir a iniciar sesión"
                onPress={() => navigation.navigate("Login")}
                style={styles.confirmationButton}
              />
            </View>
          ) : (
            <View style={styles.card}>
              <Text style={styles.title}>Establece tu nueva contraseña</Text>
              <Text style={styles.subtitle}>
                Pega el código de recuperación que recibiste por correo y elige una nueva
                contraseña.
              </Text>

              <View style={styles.form}>
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Código de recuperación</Text>
                  <TextInput
                    style={[styles.tokenInput, fieldErrors.token && styles.tokenInputError]}
                    value={token}
                    onChangeText={fieldChangeHandler("token", setToken)}
                    placeholder="Pega aquí el código recibido por correo"
                    placeholderTextColor={COLORS.inkFaint}
                    autoCapitalize="none"
                    autoCorrect={false}
                    multiline
                    editable={!loading}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                  />
                  {!!fieldErrors.token && <Text style={styles.errorText}>{fieldErrors.token}</Text>}
                </View>

                <TextField
                  ref={passwordRef}
                  label="Nueva contraseña"
                  value={newPassword}
                  onChangeText={fieldChangeHandler("newPassword", setNewPassword)}
                  error={fieldErrors.newPassword}
                  placeholder={`Mínimo ${MIN_PASSWORD_LENGTH} caracteres`}
                  secureToggle
                  autoCapitalize="none"
                  editable={!loading}
                  returnKeyType="next"
                  onSubmitEditing={() => confirmRef.current?.focus()}
                />

                <TextField
                  ref={confirmRef}
                  label="Confirmar contraseña"
                  value={confirmPassword}
                  onChangeText={fieldChangeHandler("confirmPassword", setConfirmPassword)}
                  error={fieldErrors.confirmPassword}
                  placeholder="Repite tu nueva contraseña"
                  secureToggle
                  autoCapitalize="none"
                  editable={!loading}
                  returnKeyType="go"
                  onSubmitEditing={handleSubmit}
                />

                {!!formError && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{formError}</Text>
                  </View>
                )}

                <PrimaryButton
                  label="Restablecer contraseña"
                  loadingLabel="Actualizando..."
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
  fieldGroup: {
    gap: 6,
  },
  label: {
    color: COLORS.inkMuted,
    fontSize: FONT_SIZE.base,
    fontWeight: "600",
  },
  tokenInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md + 2,
    paddingVertical: SPACING.md,
    minHeight: 72,
    textAlignVertical: "top",
    color: COLORS.ink,
    fontSize: FONT_SIZE.base,
  },
  tokenInputError: {
    borderColor: COLORS.errorBorder,
    backgroundColor: COLORS.errorBg,
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
    marginBottom: SPACING.xl,
  },
  confirmationButton: {
    width: "100%",
  },
});
