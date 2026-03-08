"use client";

import { Product } from "../../types/product";
import Link from "next/link";
import { useCartStore } from "@/app/store/use-cart-store";
import { useFavoriteStore } from "@/app/store/use-favorite-store";
import { Heart, ShoppingCart } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
    const addToCart = useCartStore((state) => state.addToCart);
    const { toggleFavorite, isFavorite } = useFavoriteStore();

    const fav = isFavorite(product.id);

    const handleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(product);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const numericPrice =
            typeof product.price === "string"
                ? parseFloat(product.price.replace(/[^0-9.]/g, ""))
                : product.price;

        addToCart({
            id: product.id,
            name: product.name,
            price: numericPrice,
            image: product.image,
        });
    };

    return (
        <Link href={`/product/${product.id}`} className="block h-full">
            <div className="border border-gray-100 rounded-2xl md:rounded-[24px] p-3 md:p-5 relative hover:shadow-2xl hover:border-transparent transition-all duration-300 cursor-pointer group h-full flex flex-col bg-white">
                {/* Badge */}
                {product.badge && (
                    <span className="absolute top-3 left-3 bg-black text-white z-10 text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                        {product.badge}
                    </span>
                )}

                {/* Favorite Button */}
                <button
                    onClick={handleFavorite}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-50/80 backdrop-blur-sm md:opacity-0 md:group-hover:opacity-100 transition-all duration-300"
                >
                    <Heart
                        size={18}
                        className={`transition-all ${
                            fav
                                ? "fill-red-500 text-red-500 scale-110"
                                : "text-gray-400 hover:text-black"
                        }`}
                    />
                </button>

                {/* Image Section */}
                <div className="w-full h-32 md:h-44 flex items-center justify-center mb-3 md:mb-5 overflow-hidden relative">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <span className="text-5xl md:text-7xl group-hover:scale-110 transition-transform duration-500">
                            {product.emoji || "📦"}
                        </span>
                    )}
                </div>

                {/* Info Section */}
                <div className="flex flex-col flex-1">
                    <h3 className="text-sm md:text-[16px] font-bold text-gray-900 mb-1 leading-tight line-clamp-2">
                        {product.name}
                    </h3>
                    <p className="text-[10px] md:text-xs text-gray-400 mb-4 line-clamp-1 font-medium">
                        {product.sub || "Premium Quality"}
                    </p>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between mt-auto pt-2">
                        <div className="flex flex-col">
                            {product.oldPrice && (
                                <span className="text-[10px] md:text-xs text-gray-400 line-through font-medium">
                                    {product.oldPrice}$
                                </span>
                            )}
                            <span className="text-base md:text-xl font-black text-black tracking-tight">
                                {product.price}$
                            </span>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="bg-black text-white w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-zinc-800 transition-all active:scale-90 shadow-lg shadow-gray-200"
                        >
                            <ShoppingCart size={18} className="md:hidden" />
                            <span className="hidden md:block font-bold text-[13px]">
                                Add
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
