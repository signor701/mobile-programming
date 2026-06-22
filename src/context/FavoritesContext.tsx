import React, { createContext, useContext, useMemo, useState } from "react";
import { foods } from "../data/foods";

type FavoritesContextType = {
  favorites: string[];
  favoriteFoods: typeof foods;
  isFavorite: (id: string) => boolean;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const favoriteFoods = useMemo(
    () => foods.filter((food) => favorites.includes(food.id)),
    [favorites],
  );

  const isFavorite = (id: string) => favorites.includes(id);

  const addFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((favorite) => favorite !== id));
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((favorite) => favorite !== id)
        : [...prev, id],
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoriteFoods,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};
