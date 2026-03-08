"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    ChevronUp,
    ChevronDown,
    ShoppingCart,
    Info,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useCartStore } from "@/app/store/use-cart-store";

interface Product {
    id: number;
    title: string;
    name: string;
    image: string;
    originalPrice: number;
    discount: number;
    price: number;
    timerSeconds: number;
}

interface Promotion {
    id: number;
    category: string;
    title: string;
    bgClass: string;
    promoImage: string;
}

const PRODUCTS: Product[] = [
    {
        id: 101,
        title: "Product of the day",
        name: "Sony DualSense PS5 Edge white controller",
        image: "🎮",
        originalPrice: 250,
        discount: 22,
        price: 195,
        timerSeconds: 45366,
    },
    {
        id: 102,
        title: "Product of the day",
        name: "Apple AirPods Pro 2nd generation",
        image: "🎧",
        originalPrice: 299,
        discount: 18,
        price: 245,
        timerSeconds: 38200,
    },
    {
        id: 103,
        title: "Product of the day",
        name: "Samsung Galaxy Watch 6 Classic 47mm",
        image: "⌚",
        originalPrice: 450,
        discount: 30,
        price: 315,
        timerSeconds: 52000,
    },
];

const PROMOTIONS: Promotion[] = [
    {
        id: 1,
        category: "Discount",
        title: "Insurance programs",
        bgClass: "from-zinc-900 via-zinc-800 to-stone-900",
        promoImage: "📱",
    },
    {
        id: 2,
        category: "Promotion",
        title: "0% installment plan for 12 months",
        bgClass: "from-slate-900 via-zinc-800 to-gray-900",
        promoImage: "💳",
    },
];

function useCountdown(initialSeconds: number): string {
    const [secs, setSecs] = useState<number>(initialSeconds);
    useEffect(() => {
        const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
        return () => clearInterval(id);
    }, []);
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return [h, m, s].map((v) => String(v).padStart(2, "0")).join(" : ");
}

function ProductCard({ product }: { product: Product }) {
    const timer = useCountdown(product.timerSeconds);
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAdd = () => {
        addToCart({
            id: product.id.toString(),
            name: product.name,
            price: product.price,
            image: "",
        });
    };

    return (
        <div className="bg-[#111] rounded-[24px] md:rounded-[32px] p-5 md:p-6 w-full h-full flex flex-col justify-between shadow-2xl border border-white/5">
            <h2 className="text-lg md:text-xl font-black text-white tracking-tight italic">
                {product.title.toUpperCase()}
            </h2>

            <div className="flex items-center gap-3 md:gap-4 flex-1">
                <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-white/5 rounded-2xl flex items-center justify-center text-4xl md:text-5xl">
                    {product.image}
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-[12px] md:text-[13px] text-white/80 font-bold leading-tight line-clamp-2">
                        {product.name}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-xs md:text-sm text-gray-500 line-through">
                            ${product.originalPrice}
                        </span>
                        <span className="bg-red-600 text-white text-[9px] md:text-[10px] font-black px-1.5 md:px-2 py-0.5 rounded-full">
                            -{product.discount}%
                        </span>
                    </div>
                    <p className="font-mono text-[11px] md:text-[12px] text-orange-500 font-bold">
                        {timer}
                    </p>
                    <div className="flex items-center gap-1">
                        <span className="text-xl md:text-2xl font-black text-white">
                            ${product.price}
                        </span>
                        <Info size={14} className="text-white/20" />
                    </div>
                </div>
            </div>

            <button
                onClick={handleAdd}
                className="mt-4 w-full bg-white hover:bg-gray-200 active:scale-95 transition-all text-black text-xs md:text-sm font-bold rounded-xl py-3 md:py-3.5 flex items-center justify-center gap-2"
            >
                <ShoppingCart size={16} />
                Add to cart
            </button>
        </div>
    );
}

function PromotionCard({ promotion }: { promotion: Promotion }) {
    return (
        <div className="bg-[#111] rounded-[24px] md:rounded-[32px] overflow-hidden w-full h-full flex flex-col shadow-2xl border border-white/5">
            <div className="px-5 md:px-6 pt-4 md:pt-5">
                <span className="text-lg md:text-xl font-black text-white tracking-tight italic">
                    {promotion.category.toUpperCase()}
                </span>
            </div>
            <div
                className={`m-3 md:m-4 rounded-2xl bg-gradient-to-br ${promotion.bgClass} flex-1 flex items-center relative overflow-hidden p-5 md:p-6 border border-white/10`}
            >
                <p className="text-white font-black text-base md:text-lg leading-tight z-10 max-w-[65%]">
                    {promotion.title}
                </p>
                <span className="absolute right-2 text-6xl md:text-7xl opacity-80 z-10">
                    {promotion.promoImage}
                </span>
            </div>
        </div>
    );
}

const SLIDE_VARIANTS = {
    enter: (dir: number) => ({
        y: dir > 0 ? 50 : -50,
        opacity: 0,
    }),
    center: { y: 0, opacity: 1 },
    exit: (dir: number) => ({
        y: dir > 0 ? -50 : 50,
        opacity: 0,
    }),
};

export default function DailyDealsPage() {
    const [pIndex, setPIndex] = useState(0);
    const [promoIndex, setPromoIndex] = useState(0);

    const nextP = () => setPIndex((i) => (i + 1) % PRODUCTS.length);
    const prevP = () =>
        setPIndex((i) => (i - 1 + PRODUCTS.length) % PRODUCTS.length);

    const nextPromo = () => setPromoIndex((i) => (i + 1) % PROMOTIONS.length);
    const prevPromo = () =>
        setPromoIndex((i) => (i - 1 + PROMOTIONS.length) % PROMOTIONS.length);

    return (
        <section className="px-4 md:px-10 py-8 md:py-12 bg-black">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Product Side */}
                <div className="flex flex-row lg:flex-row items-center gap-3 md:gap-4">
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={prevP}
                            className="p-1.5 md:p-2 hover:bg-white/10 text-white rounded-full transition-colors"
                        >
                            <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                        <div className="flex flex-col gap-1.5 items-center">
                            {PRODUCTS.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-1 md:w-1.5 rounded-full transition-all ${i === pIndex ? "h-3 md:h-4 bg-white" : "h-1 md:h-1.5 bg-white/20"}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={nextP}
                            className="p-1.5 md:p-2 hover:bg-white/10 text-white rounded-full transition-colors"
                        >
                            <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>
                    <div className="relative h-[280px] md:h-[320px] w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={pIndex}
                                variants={SLIDE_VARIANTS}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute inset-0"
                            >
                                <ProductCard product={PRODUCTS[pIndex]} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Promotion Side */}
                <div className="flex flex-row lg:flex-row items-center gap-3 md:gap-4">
                    <div className="relative h-[220px] md:h-[320px] w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={promoIndex}
                                variants={SLIDE_VARIANTS}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute inset-0"
                            >
                                <PromotionCard
                                    promotion={PROMOTIONS[promoIndex]}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={prevPromo}
                            className="p-1.5 md:p-2 hover:bg-white/10 text-white rounded-full transition-colors"
                        >
                            <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                        <div className="flex flex-col gap-1.5 items-center">
                            {PROMOTIONS.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-1 md:w-1.5 rounded-full transition-all ${i === promoIndex ? "h-3 md:h-4 bg-white" : "h-1 md:h-1.5 bg-white/20"}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={nextPromo}
                            className="p-1.5 md:p-2 hover:bg-white/10 text-white rounded-full transition-colors"
                        >
                            <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
