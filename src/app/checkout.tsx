import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function CheckoutScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Text style={styles.emoji}>🎉</Text>

        <Text style={styles.title}>Order Placed Successfully!</Text>

        <Text style={styles.subtitle}>
          Your delicious food is being prepared 🍛
        </Text>

        <Text style={styles.note}>
          You will receive your order soon. Thank you for using Gharko Khana ❤️
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/track-order")}
        >
          <Text style={styles.primaryButtonText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/" as any)}
        >
          <Text style={styles.secondaryButtonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F5",
  },
  contentContainer: {
    padding: 24,
    justifyContent: "center",
    minHeight: "100%",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#F5E6DB",
    padding: 32,
    alignItems: "center",
    shadowColor: "#CE8964",
    shadowOpacity: 0.05,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
  },
  emoji: {
    fontSize: 70,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
    color: "#2E2E2E",
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 12,
    color: "#CE8964",
    fontWeight: "600",
  },
  note: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: 32,
    color: "#6B6B6B",
    lineHeight: 18,
  },
  primaryButton: {
    backgroundColor: "#CE8964",
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#CE8964",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: "#CE8964",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#CE8964",
    fontWeight: "700",
    fontSize: 15,
  },
});