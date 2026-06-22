import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { foods } from "../../data/foods";

export default function DiscoverScreen() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { incrementFavoritesCount, decrementFavoritesCount } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggleFavorite = async (foodId: string) => {
    if (isFavorite(foodId)) {
      await decrementFavoritesCount();
    } else {
      await incrementFavoritesCount();
    }
    toggleFavorite(foodId);
  };

  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Discover Food</Text>
        <Text style={styles.subtitle}>
          Find healthy and affordable homemade meals
        </Text>
      </View>

      {/* SEARCH INPUT */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search dishes, cooks..."
            placeholderTextColor="#6B6B6B"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Text style={styles.clearIcon}>❌</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* DISHES LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>Dishes List</Text>

        {filteredFoods.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🍽️</Text>
            <Text style={styles.emptyText}>
              No homemade dishes match "{searchQuery}"
            </Text>
          </View>
        ) : (
          filteredFoods.map((food) => (
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

                  <TouchableOpacity
                    style={styles.favButton}
                    onPress={() => handleToggleFavorite(food.id)}
                  >
                    <Text
                      style={[
                        styles.favIcon,
                        isFavorite(food.id) && styles.favIconActive,
                      ]}
                    >
                      {isFavorite(food.id) ? "❤️" : "🤍"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.foodCook}>By Local Home Cook</Text>
                <Text style={styles.foodDesc} numberOfLines={2}>
                  {food.description}
                </Text>

                <View style={styles.foodFooter}>
                  <Text style={styles.foodPrice}>Rs. {food.price}</Text>

                  <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => {
                      addToCart({
                        id: food.id,
                        name: food.name,
                        price: food.price,
                      });
                    }}
                  >
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
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
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F5E6DB",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B6B6B",
    marginTop: 4,
  },
  searchWrapper: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F5E6DB",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9F5",
    borderWidth: 1,
    borderColor: "#F5E6DB",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#2E2E2E",
    fontWeight: "500",
  },
  clearIcon: {
    fontSize: 14,
    color: "#6B6B6B",
    marginLeft: 8,
  },
  scrollContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E2E2E",
    marginBottom: 16,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.6,
  },
  emptyText: {
    fontSize: 14,
    color: "#6B6B6B",
    fontWeight: "500",
    textAlign: "center",
  },
  foodCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F5E6DB",
    shadowColor: "#CE8964",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  foodImage: {
    width: "100%",
    height: 150,
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
    flex: 1,
  },
  favButton: {
    padding: 4,
  },
  favIcon: {
    fontSize: 20,
  },
  favIconActive: {
    transform: [{ scale: 1.1 }],
  },
  foodCook: {
    fontSize: 11,
    color: "#CE8964",
    fontWeight: "600",
    marginTop: 2,
  },
  foodDesc: {
    fontSize: 13,
    color: "#6B6B6B",
    marginVertical: 8,
    lineHeight: 18,
  },
  foodFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E2E2E",
  },
  addToCartButton: {
    backgroundColor: "#CE8964",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addToCartText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
});
