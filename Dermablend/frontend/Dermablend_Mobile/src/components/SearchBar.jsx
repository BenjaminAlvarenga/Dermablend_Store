import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../utils/theme";

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.wrapper}>
      <Feather name="search" size={18} color={COLORS.inkMuted} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="What are you looking for?"
        placeholderTextColor={COLORS.inkMuted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.buttonBg,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginHorizontal: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: COLORS.ink,
  },
});