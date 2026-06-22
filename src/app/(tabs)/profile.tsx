import { useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    logout();
    router.replace("/login");
  };

  const menuItems = [
    { title: "Edit Profile", icon: "✏️", route: "/edit-profile" },
    { title: "Edit Address", icon: "📍", route: "/edit-address" },
    { title: "Notifications", icon: "🔔", route: "/notifications" },
    { title: "Help & Support", icon: "🤝", route: "/help-support" },
    { title: "App Settings", icon: "⚙️", route: "/settings" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      {/* USER CARD */}
      <View style={styles.profileCard}>
        <Text style={styles.userName}>{user?.name || "Guest"}</Text>
        <Text style={styles.userEmail}>
          {user?.email || "No email provided"}
        </Text>
        <Text style={styles.userPhone}>{user?.phone || "Phone not set"}</Text>
        <Text style={styles.userAddress}>
          {user?.address || "Delivery address not set"}
        </Text>
      </View>

      {/* STATS */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user?.ordersCount ?? 2}</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user?.favoritesCount ?? 3}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
      </View>

      {/* MENU */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.menuItem}
            onPress={() => router.push(item.route)}
          >
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemIcon}>{item.icon}</Text>
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <Text style={styles.menuItemArrow}>➡️</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SIGN OUT */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    margin: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F5E6DB",
    shadowColor: "#CE8964",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  userEmail: {
    fontSize: 14,
    color: "#6B6B6B",
    marginTop: 4,
  },
  userPhone: {
    fontSize: 13,
    color: "#CE8964",
    fontWeight: "600",
    marginTop: 4,
  },
  userAddress: {
    fontSize: 12,
    color: "#6B6B6B",
    marginTop: 6,
    textAlign: "center",
    lineHeight: 18,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#F5E6DB",
    shadowColor: "#CE8964",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#CE8964",
  },
  statLabel: {
    fontSize: 12,
    color: "#6B6B6B",
    marginTop: 4,
    fontWeight: "500",
  },
  divider: {
    width: 1,
    backgroundColor: "#F5E6DB",
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#F5E6DB",
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#FFF9F5",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2E2E2E",
  },
  menuItemArrow: {
    fontSize: 12,
    opacity: 0.6,
  },
  signOutButton: {
    marginHorizontal: 16,
    backgroundColor: "#CE8964",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#CE8964",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  signOutText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
