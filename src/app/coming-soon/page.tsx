"use client";

import Link from "next/link";
import { MoveLeft, Rocket, Construction, Sparkles } from "lucide-react";

export default function ComingSoonPage() {
    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-6 overflow-hidden relative">
            <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-700" />

            <div className="max-w-2xl w-full text-center z-10">
                <div className="relative inline-block mb-10">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[40px] shadow-2xl relative z-10">
                        <Construction
                            size={64}
                            className="text-yellow-400 animate-bounce mx-auto"
                        />
                    </div>
                    <Sparkles
                        className="absolute -top-4 -right-4 text-purple-400 animate-ping"
                        size={32}
                    />
                    <Rocket
                        className="absolute -bottom-6 -left-6 text-blue-400 animate-pulse"
                        size={40}
                    />
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                    Coming{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                        Soon
                    </span>
                </h1>

                <p className="text-gray-400 text-lg md:text-xl mb-12 leading-relaxed max-w-lg mx-auto">
                    We're working hard on this page. Something great is coming
                    soon!
                </p>
                <div className="w-full max-w-md mx-auto h-3 bg-white/5 rounded-full mb-12 overflow-hidden border border-white/10 p-[2px]">
                    <div
                        className="h-full bg-gradient-to-r from-purple-600 via-blue-500 to-yellow-400 rounded-full w-[65%] animate-shimmer"
                        style={{ backgroundSize: "200% 100%" }}
                    />
                </div>
                <Link
                    href="/"
                    className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-2xl font-bold hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/5 group"
                >
                    <MoveLeft
                        size={20}
                        className="group-hover:-translate-x-1 transition-transform"
                    />
                    Back to Home
                </Link>
                <div className="mt-16 flex items-center justify-center gap-6 text-gray-500 text-sm font-medium">
                    <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Systems Active
                    </span>
                    <span className="w-[1px] h-4 bg-white/10" />
                    <span>Estimated: 2026</span>
                </div>
            </div>
        </div>
    );
}
