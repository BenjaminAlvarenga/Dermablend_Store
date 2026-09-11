import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/authService";
import { COLORS, FONT_SIZE, RADIUS, SPACING } from "../utils/theme";

export default function ProfileScreen() {
  const { user: cachedUser, token, logout } = useAuth();
  const [profile, setProfile] = useState(cachedUser);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  // Carga el perfil real y actualizado desde la API (GET /auth/profile),
  // en vez de confiar únicamente en la respuesta cacheada del login.
  useEffect(() => {
    let isMounted = true;

    authService
      .getProfile(token)
      .then((response) => {
        if (isMounted && response?.user) setProfile(response.user);
      })
      .catch((error) => {
        if (!isMounted) return;
        if (error.status === 401) {
          logout();
          return;
        }
        // Si falla la actualización, seguimos mostrando los datos en caché
        // de la sesión (degradación elegante, sin romper la pantalla).
      })
      .finally(() => {
        if (isMounted) setLoadingProfile(false);
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const initials = (profile?.name || "C")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Seguro que deseas cerrar tu sesión?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: async () => {
          setLoggingOut(true);
          await logout();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Mi perfil</Text>
          {loadingProfile && <ActivityIndicator size="small" color={COLORS.accent} />}
        </View>

        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.name}>{profile?.name || "Cliente Dermablend"}</Text>
          <Text style={styles.email}>{profile?.email}</Text>
        </View>

        <View style={styles.infoCard}>
          <InfoRow icon="phone" label="Teléfono" value={profile?.phone || "No registrado"} />
          <InfoRow icon="droplet" label="Tipo de piel" value={profile?.skin_type || "No especificado"} />
          <InfoRow icon="sun" label="Tono de piel" value={profile?.skin_tone || "No especificado"} />
          <InfoRow
            icon={profile?.is_verified ? "check-circle" : "alert-circle"}
            label="Correo verificado"
            value={profile?.is_verified ? "Verificado" : "Pendiente de verificación"}
            tone={profile?.is_verified ? "success" : "warning"}
            isLast
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.logoutButtonPressed,
          ]}
          onPress={handleLogout}
          disabled={loggingOut}
        >
          <Feather name="log-out" size={18} color={COLORS.errorText} />
          <Text style={styles.logoutText}>
            {loggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value, tone = "default", isLast = false }) {
  return (
    <View style={[styles.infoRow, isLast && styles.infoRowLast]}>
      <View style={styles.infoIcon}>
        <Feather
          name={icon}
          size={16}
          color={tone === "success" ? COLORS.successText : tone === "warning" ? COLORS.accentDark : COLORS.inkMuted}
        />
      </View>
      <View style={styles.infoTextGroup}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.heading,
    fontWeight: "800",
    color: COLORS.ink,
  },
  card: {
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.xl,
    paddingVertical: SPACING.xxl,
    marginBottom: SPACING.lg,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.buttonBg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
  },
  avatarText: {
    fontSize: FONT_SIZE.heading,
    fontWeight: "800",
    color: COLORS.accentDark,
  },
  name: {
    fontSize: FONT_SIZE.title,
    fontWeight: "700",
    color: COLORS.ink,
    marginBottom: 2,
  },
  email: {
    fontSize: FONT_SIZE.base,
    color: COLORS.inkMuted,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 6,
    marginBottom: SPACING.xl,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  infoRowLast: {
    borderBottomWidth: 0,
  },
  infoIcon: {
    width: 32,
    alignItems: "center",
  },
  infoTextGroup: {
    flex: 1,
  },
  infoLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.inkMuted,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    color: COLORS.ink,
    textTransform: "capitalize",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.errorBg,
    borderWidth: 1,
    borderColor: COLORS.errorBorder,
    borderRadius: RADIUS.pill,
    paddingVertical: SPACING.md + 2,
  },
  logoutButtonPressed: {
    opacity: 0.8,
  },
  logoutText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
    color: COLORS.errorText,
  },
});
