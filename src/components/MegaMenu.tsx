"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

const CATEGORY_UI: Record<string, any> = {
    laptop: {
        label: "Laptops",
        image: "/macbook-air-m2-rb.png",
        bgColor: "bg-slate-50",
        title: "MacBook Air",
        sub: "Supercharged by M3",
    },
    smartphone: {
        label: "Smartphones",
        image: "/iphone-16.png",
        bgColor: "bg-zinc-50",
        title: "iPhone 16 Pro",
        sub: "Titanium power",
    },
    monitor: {
        label: "Monitors",
        image: "/monitor1.webp",
        bgColor: "bg-blue-50",
        title: "UltraWide 4K",
        sub: "Immersive view",
    },
    keyboard: {
        label: "Keyboards",
        image: "/klaviatura2.webp",
        bgColor: "bg-orange-50",
        title: "Mechanical",
        sub: "Clicky & Fast",
    },
};

export default function CatalogContent({ onClose }: { onClose?: () => void }) {
    const [dynamicCategories, setDynamicCategories] = useState<any[]>([]);
    const [activeId, setActiveId] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getDynamicCatalog() {
            const { data } = await supabase
                .from("products")
                .select("category, name");
            if (data) {
                const grouped = data.reduce(
                    (acc: Record<string, any>, item: any) => {
                        const cat = item.category || "other";
                        if (!acc[cat]) {
                            const ui = CATEGORY_UI[cat] || {
                                label: cat.toUpperCase(),
                                image: "/placeholder.png",
                                bgColor: "bg-gray-50",
                                title: cat,
                                sub: "Check it out",
                            };
                            acc[cat] = {
                                id: cat,
                                label: ui.label,
                                slug: cat,
                                items: [],
                                promo: ui,
                            };
                        }
                        if (acc[cat].items.length < 6)
                            acc[cat].items.push(item.name);
                        return acc;
                    },
                    {},
                );
                const categoryList = Object.values(grouped);
                setDynamicCategories(categoryList);
                if (categoryList.length > 0) setActiveId(categoryList[0].id);
            }
            setLoading(false);
        }
        getDynamicCatalog();
    }, []);

    const activeCategory = dynamicCategories.find((c) => c.id === activeId);

    if (loading)
        return (
            <div className="w-full h-[500px] flex items-center justify-center bg-white rounded-b-3xl border border-gray-200">
                <Loader2 className="animate-spin text-gray-400" size={32} />
            </div>
        );

    return (
        <div className="flex bg-white w-full border border-gray-200 shadow-2xl rounded-b-3xl overflow-hidden h-[500px]">
            <nav className="w-[300px] bg-gray-50/50 border-r border-gray-100 py-6 overflow-y-auto scrollbar-hide">
                {dynamicCategories.map((cat) => (
                    <button
                        key={cat.id}
                        onMouseEnter={() => setActiveId(cat.id)}
                        className={`w-full text-left px-8 py-4 text-[15px] transition-all flex items-center justify-between group ${
                            activeId === cat.id
                                ? "text-black bg-white font-bold"
                                : "text-gray-500 hover:text-black"
                        }`}
                    >
                        <span className="flex items-center gap-3 capitalize">
                            {activeId === cat.id && (
                                <Sparkles
                                    size={14}
                                    className="text-yellow-500"
                                />
                            )}
                            {cat.label}
                        </span>
                        <ChevronRight
                            size={16}
                            className={`transition-all duration-300 ${activeId === cat.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
                        />
                    </button>
                ))}
            </nav>

            <div className="flex-1 flex p-10 gap-10 bg-white overflow-hidden">
                <div className="flex-[2] overflow-y-auto pr-4 scrollbar-hide">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                        <div className="flex flex-col">
                            <h4 className="text-[13px] font-bold text-black mb-4 uppercase tracking-widest border-b border-gray-100 pb-2">
                                Products
                            </h4>
                            <ul className="space-y-3">
                                {activeCategory?.items.map((item: string) => (
                                    <li key={item}>
                                        <Link
                                            href={`/category/${activeCategory.slug}`}
                                            onClick={onClose}
                                            className="text-[14px] text-gray-500 hover:text-blue-600 transition-colors block truncate"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                                <li className="pt-2">
                                    <Link
                                        href={`/category/${activeCategory?.slug}`}
                                        onClick={onClose}
                                        className="text-[13px] font-bold text-black flex items-center gap-1 hover:underline"
                                    >
                                        See all <ArrowRight size={12} />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <Link
                    href={`/category/${activeCategory?.slug}`}
                    onClick={onClose}
                    className={`flex-1 rounded-3xl ${activeCategory?.promo.bgColor || "bg-gray-50"} p-8 flex flex-col justify-between relative overflow-hidden group border border-gray-100 transition-all hover:shadow-lg`}
                >
                    <div>
                        <h3 className="text-2xl font-black text-black leading-tight mb-2">
                            {activeCategory?.promo.title}
                        </h3>
                        <p className="text-sm text-gray-500 max-w-[150px]">
                            {activeCategory?.promo.sub ||
                                activeCategory?.promo.subtitle}
                        </p>
                        <span className="mt-4 flex items-center gap-2 text-sm font-bold text-black group/btn">
                            Buy now{" "}
                            <ArrowRight
                                size={14}
                                className="group-hover/btn:translate-x-1 transition-transform"
                            />
                        </span>
                    </div>
                    <div className="relative w-full h-44 mt-4 self-center transition-transform duration-500 group-hover:scale-110">
                        <Image
                            src={activeCategory?.promo.image}
                            alt="promo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>
            </div>
        </div>
    );
}
