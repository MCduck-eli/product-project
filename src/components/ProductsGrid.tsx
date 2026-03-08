"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Product } from "../../types/product";
import ProductCard from "./ProductCard";
import { Loader2, PackageOpen } from "lucide-react";

export default function ProductsGrid() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .limit(8);

            if (error) console.error("Supabase Error:", error.message);

            if (data) {
                const formattedProducts: Product[] = data.map((p) => ({
                    id: p.id,
                    image: p.image_url,
                    name: p.name,
                    sub: p.description || "",
                    price: p.price,
                    badge: p.badge,
                    oldPrice: p.old_price,
                }));
                setProducts(formattedProducts);
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    if (loading)
        return (
            <div className="h-96 flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-black" size={48} />
                <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">
                    Loading Collection
                </span>
            </div>
        );

    return (
        <section className="px-4 md:px-10 py-10 md:py-16">
            <div className="flex items-center justify-between mb-8 md:mb-12">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic">
                        New Arrivals
                    </h2>
                    <div className="h-1 w-12 bg-black rounded-full" />
                </div>
                <button className="text-xs md:text-sm font-bold border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-300 transition-all">
                    View All
                </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                {products.length > 0 ? (
                    products.map((p) => <ProductCard key={p.id} product={p} />)
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
                        <PackageOpen size={48} className="text-gray-300 mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-tight">
                            The collection is currently empty
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
