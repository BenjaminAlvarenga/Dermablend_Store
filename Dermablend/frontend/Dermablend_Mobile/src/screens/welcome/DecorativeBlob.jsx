import { View, StyleSheet } from "react-native";
import { COLORS } from "../../utils/theme";

/**
 * Decorative background blob for auth screens.
 * @param {{ position: "top" | "bottom" }} props
 */
export default function DecorativeBlob({ position = "top" }) {
  return (
    <View
      style={[
        styles.blob,
        position === "top" ? styles.blobTop : styles.blobBottom,
      ]}
      pointerEvents="none"
    />
  );
}

const styles = StyleSheet.create({
  blob: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: COLORS.blob,
    opacity: 0.18,
    zIndex: 0,
  },
  blobTop: {
    top: -80,
    right: -60,
  },
  blobBottom: {
    bottom: -80,
    left: -60,
  },
});
