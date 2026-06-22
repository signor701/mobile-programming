import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function TrackOrderScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  const currentOrderId = orderId || "ORD-001";

  const handleCall = () => {
    Linking.openURL("tel:9841234567");
  };

  const steps = [
    {
      title: "Order Confirmed",
      subtitle: "We have received your order",
      status: "completed",
    },
    {
      title: "Preparing Food",
      subtitle: "Sharmila Rijal is cooking your food",
      status: "completed",
    },
    {
      title: "Packed",
      subtitle: "Food is packed and ready to pick up",
      status: "completed",
    },
    {
      title: "Out for delivery",
      subtitle: "Ram Bahadur is on his way to your home",
      status: "active",
    },
    {
      title: "Delivered",
      subtitle: "Enjoy your fresh homemade meal!",
      status: "pending",
    },
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
        <Text style={styles.headerTitle}>Track Order</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* SUMMARY CARD */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.orderLabel}>Order #{currentOrderId}</Text>
              <Text style={styles.etaLabel}>Estimated Time</Text>
              <Text style={styles.etaValue}>25 Minutes</Text>
            </View>
            <View style={styles.deliverToContainer}>
              <Text style={styles.deliverToLabel}>Deliver To:</Text>
              <Text style={styles.deliverToName}>
                {user?.name || "Signor Pandeya"}
              </Text>
              <Text style={styles.deliverToAddr}>
                {user?.address || "Delivery address not set"}
              </Text>
            </View>
          </View>
        </View>

        {/* COOK & PARTNER CARD */}
        <View style={styles.infoCard}>
          <Text style={styles.cardSectionTitle}>Chef Details</Text>
          <View style={styles.chefRow}>
            <Text style={styles.avatarMini}>👩‍🍳</Text>
            <View style={styles.chefDetails}>
              <Text style={styles.chefName}>Sharmila Rijal</Text>
              <View style={styles.ratingRow}>
                <Text style={styles.starIcon}>⭐</Text>
                <Text style={styles.ratingText}>4.9 (Local Cook)</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.cardSectionTitle}>Delivery Partner</Text>
          <View style={styles.deliveryRow}>
            <Text style={styles.avatarMini}>🚴</Text>
            <View style={styles.deliveryDetails}>
              <Text style={styles.partnerName}>Ram Bahadur</Text>
              <Text style={styles.partnerService}>Bike Delivery</Text>
            </View>
            <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
              <Text style={styles.callIcon}>📞</Text>
              <Text style={styles.callBtnText}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* TIMELINE */}
        <Text style={styles.sectionTitle}>Order Progress</Text>
        <View style={styles.timelineCard}>
          {steps.map((step, idx) => (
            <View key={idx} style={styles.timelineItem}>
              {/* LINE */}
              {idx < steps.length - 1 && (
                <View
                  style={[
                    styles.timelineLine,
                    step.status === "completed" &&
                    steps[idx + 1].status !== "pending"
                      ? styles.timelineLineCompleted
                      : styles.timelineLinePending,
                  ]}
                />
              )}

              {/* NODE */}
              <View style={styles.nodeContainer}>
                {step.status === "completed" ? (
                  <View style={styles.nodeCompleted}>
                    <Text style={styles.nodeCheckIcon}>✓</Text>
                  </View>
                ) : step.status === "active" ? (
                  <View style={styles.nodeActive}>
                    <View style={styles.nodeActiveInner} />
                  </View>
                ) : (
                  <View style={styles.nodePending} />
                )}
              </View>

              {/* DETAILS */}
              <View style={styles.stepInfo}>
                <Text
                  style={[
                    styles.stepTitle,
                    step.status === "completed" && styles.stepCompletedText,
                    step.status === "active" && styles.stepActiveText,
                  ]}
                >
                  {step.title}
                </Text>
                <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* GO TO HOME SHORTCUT */}
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => router.push("/" as any)}
        >
          <Text style={styles.homeBtnText}>Back to Home</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
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
  summaryCard: {
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
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2E2E2E",
    marginBottom: 10,
  },
  etaLabel: {
    fontSize: 11,
    color: "#6B6B6B",
    fontWeight: "600",
  },
  etaValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#CE8964",
    marginTop: 2,
  },
  deliverToContainer: {
    alignItems: "flex-end",
    maxWidth: "55%",
  },
  deliverToLabel: {
    fontSize: 11,
    color: "#6B6B6B",
    fontWeight: "600",
  },
  deliverToName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2E2E2E",
    marginTop: 4,
  },
  deliverToAddr: {
    fontSize: 12,
    color: "#6B6B6B",
    textAlign: "right",
    marginTop: 2,
  },
  infoCard: {
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
  cardSectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#CE8964",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  chefRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarMini: {
    fontSize: 32,
    marginRight: 12,
  },
  chefDetails: {
    flex: 1,
  },
  chefName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  starIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    color: "#6B6B6B",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#FFF9F5",
    marginVertical: 14,
  },
  deliveryRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  deliveryDetails: {
    flex: 1,
  },
  partnerName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  partnerService: {
    fontSize: 12,
    color: "#6B6B6B",
    marginTop: 2,
  },
  callBtn: {
    backgroundColor: "#FFF9F5",
    borderWidth: 1.5,
    borderColor: "#CE8964",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  callIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  callBtnText: {
    color: "#CE8964",
    fontSize: 12,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E2E2E",
    marginBottom: 12,
  },
  timelineCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F5E6DB",
    padding: 20,
    marginBottom: 24,
    shadowColor: "#CE8964",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 20,
    position: "relative",
  },
  timelineLine: {
    position: "absolute",
    left: 11,
    top: 24,
    bottom: -24,
    width: 2,
    zIndex: 1,
  },
  timelineLineCompleted: {
    backgroundColor: "#4CAF50",
  },
  timelineLinePending: {
    backgroundColor: "#F5E6DB",
  },
  nodeContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    marginRight: 16,
  },
  nodeCompleted: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  nodeCheckIcon: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  nodeActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#CE8964",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  nodeActiveInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#CE8964",
  },
  nodePending: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#F5E6DB",
    backgroundColor: "#FFFFFF",
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B6B6B",
  },
  stepCompletedText: {
    color: "#4CAF50",
    fontWeight: "700",
  },
  stepActiveText: {
    color: "#CE8964",
    fontWeight: "700",
  },
  stepSubtitle: {
    fontSize: 12,
    color: "#6B6B6B",
    marginTop: 2,
  },
  homeBtn: {
    backgroundColor: "#CE8964",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#CE8964",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  homeBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
