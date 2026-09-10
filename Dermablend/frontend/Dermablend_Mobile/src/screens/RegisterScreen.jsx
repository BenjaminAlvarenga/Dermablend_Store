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
import { useAuth } from "../hooks/useAuth";
import { COLORS, RADIUS, SPACING, FONT_SIZE } from "../utils/theme";
import { translateAuthError } from "../utils/authErrors";
import { validateRegisterFields } from "../utils/validators";
import TextField from "../components/TextField";
import PrimaryButton from "../components/PrimaryButton";
import DecorativeBlob from "./welcome/DecorativeBlob";

const SKIN_TYPES = [
  { value: "grasa", label: "Grasa" },
  { value: "seca", label: "Seca" },
  { value: "mixta", label: "Mixta" },
];

const SKIN_TONES = [
  { value: "blanca", label: "Blanca" },
  { value: "trigueña", label: "Trigueña" },
  { value: "morena", label: "Morena" },
];

export default function RegisterScreen({ navigation }) {
  const { register, loading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [skinType, setSkinType] = useState("mixta");
  const [skinTone, setSkinTone] = useState("blanca");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const birthdateRef = useRef(null);
  const phoneRef = useRef(null);

  const fieldChangeHandler = (field, setter) => (value) => {
    setter(value);
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    if (formError) setFormError("");
  };

  const handleSubmit = async () => {
    if (loading) return;
    setFormError("");

    const errors = validateRegisterFields({
      name,
      email,
      password,
      confirmPassword,
      birthdate,
      phone,
    });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const result = await register({
      name: name.trim(),
      email: email.trim(),
      password,
      birthdate: birthdate.trim(),
      phone: phone.trim(),
      skin_type: skinType,
      skin_tone: skinTone,
    });

    if (!result.ok) {
      setFormError(translateAuthError(result.message));
    }
    // Si el registro es exitoso, AuthContext guarda la sesión y App.js
    // navega automáticamente a la pantalla principal.
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

          <Text style={styles.title}>Crea tu cuenta</Text>
          <Text style={styles.subtitle}>
            Regístrate para guardar tus pedidos y favoritos.
          </Text>

          <View style={styles.form}>
            <TextField
              label="Nombre completo"
              value={name}
              onChangeText={fieldChangeHandler("name", setName)}
              error={fieldErrors.name}
              placeholder="Tu nombre"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
            />

            <TextField
              ref={emailRef}
              label="Correo electrónico"
              value={email}
              onChangeText={fieldChangeHandler("email", setEmail)}
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
              onChangeText={fieldChangeHandler("password", setPassword)}
              error={fieldErrors.password}
              placeholder="Mínimo 6 caracteres"
              secureToggle
              autoCapitalize="none"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            />

            <TextField
              ref={confirmPasswordRef}
              label="Confirmar contraseña"
              value={confirmPassword}
              onChangeText={fieldChangeHandler("confirmPassword", setConfirmPassword)}
              error={fieldErrors.confirmPassword}
              placeholder="Repite tu contraseña"
              secureToggle
              autoCapitalize="none"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => birthdateRef.current?.focus()}
            />

            <TextField
              ref={birthdateRef}
              label="Fecha de nacimiento (AAAA-MM-DD)"
              value={birthdate}
              onChangeText={fieldChangeHandler("birthdate", setBirthdate)}
              error={fieldErrors.birthdate}
              placeholder="1998-05-20"
              keyboardType="numbers-and-punctuation"
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => phoneRef.current?.focus()}
            />

            <TextField
              ref={phoneRef}
              label="Teléfono"
              value={phone}
              onChangeText={fieldChangeHandler("phone", setPhone)}
              error={fieldErrors.phone}
              placeholder="1234-5678"
              keyboardType="phone-pad"
              editable={!loading}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />

            <Field label="Tipo de piel">
              <ChipSelector
                options={SKIN_TYPES}
                selected={skinType}
                onSelect={setSkinType}
                disabled={loading}
              />
            </Field>

            <Field label="Tono de piel">
              <ChipSelector
                options={SKIN_TONES}
                selected={skinTone}
                onSelect={setSkinTone}
                disabled={loading}
              />
            </Field>

            {!!formError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{formError}</Text>
              </View>
            )}

            <PrimaryButton
              label="Crear cuenta"
              loadingLabel="Creando cuenta..."
              loading={loading}
              onPress={handleSubmit}
              style={styles.submitButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
            <Pressable
              onPress={() => navigation.navigate("Login")}
              hitSlop={6}
              disabled={loading}
            >
              <Text style={styles.footerLink}>Inicia sesión</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({ label, children }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

function ChipSelector({ options, selected, onSelect, disabled }) {
  return (
    <View style={styles.chipRow}>
      {options.map((option) => {
        const isActive = option.value === selected;
        return (
          <Pressable
            key={option.value}
            onPress={() => onSelect(option.value)}
            disabled={disabled}
            style={[styles.chip, isActive && styles.chipActive]}
          >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
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
  tagText: {
    color: COLORS.accent,
    fontSize: FONT_SIZE.sm,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: SPACING.md,
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
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  chip: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  chipActive: {
    backgroundColor: COLORS.buttonBg,
    borderColor: COLORS.accent,
  },
  chipText: {
    color: COLORS.inkMuted,
    fontSize: FONT_SIZE.base,
    fontWeight: "600",
  },
  chipTextActive: {
    color: COLORS.ink,
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
