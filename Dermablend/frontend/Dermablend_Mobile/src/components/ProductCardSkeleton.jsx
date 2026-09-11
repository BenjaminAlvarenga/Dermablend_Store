import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { COLORS } from "../utils/theme";

export default function ProductCardSkeleton() {
  const pulse = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 650, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.4, duration: 650, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.block, styles.image, { opacity: pulse }]} />
      <Animated.View style={[styles.block, styles.lineSmall, { opacity: pulse }]} />
      <Animated.View style={[styles.block, styles.lineLarge, { opacity: pulse }]} />
      <Animated.View style={[styles.block, styles.linePrice, { opacity: pulse }]} />
    </View>
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
  block: {
    backgroundColor: COLORS.buttonBg,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 14,
    marginBottom: 10,
  },
  lineSmall: {
    width: "40%",
    height: 8,
    marginBottom: 8,
  },
  lineLarge: {
    width: "85%",
    height: 10,
    marginBottom: 10,
  },
  linePrice: {
    width: "35%",
    height: 12,
  },
});
