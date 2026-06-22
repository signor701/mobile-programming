import { useRouter } from "expo-router";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";

export default function FavoritesScreen() {
  const router = useRouter();
  const { addToCart, cart } = useCart();
  const { favoriteFoods, removeFavorite } = useFavorites();
  const { decrementFavoritesCount } = useAuth();

  const displayedFavorites = favoriteFoods;

  const handleRemoveFavorite = async (foodId: string) => {
    await decrementFavoritesCount();
    removeFavorite(foodId);
  };

  const handleAddToCart = (item: {
    id: string;
    name: string;
    price: number;
  }) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
    });
  };

  const totalCartItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
      </View>

      {/* FAVORITES LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {displayedFavorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>❤️</Text>
            <Text style={styles.emptyText}>
              No favorites yet. Add some from the Discover tab!
            </Text>
          </View>
        ) : (
          displayedFavorites.map((item) => (
            <View key={item.id} style={styles.favCard}>
              <Image source={item.image} style={styles.favImage} />

              <View style={styles.favInfo}>
                <View style={styles.favHeader}>
                  <Text style={styles.favName}>{item.name}</Text>

                  <TouchableOpacity
                    onPress={() => handleRemoveFavorite(item.id)}
                  >
                    <Text style={styles.heartIcon}>❤️</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.favCook}>By Local Home Cook</Text>
                <Text style={styles.favPrice}>Rs. {item.price}</Text>

                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddToCart(item)}
                >
                  <Text style={styles.addButtonText}>Add to cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* FLOAT CART LINK */}
      <TouchableOpacity
        style={styles.floatingCart}
        onPress={() => router.push("/cart")}
      >
        <Text style={styles.floatingCartText}>My Cart 🛒</Text>
        {totalCartItems > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{totalCartItems}</Text>
          </View>
        )}
      </TouchableOpacity>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 90, // room for floating cart
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 14,
    color: "#6B6B6B",
    fontWeight: "600",
    textAlign: "center",
  },
  favCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F5E6DB",
    padding: 12,
    shadowColor: "#CE8964",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  favImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  favInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  favHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  favName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  heartIcon: {
    fontSize: 18,
  },
  favCook: {
    fontSize: 11,
    color: "#6B6B6B",
  },
  favPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#CE8964",
  },
  addButton: {
    backgroundColor: "#FFF9F5",
    borderWidth: 1,
    borderColor: "#CE8964",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  addButtonText: {
    color: "#CE8964",
    fontSize: 11,
    fontWeight: "700",
  },
  floatingCart: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#CE8964",
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#CE8964",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  floatingCartText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#CE8964",
    marginRight: 8,
  },
  cartBadge: {
    backgroundColor: "#CE8964",
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "bold",
  },
});
