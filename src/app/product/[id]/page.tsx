"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    ShoppingBasket,
    Heart,
    ShieldCheck,
    Truck,
    RotateCcw,
    ArrowLeft,
} from "lucide-react";
import { supabase } from "../../../../lib/supabase";
import Link from "next/link";
import { useCartStore } from "@/app/store/use-cart-store";
import { useFavoriteStore } from "@/app/store/use-favorite-store";

export default function ProductDetails({ params }: { params: { id: string } }) {
    const id = params.id;

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const addToCart = useCartStore((state) => state.addToCart);
    const { toggleFavorite, isFavorite } = useFavoriteStore();

    useEffect(() => {
        const fetchProduct = async () => {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", id)
                .single();

            if (data) setProduct(data);
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image_url,
            });
        }
    };

    const handleFavorite = () => {
        if (product) {
            toggleFavorite({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image_url,
            });
        }
    };

    if (loading)
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
            </div>
        );

    if (!product)
        return (
            <div className="h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-gray-500">Product not found.</p>
                <Link href="/" className="text-blue-600 font-bold">
                    Return to main page
                </Link>
            </div>
        );

    const fav = isFavorite(product.id);

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
            <Link
                href="/"
                className="flex items-center gap-2 text-gray-400 hover:text-black mb-8 transition-colors text-sm font-medium"
            >
                <ArrowLeft size={16} />
                Go back
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="bg-gray-50 rounded-[40px] p-10 flex items-center justify-center relative overflow-hidden group border border-gray-100">
                    <div className="relative w-full h-[450px] transition-transform duration-700 group-hover:scale-105">
                        <Image
                            src={product.image_url || "/placeholder.png"}
                            alt={product.name}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {product.category || "New"}
                            </span>
                            {product.badge && (
                                <span className="bg-[#F5A623] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    {product.badge}
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tighter">
                            {product.name}
                        </h1>
                        <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            {product.old_price && (
                                <span className="text-xl text-gray-400 line-through font-medium">
                                    {product.old_price.toLocaleString()} $
                                </span>
                            )}
                            <span className="text-5xl font-black tracking-tighter">
                                {product.price.toLocaleString()} $
                            </span>
                        </div>
                    </div>

                    <div className="h-[1px] bg-gray-100 w-full" />

                    <div className="flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="bg-black text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all active:scale-95 flex-[3]"
                        >
                            <ShoppingBasket size={24} /> Add to Cart
                        </button>
                        <button
                            onClick={handleFavorite}
                            className={`p-5 border rounded-2xl transition-all group flex items-center justify-center ${
                                fav
                                    ? "bg-red-50 border-red-200"
                                    : "border-gray-200 hover:bg-red-50"
                            }`}
                        >
                            <Heart
                                size={24}
                                className={`transition-all ${fav ? "fill-red-500 text-red-500 scale-110" : "text-gray-400 group-hover:text-red-500"}`}
                            />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <ShieldCheck className="text-green-600" size={20} />
                            <div className="flex flex-col">
                                <span className="text-[11px] font-bold uppercase tracking-tight">
                                    Warranty
                                </span>
                                <span className="text-[12px] text-gray-500">
                                    1 year official
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <Truck className="text-blue-600" size={20} />
                            <div className="flex flex-col">
                                <span className="text-[11px] font-bold uppercase tracking-tight">
                                    Delivery
                                </span>
                                <span className="text-[12px] text-gray-500">
                                    Free
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <RotateCcw className="text-orange-600" size={20} />
                            <div className="flex flex-col">
                                <span className="text-[11px] font-bold uppercase tracking-tight">
                                    Return
                                </span>
                                <span className="text-[12px] text-gray-500">
                                    14 Day
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
