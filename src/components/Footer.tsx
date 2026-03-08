"use client";

import Link from "next/link";
import {
    Instagram,
    Send,
    Phone,
    MapPin,
    Mail,
    ChevronDown,
} from "lucide-react";
import { useState } from "react";

const links = {
    "For Buyers": ["How to order", "Delivery", "Payment", "Returns"],
    Company: ["About us", "Stores", "Vacancies", "Contacts"],
    Support: ["Service Center", "Trade-in", "Warranty", "Privacy Policy"],
};

export default function Footer() {
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (title: string) => {
        setOpenSection(openSection === title ? null : title);
    };

    return (
        <footer className="bg-[#0a0a0a] text-[#666] pt-10 md:pt-16 pb-8 px-4 md:px-10 mt-10 md:mt-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-5 gap-8 md:gap-12">
                {/* Brand Section */}
                <div className="lg:col-span-2 space-y-4 md:space-y-6">
                    <Link href={"/"} className="inline-block">
                        <h1 className="text-xl font-black text-white tracking-tighter ">
                            <span className="px-2 py-0.5 bg-white text-black rounded-lg mr-1 ">
                                PRO
                            </span>
                            DUCT
                        </h1>
                    </Link>
                    <p className="text-xs md:text-sm leading-relaxed max-w-sm font-medium">
                        Official premium reseller store in Uzbekistan. Genuine
                        devices with professional service support.
                    </p>
                    <div className="flex gap-3 md:gap-4">
                        <a
                            href="#"
                            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                        >
                            <Send size={16} />
                        </a>
                        <a
                            href="#"
                            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                        >
                            <Instagram size={16} />
                        </a>
                    </div>
                </div>

                {/* Links Sections (Mobile Accordion) */}
                {Object.entries(links).map(([title, items]) => (
                    <div
                        key={title}
                        className="border-b border-white/5 lg:border-none pb-4 lg:pb-0 space-y-4 lg:space-y-6"
                    >
                        <button
                            onClick={() => toggleSection(title)}
                            className="w-full flex justify-between items-center lg:cursor-default"
                        >
                            <h4 className="text-white text-[10px] md:text-xs font-black uppercase tracking-[2px] italic">
                                {title}
                            </h4>
                            <ChevronDown
                                size={16}
                                className={`transition-transform duration-300 lg:hidden ${openSection === title ? "rotate-180" : ""}`}
                            />
                        </button>

                        <ul
                            className={`flex flex-col gap-2.5 overflow-hidden transition-all duration-300 lg:max-h-none ${openSection === title ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0 lg:opacity-100"}`}
                        >
                            {items.map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-xs md:text-sm hover:text-white transition-all"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Contacts Strip */}
            <div className="max-w-7xl mx-auto mt-10 md:mt-16 pt-8 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="flex items-center gap-3 text-xs md:text-sm">
                    <Phone size={14} className="text-white/40" />
                    <span className="font-bold text-white">
                        +998 90 000 00 00
                    </span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm">
                    <MapPin size={14} className="text-white/40" />
                    <span>Tashkent, Uzbekistan</span>
                </div>
                <div className="flex items-center gap-3 text-xs md:text-sm">
                    <Mail size={14} className="text-white/40" />
                    <span>support@product.uz</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-8">
                <p className="text-[10px] md:text-[11px] font-medium tracking-wide order-2 md:order-1">
                    &copy; {new Date().getFullYear()} PRODUCT Store. All rights
                    reserved.
                </p>

                <div className="flex items-center gap-4 opacity-[0.2] hover:opacity-100 transition-opacity duration-500 order-1 md:order-2">
                    <p className="text-[9px] md:text-[10px] font-medium text-center md:text-right">
                        Crafted by{" "}
                        <span className="text-white font-bold uppercase tracking-widest">
                            Eldor Halikov
                        </span>
                        <br />
                        <span className="italic">
                            eldorabdukhalikov74@gmail.com
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
