import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../utils/theme";

export default function ProductCard({ product, onPress, onAddToCart }) {
  const outOfStock = Number.isFinite(product.stock) && product.stock <= 0;

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress?.(product)}
    >
      <View style={styles.imageWrapper}>
        {product.image ? (
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Feather name="image" size={22} color={COLORS.inkMuted} />
          </View>
        )}

        {outOfStock && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>Agotado</Text>
          </View>
        )}

        {!outOfStock && onAddToCart && (
          <Pressable
            style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
            onPress={(event) => {
              event.stopPropagation?.();
              onAddToCart(product);
            }}
            hitSlop={6}
          >
            <Feather name="plus" size={16} color={COLORS.ink} />
          </Pressable>
        )}
      </View>

      {!!product.category && <Text style={styles.category}>{product.category}</Text>}
      <Text style={styles.name} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 18,
    padding: 12,
    shadowColor: "#2B1B17",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  imageWrapper: {
    marginBottom: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 14,
    backgroundColor: COLORS.buttonBg,
  },
  imagePlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  outOfStockBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: COLORS.overlay,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  outOfStockText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  addButton: {
    position: "absolute",
    right: 6,
    bottom: 6,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.buttonBg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2B1B17",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  addButtonPressed: {
    backgroundColor: COLORS.buttonBgPressed,
  },
  category: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.accentDark,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.ink,
    marginBottom: 6,
    minHeight: 34,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.ink,
  },
});
