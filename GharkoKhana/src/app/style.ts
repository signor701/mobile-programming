import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0" },

  header: {
    alignItems: "center",
    paddingVertical: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#E67E22",
  },

  subtitle: {
    marginTop: 5,
    color: "#666",
    fontSize: 14,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginVertical: 10,
  },

  cookCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },

  cookImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },

  cookName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  rating: {
    color: "#555",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
  },

  foodImage: {
    width: "100%",
    height: 200,
  },

  cardContent: {
    padding: 15,
  },

  foodName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  price: {
    color: "green",
    fontWeight: "bold",
    marginTop: 5,
  },

  button: {
    backgroundColor: "#E67E22",
    marginHorizontal: 15,
    marginBottom: 30,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  // ⭐ NEW: Search Bar Styling
  searchInput: {
    marginHorizontal: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
});

export default styles;
