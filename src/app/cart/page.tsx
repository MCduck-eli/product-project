"use client";

import { Trash2, Plus, Minus, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "../store/use-cart-store";
import CartSidebar from "./components/cart-sidebar";

export default function CartPage() {
    const { cart, removeFromCart, addToCart, clearCart } = useCartStore();
    const [selectedItems, setSelectedItems] = useState<string[]>(
        cart.map((item) => item.id),
    );

    const toggleAll = () => {
        if (selectedItems.length === cart.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cart.map((item) => item.id));
        }
    };

    const toggleItem = (id: string) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="h-[70vh] flex flex-col items-center justify-center gap-6">
                <h1 className="text-3xl font-bold text-gray-300">
                    The cart is empty
                </h1>
                <Link
                    href="/"
                    className="bg-black text-white px-8 py-4 rounded-2xl font-bold"
                >
                    Go to shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-[1440px] mx-auto px-10 py-10">
            <h1 className="text-4xl font-black mb-10">Basket</h1>

            <div className="flex flex-col lg:flex-row gap-10 items-start">
                <div className="flex-1 w-full">
                    <div className="flex justify-between items-center pb-6 border-b border-gray-100 mb-6">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={
                                    selectedItems.length === cart.length &&
                                    cart.length > 0
                                }
                                onChange={toggleAll}
                                className="w-5 h-5 accent-black rounded"
                            />
                            <span className="font-bold text-sm">
                                Select all
                            </span>
                        </label>
                        <button
                            onClick={clearCart}
                            className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-sm font-medium"
                        >
                            <Trash2 size={18} /> Delete selected
                        </button>
                    </div>

                    <div className="flex flex-col gap-8">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col md:flex-row items-center gap-6 py-6 border-b border-gray-50 last:border-none"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.id)}
                                    onChange={() => toggleItem(item.id)}
                                    className="w-5 h-5 accent-black shrink-0"
                                />

                                <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="object-contain"
                                    />
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-bold text-lg leading-tight mb-2">
                                        {item.name}
                                    </h3>
                                    <p className="text-gray-400 text-xs">
                                        In stock
                                    </p>
                                </div>

                                <div className="flex items-center gap-8 shrink-0">
                                    <div className="flex items-center bg-gray-100 rounded-xl p-1">
                                        <button
                                            onClick={() => {}}
                                            className="p-2 hover:bg-white rounded-lg transition-all"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-10 text-center font-bold">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="p-2 hover:bg-white rounded-lg transition-all"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <div className="text-right min-w-[120px]">
                                        <p className="text-xl font-black">
                                            {(
                                                Number(item.price) *
                                                item.quantity
                                            ).toLocaleString()}{" "}
                                            $
                                        </p>
                                        <div className="flex justify-end gap-3 mt-2">
                                            <Heart
                                                size={18}
                                                className="text-gray-300 cursor-pointer hover:text-red-500 transition-colors"
                                            />
                                            <Trash2
                                                size={18}
                                                className="text-gray-300 cursor-pointer hover:text-red-500 transition-colors"
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <CartSidebar />
            </div>
        </div>
    );
}
