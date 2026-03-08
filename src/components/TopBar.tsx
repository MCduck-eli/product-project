"use client";

import {
    Globe2,
    LocateIcon,
    MessageSquare,
    PhoneCall,
    ChevronDown,
} from "lucide-react";
import Link from "next/link";

export default function TopBar() {
    return (
        <div className="bg-[#111] text-[#ccc] text-[10px] md:text-xs flex justify-between items-center px-4 md:px-10 py-2 md:py-1.5 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div className="flex items-center gap-3 md:gap-4 shrink-0">
                <div className="flex items-center gap-1.5">
                    <LocateIcon size={14} className="md:w-4 md:h-4" />
                    Tashkent
                </div>
                <span className="text-[#444] hidden md:block">|</span>
                <a
                    href="#"
                    className="text-[#ccc] hover:text-white transition-colors hidden sm:block"
                >
                    Store
                </a>
            </div>

            <div className="flex items-center gap-4 md:gap-5 shrink-0">
                <a
                    href="#"
                    className="text-[#ccc] hover:text-white transition-colors flex items-center gap-1"
                >
                    Buyer <ChevronDown size={12} className="md:w-3 md:h-3" />
                </a>
                <a
                    href="#"
                    className="text-[#ccc] hover:text-white transition-colors hidden md:block"
                >
                    Trade-in
                </a>
                <a
                    href="#"
                    className="text-[#ccc] hover:text-white transition-colors hidden lg:block"
                >
                    Service center
                </a>

                <div className="flex items-center gap-2.5 md:gap-3 border-l border-[#333] pl-4 md:border-none md:pl-0">
                    <Globe2
                        size={14}
                        className="md:w-4 md:h-4 cursor-pointer hover:text-white"
                    />
                    <MessageSquare
                        size={14}
                        className="md:w-4 md:h-4 cursor-pointer hover:text-white"
                    />
                    <PhoneCall
                        size={14}
                        className="md:w-4 md:h-4 cursor-pointer hover:text-white md:hidden"
                    />
                </div>

                <Link
                    href={"tel:+9980000000"}
                    className="font-bold text-white hidden sm:block"
                >
                    +9980000000
                </Link>
            </div>
        </div>
    );
}
