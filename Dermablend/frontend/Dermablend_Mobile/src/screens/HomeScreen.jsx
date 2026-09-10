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
import { Feather } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import OfferBanner from "../components/OfferBanner";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import EmptyState from "../components/EmptyState";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";
import { getActivePromotions } from "../services/promotionsService";
import { COLORS, FONT_SIZE, RADIUS, SPACING } from "../utils/theme";

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const { itemCount, addItem } = useCart();
  const { products, categories, loading, refreshing, error, refresh } = useProducts();
  const [search, setSearch] = useState("");
  const [promotion, setPromotion] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getActivePromotions()
      .then((promotions) => {
        if (isMounted && promotions.length > 0) setPromotion(promotions[0]);
      })
      .catch(() => {
        // Las promociones son un extra informativo: si fallan, la Home
        // sigue funcionando normalmente sin bloquear al usuario.
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const firstName = user?.name?.split(" ")[0] || "Cliente";
  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [products, search]
  );

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={loading ? Array.from({ length: 4 }) : filteredProducts}
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
            <View style={styles.header}>
              <View>
                <Text style={styles.greetingMuted}>Hola,</Text>
                <Text style={styles.greetingName}>{firstName}</Text>
              </View>
              <Pressable
                onPress={() => navigation.navigate("Cart")}
                style={styles.cartButton}
                hitSlop={8}
              >
                <Feather name="shopping-bag" size={20} color={COLORS.ink} />
                {itemCount > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{itemCount > 9 ? "9+" : itemCount}</Text>
                  </View>
                )}
              </Pressable>
            </View>

            <SearchBar value={search} onChangeText={setSearch} />

            <OfferBanner promotion={promotion} />

            {categories.length > 0 && (
              <View style={styles.categoriesSection}>
                <Text style={styles.sectionTitle}>Categorías</Text>
                <FlatList
                  data={categories}
                  horizontal
                  keyExtractor={(item) => item}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.categoryRow}
                  renderItem={({ item }) => (
                    <Pressable
                      style={styles.categoryChip}
                      onPress={() => navigation.navigate("Products", { initialCategory: item })}
                    >
                      <Text style={styles.categoryChipText}>{item}</Text>
                    </Pressable>
                  )}
                />
              </View>
            )}

            <Text style={styles.sectionTitle}>Nuestros productos</Text>

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
                description="No encontramos productos que coincidan con tu búsqueda."
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
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  greetingMuted: {
    fontSize: FONT_SIZE.base,
    color: COLORS.inkMuted,
  },
  greetingName: {
    fontSize: FONT_SIZE.heading,
    fontWeight: "800",
    color: COLORS.ink,
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.buttonBg,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 3,
    backgroundColor: COLORS.accentDark,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },
  categoriesSection: {
    marginBottom: SPACING.sm,
  },
  categoryRow: {
    paddingHorizontal: SPACING.xl,
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  categoryChip: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  categoryChipText: {
    fontSize: FONT_SIZE.base,
    fontWeight: "600",
    color: COLORS.ink,
    textTransform: "capitalize",
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: "800",
    color: COLORS.ink,
    marginHorizontal: SPACING.xl,
    marginTop: 4,
    marginBottom: SPACING.md,
  },
  columnWrapper: {
    gap: SPACING.md,
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
  },
});
