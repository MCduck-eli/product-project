"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function AuthModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    if (!isOpen) return null;

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (isRegister) {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                alert(error.message);
            } else if (data.user && data.user.identities?.length === 0) {
                alert("Bu email allaqachon ro'yxatdan o'tgan!");
            } else {
                alert("Emailingizga tasdiqlash xati yuborildi!");
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) alert(error.message);
            else onClose();
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-2xl w-full max-w-md relative shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-black"
                >
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isRegister ? "Ro'yxatdan o'tish" : "Tizimga kirish"}
                </h2>
                <form onSubmit={handleAuth} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="border p-3 rounded-xl outline-none focus:border-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Parol"
                        className="border p-3 rounded-xl outline-none focus:border-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white p-3 rounded-xl font-semibold hover:opacity-90 transition"
                    >
                        {loading
                            ? "Yuklanmoqda..."
                            : isRegister
                              ? "Ro'yxatdan o'tish"
                              : "Kirish"}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-500">
                    {isRegister
                        ? "Akkauntingiz bormi?"
                        : "Akkauntingiz yo'qmi?"}{" "}
                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-black font-bold underline"
                    >
                        {isRegister ? "Kirish" : "Ro'yxatdan o'tish"}
                    </button>
                </p>
            </div>
        </div>
    );
}
