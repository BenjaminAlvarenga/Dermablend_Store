import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, FONT_SIZE, RADIUS, SPACING } from "../utils/theme";

function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("es-SV", { day: "numeric", month: "long" });
}

/**
 * Muestra una promoción real obtenida de /api/promotions (nunca datos
 * inventados: si no hay promociones activas y vigentes, este componente
 * simplemente no se renderiza).
 */
export default function OfferBanner({ promotion }) {
  if (!promotion) return null;

  const validUntil = formatDate(promotion.endDate);

  return (
    <View style={styles.card}>
      <View style={styles.badge}>
        <Feather name="percent" size={14} color={COLORS.ink} />
        <Text style={styles.badgeText}>{promotion.discountPercentage}% de descuento</Text>
      </View>

      <Text style={styles.name}>{promotion.name}</Text>
      {!!promotion.description && <Text style={styles.description}>{promotion.description}</Text>}

      {!!validUntil && <Text style={styles.validity}>Vigente hasta el {validUntil}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.accentSoft,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    marginBottom: SPACING.sm,
  },
  badgeText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: "800",
    color: COLORS.ink,
    letterSpacing: 0.3,
  },
  name: {
    fontSize: FONT_SIZE.title,
    fontWeight: "800",
    color: COLORS.ink,
    marginBottom: 4,
  },
  description: {
    fontSize: FONT_SIZE.base,
    color: COLORS.ink,
    lineHeight: 19,
    marginBottom: SPACING.sm,
  },
  validity: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.accentDark,
    fontWeight: "600",
  },
});
