"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { PlusCircle, LayoutList, ExternalLink } from "lucide-react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import Link from "next/link";

export default function AdminPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<"list" | "form">("list");
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const { data, error } = await supabase.from("products").select("*");

        if (error) {
            console.error("Xatolik:", error.message);
            return;
        }

        if (data) {
            const formatted = data.map((p: any) => ({
                id: p.id,
                name: p.name,
                price: p.price,
                sub: p.description,
                image: p.image_url,
                emoji: p.emoji,
                badge: p.badge,
                oldPrice: p.old_price,
                category: p.category,
            }));
            setProducts(formatted);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Haqiqatdan ham o'chirmoqchimisiz?")) {
            const { error } = await supabase
                .from("products")
                .delete()
                .eq("id", id);
            if (!error) fetchProducts();
        }
    };

    const handleSave = async (formData: any, file: File | null) => {
        setLoading(true);
        try {
            let imageUrl = editingProduct?.image || null;

            if (file) {
                const fileName = `${Date.now()}-${file.name}`;
                const { data: uploadData, error: uploadError } =
                    await supabase.storage
                        .from("products")
                        .upload(fileName, file);

                if (uploadError) throw uploadError;

                if (uploadData) {
                    const { data: urlData } = supabase.storage
                        .from("products")
                        .getPublicUrl(fileName);
                    imageUrl = urlData.publicUrl;
                }
            }

            const dbData = {
                name: formData.name,
                price: formData.price,
                description: formData.sub || formData.description,
                image_url: imageUrl,
                category: formData.category,
            };

            if (editingProduct) {
                const { error: updateError } = await supabase
                    .from("products")
                    .update(dbData)
                    .eq("id", editingProduct.id);
                if (updateError) throw updateError;
            } else {
                const { error: insertError } = await supabase
                    .from("products")
                    .insert([dbData]);
                if (insertError) throw insertError;
            }

            setEditingProduct(null);
            setActiveTab("list");
            fetchProducts();
        } catch (error) {
            console.error(error);
            alert("Xatolik yuz berdi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-10">
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-6">
                    <h1 className="text-3xl font-black uppercase tracking-tighter italic">
                        Admin Panel
                    </h1>
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-4 py-2 rounded-xl"
                    >
                        <ExternalLink size={16} /> Saytga qaytish
                    </Link>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-2xl">
                    <button
                        onClick={() => {
                            setActiveTab("list");
                            setEditingProduct(null);
                        }}
                        className={`px-6 py-2 rounded-xl flex items-center gap-2 font-bold text-sm ${activeTab === "list" ? "bg-white shadow-sm" : "text-gray-500"}`}
                    >
                        <LayoutList size={18} /> Ro'yxat
                    </button>
                    <button
                        onClick={() => setActiveTab("form")}
                        className={`px-6 py-2 rounded-xl flex items-center gap-2 font-bold text-sm ${activeTab === "form" ? "bg-white shadow-sm" : "text-gray-500"}`}
                    >
                        <PlusCircle size={18} />{" "}
                        {editingProduct ? "Tahrirlash" : "Qo'shish"}
                    </button>
                </div>
            </div>

            {activeTab === "list" ? (
                <ProductList
                    products={products}
                    onDelete={handleDelete}
                    onEdit={(p) => {
                        setEditingProduct(p);
                        setActiveTab("form");
                    }}
                />
            ) : (
                <ProductForm
                    initialData={editingProduct}
                    onSubmit={handleSave}
                    onCancel={() => {
                        setActiveTab("list");
                        setEditingProduct(null);
                    }}
                    loading={loading}
                />
            )}
        </div>
    );
}
