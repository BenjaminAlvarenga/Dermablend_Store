import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import EmptyState from "../components/EmptyState";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { createOrder } from "../services/ordersService";
import { COLORS } from "../utils/theme";

const PAYMENT_METHODS = [
  { value: "credit_card", label: "Tarjeta de crédito", icon: "credit-card" },
  { value: "debit_card", label: "Tarjeta de débito", icon: "credit-card" },
  { value: "bank_transfer", label: "Transferencia", icon: "repeat" },
];

export default function CartScreen({ navigation }) {
  const { items, subtotal, shipping, shippingThreshold, total, increment, decrement, removeItem, clearCart } =
    useCart();
  const { user, token, logout } = useAuth();

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const hasItems = items.length > 0;

  const handlePlaceOrder = async () => {
    setCheckoutError("");

    if (!address.trim()) {
      setCheckoutError("Ingresa una dirección de envío.");
      return;
    }

    setPlacingOrder(true);
    try {
      await createOrder({
        clientId: user?._id || user?.id,
        products: items.map((item) => ({ product_id: item.id, quantity: item.quantity })),
        paymentMethod,
        shippingAddress: address,
        token,
      });
      clearCart();
      setOrderSuccess(true);
    } catch (error) {
      if (error.status === 401) {
        setCheckoutOpen(false);
        await logout();
        return;
      }
      setCheckoutError(error.message);
    } finally {
      setPlacingOrder(false);
    }
  };

  const closeSuccessAndReset = () => {
    setOrderSuccess(false);
    setCheckoutOpen(false);
    setAddress("");
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Mi carrito</Text>

      {!hasItems ? (
        <EmptyState
          icon="shopping-bag"
          title="Tu carrito está vacío"
          description="Explora nuestros productos y agrega los que más te gusten."
          actionLabel="Explorar productos"
          onAction={() => navigation.navigate("Products")}
        />
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <CartLineItem item={item} onIncrement={increment} onDecrement={decrement} onRemove={removeItem} />
            )}
          />

          <View style={styles.summary}>
            <SummaryRow label="Subtotal" value={subtotal} />
            <SummaryRow
              label={shipping > 0 ? "Envío" : `Envío (gratis desde $${shippingThreshold})`}
              value={shipping}
            />
            <View style={styles.summaryDivider} />
            <SummaryRow label="Total" value={total} emphasize />

            <Pressable
              style={({ pressed }) => [styles.checkoutButton, pressed && styles.checkoutButtonPressed]}
              onPress={() => setCheckoutOpen(true)}
            >
              <Text style={styles.checkoutButtonText}>Proceder al pago</Text>
            </Pressable>
          </View>
        </>
      )}

      <Modal visible={checkoutOpen} animationType="slide" transparent onRequestClose={() => setCheckoutOpen(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {orderSuccess ? (
              <View style={styles.successBox}>
                <View style={styles.successIcon}>
                  <Feather name="check" size={28} color={COLORS.successText} />
                </View>
                <Text style={styles.successTitle}>¡Pedido realizado!</Text>
                <Text style={styles.successDescription}>
                  Tu pedido fue registrado correctamente. Puedes ver su estado en tus pedidos.
                </Text>
                <Pressable style={styles.checkoutButton} onPress={closeSuccessAndReset}>
                  <Text style={styles.checkoutButtonText}>Seguir comprando</Text>
                </Pressable>
              </View>
            ) : (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Finalizar pedido</Text>
                  <Pressable onPress={() => setCheckoutOpen(false)} hitSlop={8}>
                    <Feather name="x" size={20} color={COLORS.inkMuted} />
                  </Pressable>
                </View>

                <Text style={styles.fieldLabel}>Dirección de envío</Text>
                <TextInput
                  style={styles.addressInput}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Calle, número, ciudad..."
                  placeholderTextColor={COLORS.inkMuted}
                  multiline
                />

                <Text style={styles.fieldLabel}>Método de pago</Text>
                <View style={styles.paymentRow}>
                  {PAYMENT_METHODS.map((method) => {
                    const isActive = method.value === paymentMethod;
                    return (
                      <Pressable
                        key={method.value}
                        onPress={() => setPaymentMethod(method.value)}
                        style={[styles.paymentChip, isActive && styles.paymentChipActive]}
                      >
                        <Feather
                          name={method.icon}
                          size={14}
                          color={isActive ? COLORS.ink : COLORS.inkMuted}
                        />
                        <Text style={[styles.paymentChipText, isActive && styles.paymentChipTextActive]}>
                          {method.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                {!!checkoutError && (
                  <View style={styles.errorBox}>
                    <Text style={styles.errorBoxText}>{checkoutError}</Text>
                  </View>
                )}

                <Text style={styles.modalTotalLabel}>Total a pagar: ${total.toFixed(2)}</Text>

                <Pressable
                  style={({ pressed }) => [
                    styles.checkoutButton,
                    placingOrder && styles.checkoutButtonDisabled,
                    pressed && styles.checkoutButtonPressed,
                  ]}
                  onPress={handlePlaceOrder}
                  disabled={placingOrder}
                >
                  {placingOrder ? (
                    <ActivityIndicator size="small" color={COLORS.ink} />
                  ) : (
                    <Text style={styles.checkoutButtonText}>Confirmar pedido</Text>
                  )}
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function CartLineItem({ item, onIncrement, onDecrement, onRemove }) {
  const lineTotal = item.price * item.quantity;
  const atMaxStock = Number.isFinite(item.stock) && item.quantity >= item.stock;

  return (
    <View style={styles.lineItem}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.lineImage} />
      ) : (
        <View style={[styles.lineImage, styles.lineImagePlaceholder]}>
          <Feather name="image" size={18} color={COLORS.inkMuted} />
        </View>
      )}

      <View style={styles.lineInfo}>
        <Text style={styles.lineName} numberOfLines={2}>
          {item.name}
        </Text>
        {!!item.shade && <Text style={styles.lineShade}>{item.shade}</Text>}
        <Text style={styles.linePrice}>${lineTotal.toFixed(2)}</Text>

        <View style={styles.lineActions}>
          <View style={styles.stepper}>
            <Pressable style={styles.stepperButton} onPress={() => onDecrement(item.id)}>
              <Feather name="minus" size={14} color={COLORS.ink} />
            </Pressable>
            <Text style={styles.stepperValue}>{item.quantity}</Text>
            <Pressable
              style={styles.stepperButton}
              onPress={() => onIncrement(item.id)}
              disabled={atMaxStock}
            >
              <Feather name="plus" size={14} color={atMaxStock ? COLORS.cardBorder : COLORS.ink} />
            </Pressable>
          </View>

          <Pressable onPress={() => onRemove(item.id)} hitSlop={8} style={styles.removeButton}>
            <Feather name="trash-2" size={16} color={COLORS.errorText} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function SummaryRow({ label, value, emphasize }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, emphasize && styles.summaryLabelEmphasis]}>{label}</Text>
      <Text style={[styles.summaryValue, emphasize && styles.summaryValueEmphasis]}>
        ${value.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.ink,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 8,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 12,
  },
  lineItem: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 16,
    padding: 10,
    gap: 12,
  },
  lineImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: COLORS.buttonBg,
  },
  lineImagePlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  lineInfo: {
    flex: 1,
  },
  lineName: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.ink,
  },
  lineShade: {
    fontSize: 11,
    color: COLORS.inkMuted,
    marginTop: 2,
    textTransform: "capitalize",
  },
  linePrice: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.accentDark,
    marginTop: 4,
  },
  lineActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.buttonBg,
    borderRadius: 14,
  },
  stepperButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperValue: {
    minWidth: 22,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.ink,
  },
  removeButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  summary: {
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 18,
    gap: 4,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 13,
    color: COLORS.inkMuted,
  },
  summaryValue: {
    fontSize: 13,
    color: COLORS.ink,
    fontWeight: "600",
  },
  summaryLabelEmphasis: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.ink,
  },
  summaryValueEmphasis: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.accentDark,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginVertical: 6,
  },
  checkoutButton: {
    backgroundColor: COLORS.buttonBg,
    borderRadius: 24,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  checkoutButtonPressed: {
    backgroundColor: COLORS.buttonBgPressed,
  },
  checkoutButtonDisabled: {
    opacity: 0.6,
  },
  checkoutButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.ink,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.ink,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.inkMuted,
    marginBottom: 6,
    marginTop: 10,
  },
  addressInput: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 64,
    textAlignVertical: "top",
    color: COLORS.ink,
    fontSize: 14,
  },
  paymentRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  paymentChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  paymentChipActive: {
    backgroundColor: COLORS.buttonBg,
    borderColor: COLORS.accent,
  },
  paymentChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.inkMuted,
  },
  paymentChipTextActive: {
    color: COLORS.ink,
  },
  errorBox: {
    backgroundColor: COLORS.errorBg,
    borderColor: COLORS.errorBorder,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
  },
  errorBoxText: {
    color: COLORS.errorText,
    fontSize: 13,
  },
  modalTotalLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.ink,
    marginTop: 16,
    textAlign: "center",
  },
  successBox: {
    alignItems: "center",
    paddingVertical: 12,
  },
  successIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.successBg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  successTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.ink,
    marginBottom: 6,
  },
  successDescription: {
    fontSize: 13,
    color: COLORS.inkMuted,
    textAlign: "center",
    marginBottom: 18,
    lineHeight: 18,
  },
});
