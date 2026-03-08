"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const slides = [
    {
        id: 1,
        image: "/17-pro.webp",
        bg: "bg-gradient-to-br from-[#111] via-[#1a0a00] to-[#3a1a00]",
        visual: "phone",
    },
    {
        id: 2,
        image: "/iwatch.webp",
        bg: "bg-gradient-to-br from-[#0a0a1a] via-[#0d1540] to-[#1a237e]",
        visual: "iwatch",
    },
    {
        id: 3,
        image: "/samsung-zfold.webp",
        bg: "bg-gradient-to-br from-[#0d0d0d] via-[#0f1a00] to-[#1a2a00]",
        visual: "emoji",
    },
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const prev = () =>
        setCurrent((c) => (c - 1 + slides.length) % slides.length);
    const next = () => setCurrent((c) => (c + 1) % slides.length);
    const slide = slides[current];

    return (
        <div className="mx-4 md:mx-10 my-5 rounded-2xl overflow-hidden relative h-[300px] md:h-[460px]">
            <span className="absolute top-3.5 right-3.5 border border-white/30 text-white/50 text-[10px] md:text-[11px] px-2 md:px-2.5 py-0.5 rounded-full z-10">
                Reklama
            </span>

            <button
                onClick={prev}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/10 border border-white/20 text-white text-xl md:text-2xl flex items-center justify-center hover:bg-white/25 transition-colors backdrop-blur-sm"
            >
                ‹
            </button>
            <button
                onClick={next}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/10 border border-white/20 text-white text-xl md:text-2xl flex items-center justify-center hover:bg-white/25 transition-colors backdrop-blur-sm"
            >
                ›
            </button>

            <div
                className={`w-full h-full flex items-center justify-center relative ${slide.bg} transition-all duration-500`}
            >
                <div className="relative w-[80%] h-[80%] md:w-full md:h-full z-0">
                    {slide.image && (
                        <Image
                            src={slide.image}
                            alt="slide"
                            fill
                            priority
                            className="object-contain md:object-cover object-center"
                        />
                    )}
                </div>
            </div>

            <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 flex gap-1 md:gap-1.5 z-10">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-6 md:w-8 h-1 rounded-full border-none cursor-pointer transition-colors ${
                            i === current ? "bg-white" : "bg-white/30"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
