import React, { createContext, useContext, useEffect, useState } from "react";
import { foods } from "../data/foods";
import {
    getUserByEmail,
    saveFoods,
    saveUser,
    updateUserData,
} from "../firebase/firebaseActions";

type User = {
  name: string;
  email: string;
  phone: string;
  address: string;
  photo?: string;
  ordersCount: number;
  favoritesCount: number;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, name?: string) => Promise<boolean>;
  signup: (
    name: string,
    email: string,
    phone: string,
    address: string,
  ) => Promise<boolean>;
  logout: () => void;
  updateProfile: (
    name: string,
    email: string,
    phone: string,
    address: string,
  ) => Promise<void>;
  incrementOrdersCount: () => Promise<void>;
  incrementFavoritesCount: () => Promise<void>;
  decrementFavoritesCount: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock check for existing user session
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, name?: string) => {
    setLoading(true);

    const displayName =
      name ||
      (email.split("@")[0]
        ? email.split("@")[0].charAt(0).toUpperCase() +
          email.split("@")[0].slice(1)
        : "User");

    try {
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        setUser({
          name: existingUser.name || displayName,
          email: existingUser.email || email,
          phone: existingUser.phone || "",
          address: existingUser.address || "",
          ordersCount: existingUser.ordersCount ?? 0,
          favoritesCount: existingUser.favoritesCount ?? 0,
        });
      } else {
        const userData = {
          name: displayName,
          email,
          phone: "",
          address: "",
          ordersCount: 0,
          favoritesCount: 0,
        };

        setUser(userData);

        await saveUser(userData);
        await saveFoods(foods);
      }
    } catch (error) {
      console.log("❌ Firebase sync error on login:", error);
    }

    setLoading(false);
    return true;
  };

  const signup = async (
    name: string,
    email: string,
    phone: string,
    address: string,
  ) => {
    setLoading(true);

    const userData = {
      name,
      email,
      phone: phone || "",
      address: address || "",
      ordersCount: 0,
      favoritesCount: 0,
    };

    setUser(userData);

    try {
      await saveUser({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
      });
      await saveFoods(foods);
    } catch (error) {
      console.log("❌ Firebase sync error on signup:", error);
    }

    setLoading(false);
    return true;
  };

  const updateProfile = async (
    name: string,
    email: string,
    phone: string,
    address: string,
  ) => {
    if (user) {
      const updatedUser = {
        ...user,
        name,
        email,
        phone,
        address,
      };
      setUser(updatedUser);

      try {
        await updateUserData(email, {
          name,
          email,
          phone,
          address,
        });
      } catch (error) {
        console.log("❌ Firebase sync error on profile update:", error);
      }
    }
  };

  const incrementOrdersCount = async () => {
    if (user) {
      const newCount = user.ordersCount + 1;
      setUser({ ...user, ordersCount: newCount });

      try {
        await updateUserData(user.email, {
          ordersCount: newCount,
        });
      } catch (error) {
        console.log("❌ Firebase sync error on orders count update:", error);
      }
    }
  };

  const incrementFavoritesCount = async () => {
    if (user) {
      const newCount = user.favoritesCount + 1;
      setUser({ ...user, favoritesCount: newCount });

      try {
        await updateUserData(user.email, {
          favoritesCount: newCount,
        });
      } catch (error) {
        console.log("❌ Firebase sync error on favorites count update:", error);
      }
    }
  };

  const decrementFavoritesCount = async () => {
    if (user && user.favoritesCount > 0) {
      const newCount = user.favoritesCount - 1;
      setUser({ ...user, favoritesCount: newCount });

      try {
        await updateUserData(user.email, {
          favoritesCount: newCount,
        });
      } catch (error) {
        console.log("❌ Firebase sync error on favorites count update:", error);
      }
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        updateProfile,
        incrementOrdersCount,
        incrementFavoritesCount,
        decrementFavoritesCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
