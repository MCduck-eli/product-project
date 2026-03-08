"use client";
import Typewriter from "typewriter-effect";

export default function HeroSection() {
    return (
        <div className="pointer-events-none">
            <Typewriter
                options={{
                    strings: [
                        "The iPhone 17 is expected to redefine performance with its...",
                        "MacBook Air M3: Lean, mean, M3 machine.",
                        "Push the boundaries of what's possible with the all-new Samsung",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 75,
                }}
            />
        </div>
    );
}
