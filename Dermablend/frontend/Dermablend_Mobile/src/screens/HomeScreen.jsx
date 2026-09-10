import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import PromoBanner from "../components/PromoBanner";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../hooks/useAuth";
import { getProducts } from "../services/productsService";
import { COLORS } from "../utils/theme";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getProducts()
      .then((data) => {
        if (isMounted) setProducts(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || "No fue posible cargar los productos.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const firstName = user?.name?.split(" ")[0] || "Cliente";
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View>
                <Text style={styles.greetingMuted}>Hola,</Text>
                <Text style={styles.greetingName}>{firstName} 👋</Text>
              </View>
              <Pressable onPress={logout} style={styles.logoutButton} hitSlop={8}>
                <Feather name="log-out" size={20} color={COLORS.inkMuted} />
              </Pressable>
            </View>

            <SearchBar value={search} onChangeText={setSearch} />

            <PromoBanner
              eyebrow="New arrival!"
              description="Maquillaje profesional de alta cobertura y skincare avanzado en un solo paso. Cubre imperfecciones al instante con una fórmula tratante que protege y mejora tu piel mientras la usas."
              image={require("../../assets/icon.png")}
              onShopNow={() => {}}
            />

            <Text style={styles.sectionTitle}>Nuestros productos</Text>

            {loading && (
              <ActivityIndicator size="small" color={COLORS.accent} style={styles.loadingIndicator} />
            )}

            {!!error && !loading && <Text style={styles.errorText}>{error}</Text>}

            {!loading && !error && filteredProducts.length === 0 && (
              <Text style={styles.emptyText}>No se encontraron productos.</Text>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  greetingMuted: {
    fontSize: 13,
    color: COLORS.inkMuted,
  },
  greetingName: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.ink,
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.buttonBg,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.ink,
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 12,
  },
  loadingIndicator: {
    marginTop: 12,
  },
  errorText: {
    color: COLORS.errorText,
    fontSize: 13,
    marginHorizontal: 20,
  },
  emptyText: {
    color: COLORS.inkMuted,
    fontSize: 13,
    marginHorizontal: 20,
  },
  columnWrapper: {
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
});
