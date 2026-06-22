import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function CartScreen() {
  const { cart, increaseQty, decreaseQty, removeItem } = useCart();
  const { incrementOrdersCount } = useAuth();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handlePlaceOrder = async () => {
    await incrementOrdersCount();
    router.push("/checkout");
  };

  const subTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryFee = subTotal > 0 ? 40 : 0;
  const total = subTotal + deliveryFee;

  const paymentMethods = [
    { id: "cod", name: "Cash on Delivery", icon: "💵" },
    { id: "esewa", name: "eSewa", icon: "🟢" },
    { id: "khalti", name: "Khalti", icon: "🟣" },
    { id: "fonepay", name: "Fonepay", icon: "🔴" },
  ];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.push("/" as any)}
        >
          <Text style={styles.backBtnText}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={{ width: 40 }} />
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyText}>Your cart is empty 😢</Text>
          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => router.push("/" as any)}
          >
            <Text style={styles.browseBtnText}>Browse Homemade Food</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollContent}
          >
            {/* ITEMS LIST */}
            <Text style={styles.sectionTitle}>Selected Items</Text>
            {cart.map((item) => (
              <View key={item.id} style={styles.cartCard}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>Rs. {item.price}</Text>
                </View>

                {/* QUANTITY CONTROLS */}
                <View style={styles.controlsRow}>
                  <View style={styles.qtyContainer}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => decreaseQty(item.id)}
                    >
                      <Text style={styles.qtyBtnText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.qtyText}>{item.quantity}</Text>

                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => increaseQty(item.id)}
                    >
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeItem(item.id)}
                  >
                    <Text style={styles.removeBtnText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* PAYMENT METHODS */}
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <View style={styles.paymentContainer}>
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentOption,
                    paymentMethod === method.id && styles.paymentOptionActive,
                  ]}
                  onPress={() => setPaymentMethod(method.id)}
                >
                  <View style={styles.paymentLeft}>
                    <Text style={styles.paymentIcon}>{method.icon}</Text>
                    <Text style={styles.paymentName}>{method.name}</Text>
                  </View>
                  <View style={styles.radioOutline}>
                    {paymentMethod === method.id && (
                      <View style={styles.radioDot} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* BILL DETAILS */}
            <Text style={styles.sectionTitle}>Bill Summary</Text>
            <View style={styles.billCard}>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Sub Total</Text>
                <Text style={styles.billValue}>Rs. {subTotal}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Delivery Fee</Text>
                <Text style={styles.billValue}>Rs. {deliveryFee}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.billRow}>
                <Text style={[styles.billLabel, styles.totalLabel]}>
                  Total Amount
                </Text>
                <Text style={[styles.billValue, styles.totalValue]}>
                  Rs. {total}
                </Text>
              </View>
            </View>
            <View style={{ height: 40 }} />
          </ScrollView>

          {/* CHECKOUT BUTTON */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={handlePlaceOrder}
            >
              <Text style={styles.checkoutText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F5E6DB",
  },
  backBtn: {
    padding: 8,
  },
  backBtnText: {
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  scrollContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 15,
    color: "#6B6B6B",
    fontWeight: "600",
    marginBottom: 24,
  },
  browseBtn: {
    backgroundColor: "#CE8964",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  browseBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2E2E2E",
    marginBottom: 12,
    marginTop: 10,
  },
  cartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F5E6DB",
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#CE8964",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  itemPrice: {
    fontSize: 13,
    color: "#CE8964",
    fontWeight: "600",
    marginTop: 4,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9F5",
    borderWidth: 1,
    borderColor: "#F5E6DB",
    borderRadius: 10,
    padding: 4,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F5E6DB",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyBtnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2E2E2E",
  },
  qtyText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2E2E2E",
    marginHorizontal: 12,
  },
  removeBtn: {
    marginLeft: 12,
    padding: 8,
  },
  removeBtnText: {
    fontSize: 16,
  },
  paymentContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F5E6DB",
    overflow: "hidden",
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#FFF9F5",
  },
  paymentOptionActive: {
    backgroundColor: "#FFFDFB",
  },
  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  paymentName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2E2E2E",
  },
  radioOutline: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CE8964",
    justifyContent: "center",
    alignItems: "center",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#CE8964",
  },
  billCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F5E6DB",
    padding: 16,
    marginBottom: 20,
    shadowColor: "#CE8964",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  billLabel: {
    fontSize: 13,
    color: "#6B6B6B",
    fontWeight: "500",
  },
  billValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  divider: {
    height: 1,
    backgroundColor: "#FFF9F5",
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: "#2E2E2E",
    fontWeight: "700",
  },
  totalValue: {
    fontSize: 16,
    color: "#CE8964",
    fontWeight: "800",
  },
  footer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F5E6DB",
  },
  checkoutBtn: {
    backgroundColor: "#CE8964",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#CE8964",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  checkoutText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
