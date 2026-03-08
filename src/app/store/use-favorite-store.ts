import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteStore {
    favorites: any[];
    toggleFavorite: (product: any) => void;
    isFavorite: (id: string) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>()(
    persist(
        (set, get) => ({
            favorites: [],
            toggleFavorite: (product) => {
                const isFav = get().favorites.some((f) => f.id === product.id);
                if (isFav) {
                    set({
                        favorites: get().favorites.filter(
                            (f) => f.id !== product.id,
                        ),
                    });
                } else {
                    set({ favorites: [...get().favorites, product] });
                }
            },
            isFavorite: (id) => get().favorites.some((f) => f.id === id),
        }),
        { name: "favorites-storage" },
    ),
);
