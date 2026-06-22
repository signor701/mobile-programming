import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function EditAddressScreen() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (user) {
      setAddress(user.address || "");
    }
  }, [user]);

  const handleSave = () => {
    if (!user) return;
    updateProfile(user.name, user.email, user.phone, address);
    router.back();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Edit Address</Text>
      <Text style={styles.inputLabel}>Delivery Address</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter your delivery address"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Address</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.back()}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          Cancel
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  body: {
    fontSize: 14,
    color: "#6B6B6B",
    textAlign: "center",
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 13,
    color: "#6B6B6B",
    marginTop: 18,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F5E6DB",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: "#2E2E2E",
  },
  button: {
    backgroundColor: "#CE8964",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 28,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CE8964",
    marginTop: 14,
  },
  secondaryButtonText: {
    color: "#CE8964",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
