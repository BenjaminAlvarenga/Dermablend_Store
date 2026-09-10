import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { COLORS } from "../utils/theme";

export default function ProductCard({ product, onPress }) {
  return (
    <Pressable style={styles.card} onPress={() => onPress?.(product)}>
      <View style={styles.imageWrapper}>
        {product.image ? (
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Text style={styles.imagePlaceholderText}>Sin imagen</Text>
          </View>
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
  imagePlaceholderText: {
    fontSize: 11,
    color: COLORS.inkMuted,
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
