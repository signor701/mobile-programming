import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCart } from "../../context/CartContext";
import { foods } from "../../data/foods";

type Food = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: any;
  category?: string;
};

export default function FoodDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart } = useCart();

  const food = foods.find((item: any) => item.id === id) as Food | undefined;

  if (!food) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Food item not found ❌</Text>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.push("/" as any)}
        >
          <Text style={styles.backBtnText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: food.id,
      name: food.name,
      price: food.price,
    });
    // Visual indicator - prompt router redirect or navigate back, or go directly to cart
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      {/* HEADER OVERLAY */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.circleBackBtn}
          onPress={() => router.push("/" as any)}
        >
          <Text style={styles.arrowIcon}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meal Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContent}
      >
        {/* LARGE FOOD IMAGE */}
        <Image source={food.image} style={styles.foodImage} />

        <View style={styles.infoCard}>
          {/* TITLE & RATING */}
          <View style={styles.titleRow}>
            <Text style={styles.foodName}>{food.name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.starIcon}>⭐</Text>
              <Text style={styles.ratingValue}>4.8</Text>
            </View>
          </View>

          {/* PRICE & COOK */}
          <Text style={styles.foodPrice}>Rs. {food.price}</Text>

          <View style={styles.cookCard}>
            <Text style={styles.cookAvatar}>👩‍🍳</Text>
            <View style={styles.cookDetails}>
              <Text style={styles.cookName}>Laxmi Pangeni</Text>
              <Text style={styles.cookSubtitle}>
                Professional Home Cook • Anamnagar
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* DESCRIPTION */}
          <Text style={styles.sectionTitle}>About this dish</Text>
          <Text style={styles.foodDesc}>{food.description}</Text>

          <View style={styles.divider} />

          {/* EXTRA INFO */}
          <Text style={styles.sectionTitle}>Dietary & Health Info</Text>
          <View style={styles.dietTags}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Healthy</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Homemade</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Fresh Ingredients</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ADD TO CART ACTION */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.primaryButtonText}>Add to Cart 🛒</Text>
        </TouchableOpacity>
      </View>
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
    zIndex: 10,
  },
  circleBackBtn: {
    padding: 8,
  },
  arrowIcon: {
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  scrollContent: {
    flex: 1,
  },
  foodImage: {
    width: "100%",
    height: 250,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#F5E6DB",
    borderBottomWidth: 0,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2E2E2E",
    flex: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9F5",
    borderWidth: 1,
    borderColor: "#F5E6DB",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  starIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  foodPrice: {
    fontSize: 20,
    fontWeight: "800",
    color: "#CE8964",
    marginTop: 8,
  },
  cookCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9F5",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F5E6DB",
    padding: 12,
    marginTop: 16,
  },
  cookAvatar: {
    fontSize: 28,
    marginRight: 12,
  },
  cookDetails: {
    flex: 1,
  },
  cookName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  cookSubtitle: {
    fontSize: 11,
    color: "#6B6B6B",
    marginTop: 2,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#FFF9F5",
    marginVertical: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2E2E2E",
    marginBottom: 8,
  },
  foodDesc: {
    fontSize: 14,
    color: "#6B6B6B",
    lineHeight: 22,
    fontWeight: "500",
  },
  dietTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  tag: {
    backgroundColor: "#FFF0E5",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: "#F5E6DB",
  },
  tagText: {
    fontSize: 11,
    color: "#CE8964",
    fontWeight: "700",
  },
  footer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F5E6DB",
  },
  primaryButton: {
    backgroundColor: "#CE8964",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#CE8964",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF9F5",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E2E2E",
    marginBottom: 20,
  },
  backBtn: {
    backgroundColor: "#CE8964",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  backBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
