import { useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function OrdersScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { cart } = useCart();
  const orderCount = user?.ordersCount ?? 0;
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <Text style={styles.subtitle}>
          {orderCount} order{orderCount === 1 ? "" : "s"} placed
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {orderCount === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🛒</Text>
            <Text style={styles.emptyText}>No orders yet</Text>
            <Text style={styles.emptySubtext}>
              Place an order from the home screen. Your order history will show
              up here.
            </Text>
            <View style={styles.ctaRow}>
              <TouchableOpacity
                style={styles.ctaButton}
                onPress={() => router.push("/cart")}
              >
                <Text style={styles.ctaButtonText}>
                  Go to My Cart ({cartItemsCount})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.ctaButton, styles.ctaButtonSecondary]}
                onPress={() => router.push("/")}
              >
                <Text
                  style={[styles.ctaButtonText, styles.ctaButtonTextSecondary]}
                >
                  Browse Food
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.orderCard}>
            <Text style={styles.orderMessage}>
              You have placed {orderCount} order{orderCount === 1 ? "" : "s"}.
            </Text>
            <Text style={styles.orderStatus}>
              Orders are tracked and updated after checkout.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F5",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F5E6DB",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  subtitle: {
    fontSize: 12,
    color: "#6B6B6B",
    marginTop: 2,
  },
  scrollContent: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F5E6DB",
    padding: 16,
    marginBottom: 16,
    shadowColor: "#CE8964",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  statusTag: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
  },
  statusDelivered: {
    backgroundColor: "#E6F4EA",
    borderColor: "#137333",
  },
  statusActive: {
    backgroundColor: "#FFF0E5",
    borderColor: "#CE8964",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "800",
  },
  statusTextDelivered: {
    color: "#137333",
  },
  statusTextActive: {
    color: "#CE8964",
  },
  timeSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  clockIcon: {
    fontSize: 14,
    marginRight: 6,
    opacity: 0.7,
  },
  dateText: {
    fontSize: 12,
    color: "#6B6B6B",
    fontWeight: "500",
  },
  itemsSection: {
    backgroundColor: "#FFF9F5",
    borderRadius: 8,
    padding: 10,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#F5E6DB",
  },
  itemsText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2E2E2E",
  },
  footerSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#FFF9F5",
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: 13,
    color: "#6B6B6B",
    fontWeight: "500",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#CE8964",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 120,
  },
  emptyEmoji: {
    fontSize: 52,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E2E2E",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#6B6B6B",
    textAlign: "center",
    maxWidth: 260,
    lineHeight: 20,
  },
  ctaRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    flexWrap: "wrap",
    gap: 10,
  },
  ctaButton: {
    backgroundColor: "#CE8964",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginHorizontal: 6,
    marginTop: 10,
  },
  ctaButtonSecondary: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CE8964",
  },
  ctaButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  ctaButtonTextSecondary: {
    color: "#CE8964",
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F5E6DB",
    padding: 24,
    marginTop: 32,
    shadowColor: "#CE8964",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  orderMessage: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E2E2E",
    marginBottom: 12,
    textAlign: "center",
  },
  orderStatus: {
    fontSize: 14,
    color: "#6B6B6B",
    textAlign: "center",
    lineHeight: 20,
  },
});
