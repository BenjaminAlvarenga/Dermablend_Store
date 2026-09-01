import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { COLORS } from "../utils/theme";

export default function PromoBanner({
  eyebrow,
  title,
  description,
  image,
  imageShape = "rounded", // "rounded" | "circle"
  onShopNow,
}) {
  return (
    <View style={styles.card}>
      {eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
      {title && <Text style={styles.title}>{title}</Text>}

      <View style={styles.row}>
        <Text style={styles.description}>{description}</Text>
        <Image
          source={image}
          style={[
            styles.image,
            imageShape === "circle" && styles.imageCircle,
          ]}
          resizeMode="cover"
        />
      </View>

      <Pressable style={styles.button} onPress={onShopNow}>
        <Text style={styles.buttonText}>Shop now</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.buttonBg,
    borderRadius: 20,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.accentDark,
    letterSpacing: 1,
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.ink,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  description: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.inkMuted,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  imageCircle: {
    borderRadius: 45,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.ink,
  },
});