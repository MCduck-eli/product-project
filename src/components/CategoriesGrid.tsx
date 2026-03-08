"use client";

import { useState } from "react";
import Link from "next/link";

interface Category {
    id: string;
    title: string;
    emoji: string;
    gradient: string;
    dark: boolean;
    compact?: boolean;
}

const CATEGORIES: Category[] = [
    {
        id: "smartphones",
        title: "Smartphones",
        emoji: "📱",
        gradient: "from-slate-50 to-blue-50",
        dark: false,
    },
    {
        id: "tablets",
        title: "Tablets",
        emoji: "📲",
        gradient: "from-slate-50 to-indigo-50",
        dark: false,
    },
    {
        id: "laptops",
        title: "Laptops",
        emoji: "💻",
        gradient: "from-slate-50 to-sky-50",
        dark: false,
    },
    {
        id: "gaming",
        title: "Gaming",
        emoji: "🎮",
        gradient: "from-gray-900 to-gray-700",
        dark: true,
    },
    {
        id: "gadgets",
        title: "Gadgets",
        emoji: "🎯",
        gradient: "from-orange-50 to-amber-50",
        dark: false,
        compact: true,
    },
    {
        id: "accessories",
        title: "Accessories",
        emoji: "🔌",
        gradient: "from-slate-50 to-zinc-100",
        dark: false,
        compact: true,
    },
    {
        id: "watches",
        title: "Watches",
        emoji: "⌚",
        gradient: "from-rose-50 to-pink-50",
        dark: false,
    },
    {
        id: "headphones",
        title: "Headphones",
        emoji: "🎧",
        gradient: "from-gray-900 to-zinc-800",
        dark: true,
    },
    {
        id: "dyson",
        title: "Dyson",
        emoji: "💨",
        gradient: "from-fuchsia-50 to-violet-50",
        dark: false,
    },
    {
        id: "services",
        title: "Services",
        emoji: "⚙️",
        gradient: "from-slate-100 to-gray-200",
        dark: false,
        compact: true,
    },
];

function CategoryCard({ category }: { category: Category }) {
    const [isHovered, setIsHovered] = useState(false);
    const { title, emoji, gradient, dark, compact, id } = category;

    return (
        <Link
            href={`/category/${id}`}
            className={`
                relative w-full h-full overflow-hidden rounded-2xl cursor-pointer select-none block
                border border-white/60 bg-gradient-to-br ${gradient}
                ${dark ? "text-white" : "text-gray-900"}
                transition-all duration-300 ease-out
                ${isHovered ? "shadow-xl scale-[1.02] -translate-y-1" : "shadow-sm"}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative h-full flex flex-col p-3 md:p-4">
                <h3
                    className={`font-bold leading-tight ${compact ? "text-[10px] md:text-xs" : "text-xs md:text-sm uppercase tracking-wider"}`}
                >
                    {title}
                </h3>

                <div
                    className={`flex-1 flex ${compact ? "items-center justify-center" : "items-end justify-end"}`}
                >
                    <span
                        className={`transition-all duration-500 block ${compact ? "text-2xl md:text-3xl" : "text-4xl md:text-6xl"} 
                        ${isHovered ? "scale-110 -rotate-12" : "scale-100 rotate-0"}`}
                    >
                        {emoji}
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default function CategoriesGrid() {
    return (
        <section className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-6 md:py-10">
            <div className="hidden md:grid grid-cols-12 grid-rows-[180px_180px] gap-3">
                <div className="col-span-4">
                    {CATEGORIES[0] && <CategoryCard category={CATEGORIES[0]} />}
                </div>
                <div className="col-span-2">
                    {CATEGORIES[1] && <CategoryCard category={CATEGORIES[1]} />}
                </div>
                <div className="col-span-4">
                    {CATEGORIES[2] && <CategoryCard category={CATEGORIES[2]} />}
                </div>
                <div className="col-span-1 row-span-2">
                    {CATEGORIES[3] && <CategoryCard category={CATEGORIES[3]} />}
                </div>
                <div className="col-span-1">
                    {CATEGORIES[4] && <CategoryCard category={CATEGORIES[4]} />}
                </div>

                <div className="col-span-4">
                    {CATEGORIES[6] && <CategoryCard category={CATEGORIES[6]} />}
                </div>
                <div className="col-span-2">
                    {CATEGORIES[7] && <CategoryCard category={CATEGORIES[7]} />}
                </div>
                <div className="col-span-4">
                    {CATEGORIES[8] && <CategoryCard category={CATEGORIES[8]} />}
                </div>
                <div className="col-span-1 grid grid-rows-2 gap-3">
                    {CATEGORIES[5] && <CategoryCard category={CATEGORIES[5]} />}
                    {CATEGORIES[9] && <CategoryCard category={CATEGORIES[9]} />}
                </div>
            </div>

            <div className="grid md:hidden grid-cols-2 sm:grid-cols-3 gap-3">
                {CATEGORIES.map((cat) => (
                    <div key={cat.id} className="h-[120px]">
                        <CategoryCard category={cat} />
                    </div>
                ))}
            </div>
        </section>
    );
}
