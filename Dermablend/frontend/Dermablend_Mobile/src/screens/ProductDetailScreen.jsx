import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import ScreenHeader from "../components/ScreenHeader";
import { getProductById } from "../services/productsService";
import { useCart } from "../hooks/useCart";
import { COLORS, FONT_SIZE, RADIUS, SPACING } from "../utils/theme";

export default function ProductDetailScreen({ route, navigation }) {
  const initialProduct = route.params?.product;
  const [product, setProduct] = useState(initialProduct || null);
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const id = initialProduct?.id || route.params?.productId;
    if (!id) return;

    let isMounted = true;
    getProductById(id)
      .then((fresh) => {
        if (isMounted) setProduct(fresh);
      })
      .catch((err) => {
        if (isMounted && !initialProduct) {
          setError(err.message || "No fue posible cargar este producto.");
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <ScreenHeader title="Detalle del producto" onBack={() => navigation.goBack()} />
        <View style={styles.centerFill}>
          <ActivityIndicator size="large" color={COLORS.accent} />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.screen}>
        <ScreenHeader title="Detalle del producto" onBack={() => navigation.goBack()} />
        <View style={styles.centerFill}>
          <Feather name="alert-circle" size={28} color={COLORS.errorText} />
          <Text style={styles.errorText}>
            {error || "No fue posible cargar este producto."}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const outOfStock = Number.isFinite(product.stock) && product.stock <= 0;
  const maxQuantity = Number.isFinite(product.stock) ? product.stock : 99;

  const handleAddToCart = () => {
    if (outOfStock) return;
    const result = addItem(product, quantity);
    if (result.ok) {
      setFeedback(true);
      setTimeout(() => setFeedback(false), 1400);
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <ScreenHeader title="Detalle del producto" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageWrapper}>
          {product.image ? (
            <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={[styles.image, styles.imagePlaceholder]}>
              <Feather name="image" size={40} color={COLORS.inkMuted} />
            </View>
          )}
          {outOfStock && (
            <View style={styles.outOfStockBadge}>
              <Text style={styles.outOfStockText}>Agotado</Text>
            </View>
          )}
        </View>

        <View style={styles.body}>
          {!!product.category && <Text style={styles.category}>{product.category}</Text>}
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>

          <View style={styles.attributesRow}>
            {!!product.shade && <AttributeChip icon="droplet" label={product.shade} />}
            {!!product.coverageLevel && (
              <AttributeChip icon="layers" label={product.coverageLevel} />
            )}
            <AttributeChip
              icon={outOfStock ? "x-circle" : "check-circle"}
              label={outOfStock ? "Sin disponibilidad" : `${product.stock} disponibles`}
              tone={outOfStock ? "error" : "success"}
            />
          </View>

          {!!product.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Descripción</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          )}

          {!outOfStock && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cantidad</Text>
              <View style={styles.stepper}>
                <Pressable
                  style={styles.stepperButton}
                  onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <Feather name="minus" size={16} color={quantity <= 1 ? COLORS.cardBorder : COLORS.ink} />
                </Pressable>
                <Text style={styles.stepperValue}>{quantity}</Text>
                <Pressable
                  style={styles.stepperButton}
                  onPress={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
                  disabled={quantity >= maxQuantity}
                >
                  <Feather
                    name="plus"
                    size={16}
                    color={quantity >= maxQuantity ? COLORS.cardBorder : COLORS.ink}
                  />
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            outOfStock && styles.addButtonDisabled,
            pressed && !outOfStock && styles.addButtonPressed,
          ]}
          onPress={handleAddToCart}
          disabled={outOfStock}
        >
          {feedback && !outOfStock && (
            <Feather name="check" size={16} color={COLORS.ink} style={styles.addButtonIcon} />
          )}
          <Text style={styles.addButtonText}>
            {outOfStock ? "Sin disponibilidad" : feedback ? "Agregado al carrito" : "Agregar al carrito"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function AttributeChip({ icon, label, tone = "default" }) {
  return (
    <View style={[styles.attributeChip, tone === "error" && styles.attributeChipError, tone === "success" && styles.attributeChipSuccess]}>
      <Feather
        name={icon}
        size={12}
        color={tone === "error" ? COLORS.errorText : tone === "success" ? COLORS.successText : COLORS.accentDark}
      />
      <Text
        style={[
          styles.attributeChipText,
          tone === "error" && { color: COLORS.errorText },
          tone === "success" && { color: COLORS.successText },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerFill: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 24,
  },
  errorText: {
    color: COLORS.errorText,
    fontSize: 14,
    textAlign: "center",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  imageWrapper: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 22,
    backgroundColor: COLORS.buttonBg,
  },
  imagePlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  outOfStockBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: COLORS.overlay,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  outOfStockText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  body: {
    paddingHorizontal: 20,
  },
  category: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.accentDark,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.ink,
    marginBottom: 6,
  },
  price: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.accentDark,
    marginBottom: 14,
  },
  attributesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 18,
  },
  attributeChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  attributeChipError: {
    backgroundColor: COLORS.errorBg,
    borderColor: COLORS.errorBorder,
  },
  attributeChipSuccess: {
    backgroundColor: COLORS.successBg,
    borderColor: COLORS.successBorder,
  },
  attributeChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.ink,
    textTransform: "capitalize",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.ink,
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.inkMuted,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 16,
  },
  stepperButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperValue: {
    minWidth: 32,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.ink,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    backgroundColor: COLORS.background,
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: COLORS.buttonBg,
    borderRadius: RADIUS.pill,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonPressed: {
    backgroundColor: COLORS.buttonBgPressed,
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonIcon: {
    marginRight: SPACING.sm,
  },
  addButtonText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "700",
    color: COLORS.ink,
  },
});
