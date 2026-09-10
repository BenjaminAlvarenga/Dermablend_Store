import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { COLORS, RADIUS, SPACING, FONT_SIZE } from "../utils/theme";
import { translateAuthError } from "../utils/authErrors";
import { validateLoginFields } from "../utils/validators";
import TextField from "../components/TextField";
import PrimaryButton from "../components/PrimaryButton";
import DecorativeBlob from "./welcome/DecorativeBlob";

export default function LoginScreen({ navigation }) {
  const { login, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const passwordRef = useRef(null);

  const handleSubmit = async () => {
    if (loading) return;
    setFormError("");

    const errors = validateLoginFields({ email, password });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const result = await login({ email: email.trim(), password });
    if (!result.ok) {
      setFormError(translateAuthError(result.message));
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
        <View style={styles.brand}>
          <View style={styles.logoCircle}>
            <MaterialCommunityIcons name="lipstick" size={30} color={COLORS.accentDark} />
          </View>
          <Text style={styles.brandName}>DERMABLEND</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Bienvenida de vuelta</Text>
          <Text style={styles.subtitle}>
            Inicia sesión para continuar con tu compra y tus pedidos.
          </Text>

          <View style={styles.form}>
            <TextField
              label="Correo electrónico"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                if (formError) setFormError("");
              }}
              error={fieldErrors.email}
              placeholder="ejemplo@correo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />

            <TextField
              ref={passwordRef}
              label="Contraseña"
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
                if (formError) setFormError("");
              }}
              error={fieldErrors.password}
              placeholder="Tu contraseña"
              secureToggle
              autoCapitalize="none"
              editable={!loading}
              returnKeyType="go"
              onSubmitEditing={handleSubmit}
            />

            <Pressable
              onPress={() => navigation.navigate("ForgotPassword")}
              hitSlop={6}
              style={styles.forgotLink}
              disabled={loading}
            >
              <Text style={styles.forgotLinkText}>¿Olvidaste tu contraseña?</Text>
            </Pressable>

            {!!formError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{formError}</Text>
              </View>
            )}

            <PrimaryButton
              label="Iniciar sesión"
              loadingLabel="Ingresando..."
              loading={loading}
              onPress={handleSubmit}
              style={styles.submitButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>¿Aún no tienes cuenta? </Text>
            <Pressable
              onPress={() => navigation.navigate("Register")}
              hitSlop={6}
              disabled={loading}
            >
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
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxl,
  },
  brand: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
  },
  brandName: {
    fontSize: FONT_SIZE.md,
    fontWeight: "800",
    letterSpacing: 3,
    color: COLORS.ink,
  },
  card: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxl,
    shadowColor: "#2B1B17",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 4,
  },
  title: {
    color: COLORS.ink,
    fontSize: FONT_SIZE.heading,
    fontWeight: "800",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.inkMuted,
    fontSize: FONT_SIZE.base,
    lineHeight: 20,
    marginBottom: SPACING.xl,
    textAlign: "center",
  },
  form: {
    gap: SPACING.lg,
  },
  forgotLink: {
    alignSelf: "flex-end",
    marginTop: -4,
  },
  forgotLinkText: {
    color: COLORS.accentDark,
    fontSize: FONT_SIZE.sm,
    fontWeight: "700",
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
  submitButton: {
    marginTop: SPACING.xs,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.xl,
  },
  footerText: {
    color: COLORS.inkMuted,
    fontSize: FONT_SIZE.md,
  },
  footerLink: {
    color: COLORS.accentDark,
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
  },
});
