import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import EmptyState from "../components/EmptyState";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import { COLORS } from "../utils/theme";

const ALL_CATEGORY = "Todos";

export default function ProductsScreen({ navigation, route }) {
  const { products, categories, loading, refreshing, error, refresh } = useProducts();
  const { addItem } = useCart();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(route.params?.initialCategory || ALL_CATEGORY);

  // La Home puede llevar aquí con una categoría preseleccionada (tabs
  // permanecen montados, así que reaccionamos a cambios de params).
  useEffect(() => {
    if (route.params?.initialCategory) {
      setActiveCategory(route.params.initialCategory);
    }
  }, [route.params?.initialCategory]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === ALL_CATEGORY || product.category === activeCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, search]);

  const chips = [ALL_CATEGORY, ...categories];

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={loading ? Array.from({ length: 6 }) : filteredProducts}
        keyExtractor={(item, index) => (loading ? `skeleton-${index}` : item.id)}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={COLORS.accent} />
        }
        renderItem={({ item }) =>
          loading ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard
              product={item}
              onPress={(product) => navigation.navigate("ProductDetail", { product })}
              onAddToCart={(product) => addItem(product, 1)}
            />
          )
        }
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Productos</Text>
            <SearchBar value={search} onChangeText={setSearch} />

            {chips.length > 1 && (
              <FlatList
                data={chips}
                horizontal
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipRow}
                renderItem={({ item }) => {
                  const isActive = item === activeCategory;
                  return (
                    <Pressable
                      onPress={() => setActiveCategory(item)}
                      style={[styles.chip, isActive && styles.chipActive]}
                    >
                      <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                        {item}
                      </Text>
                    </Pressable>
                  );
                }}
              />
            )}

            {!!error && !loading && (
              <EmptyState
                icon="wifi-off"
                tone="error"
                title="No pudimos cargar los productos"
                description={error}
                actionLabel="Reintentar"
                onAction={refresh}
              />
            )}

            {!loading && !error && filteredProducts.length === 0 && (
              <EmptyState
                icon="search"
                title="Sin resultados"
                description="No encontramos productos que coincidan con tu búsqueda o filtro."
              />
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
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.ink,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 14,
  },
  chipRow: {
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipActive: {
    backgroundColor: COLORS.buttonBg,
    borderColor: COLORS.accent,
  },
  chipText: {
    color: COLORS.inkMuted,
    fontSize: 13,
    fontWeight: "600",
  },
  chipTextActive: {
    color: COLORS.ink,
  },
  columnWrapper: {
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
});
