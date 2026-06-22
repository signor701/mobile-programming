import { get, push, ref, set, update } from "firebase/database";
import { rtdb } from "./firebaseConfig";

const sanitizeKey = (key) => String(key || "").replace(/[.#$\[\]]/g, "_");

export const addUser = (name, email) => {
  console.log("🔥 addUser function called");

  const userRef = push(ref(rtdb, "users"));

  set(userRef, {
    name,
    email,
  })
    .then(() => {
      console.log("✅ Data saved to Firebase");
    })
    .catch((error) => {
      console.log("❌ Firebase error:", error);
    });
};

export const saveUser = async ({ name, email, phone, address }) => {
  const userKey = sanitizeKey(email || name || Date.now().toString());
  const userRef = ref(rtdb, `users/${userKey}`);

  return set(userRef, {
    name,
    email,
    phone,
    address,
    updatedAt: new Date().toISOString(),
  });
};

export const getUserByEmail = async (email) => {
  // Try reading by sanitized key first (used by `saveUser`).
  const key = sanitizeKey(email);
  const directRef = ref(rtdb, `users/${key}`);
  const directSnap = await get(directRef);
  if (directSnap.exists()) {
    return directSnap.val();
  }

  // Fallback: fetch all users and scan for matching email.
  // This avoids using `orderByChild`/`equalTo` which require DB indexes.
  const allUsersSnap = await get(ref(rtdb, "users"));
  if (!allUsersSnap.exists()) return null;

  const users = allUsersSnap.val();
  for (const k of Object.keys(users)) {
    if (users[k] && users[k].email === email) return users[k];
  }

  return null;
};

export const saveFoods = async (foods) => {
  const foodData = {};

  foods.forEach((food) => {
    foodData[food.id] = {
      id: food.id,
      name: food.name,
      category: food.category,
      price: food.price,
      description: food.description,
    };
  });

  return set(ref(rtdb, "foods"), foodData);
};

export const updateUserData = async (email, updates) => {
  const userKey = sanitizeKey(email);
  const userRef = ref(rtdb, `users/${userKey}`);

  return update(userRef, {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
};
