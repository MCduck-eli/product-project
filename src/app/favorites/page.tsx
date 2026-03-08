"use client";

import { useFavoriteStore } from "@/app/store/use-favorite-store";
import ProductCard from "@/components/ProductCard";
import { HeartOff, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
    const { favorites } = useFavoriteStore();

    return (
        <div className="min-h-screen bg-[#fff5f6] px-6 md:px-10 py-12">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex flex-col gap-4 mb-10">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors text-sm font-medium w-fit"
                    >
                        <ArrowLeft size={18} />
                        Back to Shopping
                    </Link>
                    <div className="flex items-center gap-4">
                        <h1 className="text-4xl font-black text-[#111] tracking-tight">
                            My Favorites
                        </h1>
                        <span className="bg-white px-4 py-1 rounded-full text-sm font-bold shadow-sm border border-pink-100 text-pink-500">
                            {favorites.length} items
                        </span>
                    </div>
                </div>

                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favorites.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-3xl p-2 shadow-sm border border-pink-50 hover:shadow-md transition-shadow"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 bg-white/50 rounded-[40px] border-2 border-dashed border-pink-200">
                        <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <HeartOff size={40} className="text-pink-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Your favorites list is empty
                        </h2>
                        <p className="text-gray-500 mb-8 max-w-xs text-center">
                            Save items you like so you can easily find them
                            later.
                        </p>
                        <Link
                            href="/"
                            className="bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-pink-200"
                        >
                            Start Exploring
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
