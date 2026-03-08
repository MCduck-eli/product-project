import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
    id: string;
    name: string;
    price: number | string;
    image: string;
    quantity: number;
}

interface CartStore {
    cart: CartItem[];
    addToCart: (product: any) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    totalItems: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (product) => {
                const currentCart = get().cart;
                const existingItem = currentCart.find(
                    (item) => item.id === product.id,
                );

                if (existingItem) {
                    set({
                        cart: currentCart.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item,
                        ),
                    });
                } else {
                    set({
                        cart: [...currentCart, { ...product, quantity: 1 }],
                    });
                }
            },
            removeFromCart: (id) =>
                set({ cart: get().cart.filter((item) => item.id !== id) }),
            clearCart: () => set({ cart: [] }),
            totalItems: () =>
                get().cart.reduce((acc, item) => acc + item.quantity, 0),
        }),
        { name: "shopping-cart" },
    ),
);
