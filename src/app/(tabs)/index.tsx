import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { foods } from "../../data/foods";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { cart } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");

  const handleClaim = (code: string) => {
    Alert.alert("Promo Applied", `Promo code ${code} has been applied.`);
  };

  const categories = [
    { id: "all", name: "All", icon: "🍛" },
    { id: "thakali", name: "Thakali", icon: "🍲" },
    { id: "dal-bhat", name: "Dal Bhat", icon: "🍛" },
    { id: "snacks", name: "Snacks", icon: "🥟" },
  ];

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filter foods by category
  const filteredFoods =
    activeCategory === "All"
      ? foods
      : foods.filter(
          (food) =>
            food.category === activeCategory.toLowerCase().replace(" ", "-"),
        );

  return (
    <View style={styles.outerContainer}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning 👋</Text>
          <Text style={styles.userName}>{user?.name || "Signor Pandeya"}</Text>
          <Text style={styles.location}>
            📍 {user?.address || "Set delivery address"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => router.push("/cart")}
        >
          <Text style={styles.cartIcon}>🛒</Text>
          {totalCartItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalCartItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* SUBTITLE */}
        <Text style={styles.subtitle}>Taste of Home, Wherever You Are</Text>

        {/* SEARCH BAR (Tapping navigates to Discover tab) */}
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => router.push("/explore")}
          activeOpacity={0.9}
        >
          <Text style={styles.searchPlaceholder}>
            🔍 Search for homemade food...
          </Text>
        </TouchableOpacity>

        {/* PROMO BANNER CAROUSEL MOCK */}
        <ScrollView
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.promoContainer}
          contentContainerStyle={styles.promoScroll}
        >
          <TouchableOpacity
            style={[styles.promoCard, { backgroundColor: "#FFF0E5" }]}
            activeOpacity={0.85}
            onPress={() => handleClaim("FIRST002")}
          >
            <View style={styles.promoTextSection}>
              <Text style={styles.promoTitle}>20% OFF on{"\n"}First Order</Text>
              <Text style={styles.promoCode}>Use code FIRST002</Text>
              <Text style={styles.claimButtonText}>Claim Now</Text>
            </View>
            <Text style={styles.promoEmoji}>🍛</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.promoCard, { backgroundColor: "#E6F4EA" }]}
            activeOpacity={0.85}
            onPress={() => handleClaim("DELIVERY500")}
          >
            <View style={styles.promoTextSection}>
              <Text style={[styles.promoTitle, { color: "#137333" }]}>
                Free delivery{"\n"}Today
              </Text>
              <Text style={[styles.promoCode, { color: "#137333" }]}>
                On orders above Rs 500
              </Text>
              <Text style={[styles.claimButtonText, { color: "#137333" }]}>
                Claim Now
              </Text>
            </View>
            <Text style={styles.promoEmoji}>🚴</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* CATEGORIES */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
          snapToAlignment="start"
          decelerationRate="fast"
          bounces={false}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                activeCategory === category.name && styles.categoryChipActive,
              ]}
              onPress={() => setActiveCategory(category.name)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text
                style={[
                  styles.categoryName,
                  activeCategory === category.name && styles.categoryNameActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* DISHES LIST */}
        <Text style={styles.sectionTitle}>Dishes List</Text>
        <View style={styles.dishesList}>
          {filteredFoods.map((food) => (
            <TouchableOpacity
              key={food.id}
              style={styles.foodCard}
              onPress={() =>
                router.push({
                  pathname: "/food/[id]",
                  params: { id: food.id },
                })
              }
            >
              <Image source={food.image} style={styles.foodImage} />

              <View style={styles.foodInfo}>
                <View style={styles.foodHeader}>
                  <Text style={styles.foodName}>{food.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.starIcon}>⭐</Text>
                    <Text style={styles.ratingText}>4.8</Text>
                  </View>
                </View>

                <Text style={styles.foodCook}>By Local Home Cook</Text>

                <View style={styles.foodFooter}>
                  <Text style={styles.foodPrice}>Rs. {food.price}</Text>
                  <View style={styles.addButton}>
                    <Text style={styles.addButtonText}>View Details</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* EXTRA HEIGHT AT BOTTOM */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#FFF9F5",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
  greeting: {
    fontSize: 13,
    color: "#6B6B6B",
    fontWeight: "500",
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  location: {
    fontSize: 12,
    color: "#CE8964",
    marginTop: 2,
    fontWeight: "600",
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F5E6DB",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cartIcon: {
    fontSize: 20,
  },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#CE8964",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B6B6B",
    fontWeight: "500",
    marginTop: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  searchContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F5E6DB",
    shadowColor: "#CE8964",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 20,
  },
  searchPlaceholder: {
    color: "#6B6B6B",
    fontSize: 14,
  },
  promoContainer: {
    marginBottom: 20,
  },
  promoScroll: {
    paddingHorizontal: 16,
  },
  promoCard: {
    width: width * 0.75,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  promoTextSection: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#CE8964",
  },
  promoCode: {
    fontSize: 11,
    color: "#6B6B6B",
    marginVertical: 4,
    fontWeight: "500",
  },
  claimButton: {
    backgroundColor: "#CE8964",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  claimButtonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  promoEmoji: {
    fontSize: 48,
    opacity: 0.9,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E2E2E",
    marginBottom: 12,
    marginTop: 10,
  },
  categoriesContainer: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    paddingRight: 24,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 12,
    minWidth: 100,
    borderWidth: 1,
    borderColor: "#F5E6DB",
    shadowColor: "#CE8964",
    shadowOpacity: 0.03,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  categoryChipActive: {
    backgroundColor: "#CE8964",
    borderColor: "#CE8964",
  },
  categoryIcon: {
    marginRight: 6,
    fontSize: 16,
  },
  categoryName: {
    fontSize: 13,
    color: "#2E2E2E",
    fontWeight: "600",
  },
  categoryNameActive: {
    color: "#FFFFFF",
  },
  dishesList: {
    marginBottom: 20,
  },
  foodCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F5E6DB",
    shadowColor: "#CE8964",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  foodImage: {
    width: "100%",
    height: 160,
  },
  foodInfo: {
    padding: 16,
  },
  foodHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9F5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F5E6DB",
  },
  starIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  foodCook: {
    fontSize: 12,
    color: "#6B6B6B",
    marginTop: 4,
  },
  foodFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#CE8964",
  },
  addButton: {
    borderColor: "#CE8964",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#FFF9F5",
  },
  addButtonText: {
    color: "#CE8964",
    fontSize: 12,
    fontWeight: "700",
  },
});
