"use client";

import { useState, useEffect } from "react";
import { X, UploadCloud } from "lucide-react";

interface Props {
    initialData?: any;
    onSubmit: (data: any, file: File | null) => void;
    onCancel: () => void;
    loading: boolean;
}

export default function ProductForm({
    initialData,
    onSubmit,
    onCancel,
    loading,
}: Props) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("laptop");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");

    const categories = [
        { id: "laptop", name: "Laptops" },
        { id: "monitor", name: "Monitors" },
        { id: "keyboard", name: "Keyboards" },
        { id: "mouse", name: "Mice" },
        { id: "smartphone", name: "Smartphones" },
    ];

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || "");
            setPrice(initialData.price || "");
            setDesc(initialData.sub || initialData.description || "");
            setCategory(initialData.category || "laptop");
            setPreview(initialData.image || "");
        } else {
            setName("");
            setPrice("");
            setDesc("");
            setCategory("laptop");
            setPreview("");
        }
    }, [initialData]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        if (selectedFile) {
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, price: Number(price), sub: desc, category }, file);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 p-10 rounded-[40px] shadow-xl flex flex-col gap-6 max-w-2xl mx-auto"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                    {initialData ? "Tahrirlash" : "Yangi mahsulot"}
                </h2>
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-gray-400 hover:text-black transition-colors"
                >
                    <X size={24} />
                </button>
            </div>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Mahsulot nomi"
                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-black transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold ml-1 text-gray-500">
                        Kategoriya tanlang
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-black transition-all appearance-none cursor-pointer"
                    >
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <input
                    type="number"
                    placeholder="Narxi ($)"
                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-black transition-all"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Tavsif (ixtiyoriy)"
                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-black transition-all h-32 resize-none"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />

                <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:border-black transition-colors cursor-pointer min-h-[150px]">
                    <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                        accept="image/*"
                    />

                    {preview ? (
                        <img
                            src={preview}
                            alt="Preview"
                            className="h-24 w-24 object-contain rounded-lg"
                        />
                    ) : (
                        <UploadCloud className="text-gray-400" size={32} />
                    )}

                    <p className="text-sm text-gray-500 font-medium">
                        {file ? file.name : "Rasm yuklash (Ixtiyoriy)"}
                    </p>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-black text-white p-5 rounded-2xl font-bold hover:opacity-90 active:scale-[0.98] transition-all disabled:bg-gray-400"
            >
                {loading
                    ? "Jarayon bajarilmoqda..."
                    : initialData
                      ? "O'zgarishlarni saqlash"
                      : "Mahsulotni qo'shish"}
            </button>
        </form>
    );
}
