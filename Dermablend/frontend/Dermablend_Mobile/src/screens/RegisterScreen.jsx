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
import { translateAuthError } from "../utils/authErrors";
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

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const BIRTHDATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

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
  const [error, setError] = useState("");

  const validate = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !birthdate.trim() ||
      !phone.trim()
    ) {
      return "Completa todos los campos.";
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return "Ingresa un correo electrónico válido.";
    }

    if (password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres.";
    }

    if (password !== confirmPassword) {
      return "Las contraseñas no coinciden.";
    }

    if (!BIRTHDATE_REGEX.test(birthdate.trim()) || isNaN(Date.parse(birthdate.trim()))) {
      return "Ingresa tu fecha de nacimiento en formato AAAA-MM-DD.";
    }

    return "";
  };

  const handleSubmit = async () => {
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

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
      setError(translateAuthError(result.message));
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
            <Field label="Nombre completo">
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Tu nombre"
                placeholderTextColor={COLORS.inkMuted}
              />
            </Field>

            <Field label="Correo electrónico">
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
            </Field>

            <Field label="Contraseña">
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor={COLORS.inkMuted}
                secureTextEntry
                autoCapitalize="none"
              />
            </Field>

            <Field label="Confirmar contraseña">
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Repite tu contraseña"
                placeholderTextColor={COLORS.inkMuted}
                secureTextEntry
                autoCapitalize="none"
              />
            </Field>

            <Field label="Fecha de nacimiento (AAAA-MM-DD)">
              <TextInput
                style={styles.input}
                value={birthdate}
                onChangeText={setBirthdate}
                placeholder="1998-05-20"
                placeholderTextColor={COLORS.inkMuted}
                keyboardType="numbers-and-punctuation"
              />
            </Field>

            <Field label="Teléfono">
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="1234-5678"
                placeholderTextColor={COLORS.inkMuted}
                keyboardType="phone-pad"
              />
            </Field>

            <Field label="Tipo de piel">
              <ChipSelector
                options={SKIN_TYPES}
                selected={skinType}
                onSelect={setSkinType}
              />
            </Field>

            <Field label="Tono de piel">
              <ChipSelector
                options={SKIN_TONES}
                selected={skinTone}
                onSelect={setSkinTone}
              />
            </Field>

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
                  <Text style={styles.submitButtonText}>Creando cuenta...</Text>
                </View>
              ) : (
                <Text style={styles.submitButtonText}>Crear cuenta</Text>
              )}
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
            <Pressable onPress={() => navigation.navigate("Login")} hitSlop={6}>
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

function ChipSelector({ options, selected, onSelect }) {
  return (
    <View style={styles.chipRow}>
      {options.map((option) => {
        const isActive = option.value === selected;
        return (
          <Pressable
            key={option.value}
            onPress={() => onSelect(option.value)}
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
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipActive: {
    backgroundColor: COLORS.buttonBg,
    borderColor: COLORS.accent,
  },
  chipText: {
    color: COLORS.inkMuted,
    fontSize: 13,
    fontWeight: "600",
  },
  chipTextActive: {
    color: COLORS.ink,
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
