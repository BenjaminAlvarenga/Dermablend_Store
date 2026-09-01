import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import PromoBanner from "../components/PromoBanner";
import { COLORS } from "../utils/theme";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <SearchBar value="" onChangeText={() => {}} />

        <PromoBanner
          eyebrow="New arrival!"
          description="Maquillaje profesional de alta cobertura y skincare avanzado en un solo paso. Cubre imperfecciones al instante con una fórmula tratante que protege y mejora tu piel mientras la usas."
          image={require("../../assets/icon.png")}
          onShopNow={() => {}}
        />

        <PromoBanner
          title="Beauty combo"
          description="Sets curados con lo esencial para tu rutina de belleza diaria, listos para regalar o para ti."
          image={require("../../assets/icon.png")}
          onShopNow={() => {}}
        />

        <PromoBanner
          title="No se que es eso tio"
          description="Descripción del producto aquí — reemplaza este texto cuando tengas el copy final."
          image={require("../../assets/icon.png")}
          imageShape="circle"
          onShopNow={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingBottom: 20,
  },
});