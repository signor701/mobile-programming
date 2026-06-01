import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";

const foods = [
  {
    id: "1",
    name: "Dal Bhat",
    price: "Rs. 200",
    rating: "4.8",
    description: "Traditional Nepali meal with rice, dal, and curry.",
    image: require("../assets/images/dal_bhat.jpg"),
  },
  {
    id: "2",
    name: "Homemade Pakauda",
    price: "Rs. 120",
    rating: "4.5",
    description: "Crispy and tasty homemade fried snack.",
    image: require("../assets/images/pakauda.jpg"),
  },
  {
    id: "3",
    name: "Homemade Selroti",
    price: "Rs. 30 per pc",
    rating: "4.7",
    description: "Traditional Nepali sweet ring bread.",
    image: require("../assets/images/selroti.jpg"),
  },
  {
    id: "4",
    name: "Chiya",
    price: "Rs. 25",
    rating: "4.6",
    description: "Hot Nepali milk tea served fresh.",
    image: require("../assets/images/chiya.jpg"),
  },
];

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  const filteredFoods = foods.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}

        <View style={styles.header}>
          <Text style={styles.title}>🏠 Gharko Khana</Text>
          <Text style={styles.subtitle}>Fresh Homemade Meals Near You</Text>
        </View>

        {/* Search Bar */}
        <TextInput
          placeholder="Search your favorite food..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

        {/* Popular Cook Section */}
        <Text style={styles.sectionTitle}>Popular Home Cook</Text>

        <View style={styles.cookCard}>
          <Image
            source={require("../assets/images/cook.jpg")}
            style={styles.cookImage}
          />

          <View>
            <Text style={styles.cookName}>Signor Kitchen</Text>
            <Text style={styles.rating}>⭐ 4.9 Rating</Text>
          </View>
        </View>

        {/* Food List Section */}
        <Text style={styles.sectionTitle}>Featured Meals</Text>

        <FlatList
          data={filteredFoods}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.foodImage} />
              <View style={styles.cardContent}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={{ color: "#555" }}>{item.description}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={{ color: "#888" }}>⭐ {item.rating}</Text>
              </View>
            </View>
          )}
        />

        {/* Button */}
        <Pressable
          onPress={() =>
            Alert.alert("Gharko Khana", "More delicious meals coming soon!")
          }
          style={({ pressed }) => [
            styles.button,
            {
              opacity: pressed ? 0.7 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            },
          ]}
        >
          <Text style={styles.buttonText}>Explore More Meals</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
