"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { supabase } from "../../../../lib/supabase";
import { ChevronRight } from "lucide-react";
import CategorySidebar from "../components/CategorySidebar";

export default function CategoryPage({ params }: { params: { slug: string } }) {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setLoading(true);
            const { data } = await supabase
                .from("products")
                .select("*")
                .eq("category", params.slug);

            if (data) {
                const formatted = data.map((p: any) => ({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    sub: p.description,
                    image: p.image_url,
                    emoji: p.emoji,
                }));
                setProducts(formatted);
            }
            setLoading(false);
        };

        fetchCategoryProducts();
    }, [params.slug]);

    return (
        <div className="max-w-[1440px] mx-auto px-10 py-4">
            <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-4">
                <span>Home</span> <ChevronRight size={10} />
                <span>Catalog</span> <ChevronRight size={10} />
                <span className="text-gray-600 capitalize">{params.slug}</span>
            </div>

            <h1 className="text-3xl font-black uppercase mb-6 italic tracking-tighter">
                {params.slug}
            </h1>

            <div className="flex gap-10 items-start">
                <div className="sticky top-20">
                    <CategorySidebar />
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <select className="bg-gray-50 border-none outline-none px-4 py-2.5 rounded-xl text-sm font-bold cursor-pointer hover:bg-gray-100 transition-colors">
                            <option>Popular first</option>
                            <option>Cheap ones first</option>
                            <option>First of all, dear ones</option>
                        </select>
                        <span className="text-xs text-gray-400 font-medium">
                            Found: {products.length} goods
                        </span>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <div
                                    key={n}
                                    className="h-[380px] bg-gray-50 animate-pulse rounded-[32px]"
                                />
                            ))}
                        </div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
                            <p className="text-gray-400 font-medium">
                                There are currently no products in this section.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
