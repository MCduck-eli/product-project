"use client";

import Link from "next/link";
import { ArrowRight, RefreshCw, PenTool } from "lucide-react";

export default function Banners() {
    return (
        <section className="px-4 md:px-10 pb-10 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Trade-in Banner */}
                <Link href="/coming-soon" className="group">
                    <div className="rounded-[32px] p-8 md:p-10 flex flex-col justify-end min-h-[220px] md:min-h-[260px] relative overflow-hidden bg-gradient-to-br from-[#000] via-[#111] to-[#1a1a2e] transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/20 active:scale-[0.98]">
                        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 group-hover:rotate-12 transition-all duration-700 pointer-events-none">
                            <RefreshCw size={240} className="text-white" />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 italic uppercase tracking-tighter">
                                Trade-in <br /> Program
                            </h3>
                            <p className="text-sm text-gray-400 mb-6 max-w-[240px] font-medium leading-relaxed">
                                Trade in your old device and get up to 50% off
                                on new arrivals.
                            </p>
                            <div className="flex items-center gap-2 text-[#F5A623] text-sm font-black uppercase tracking-widest">
                                Find out more{" "}
                                <ArrowRight
                                    size={18}
                                    className="group-hover:translate-x-2 transition-transform"
                                />
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Service Center Banner */}
                <Link href="/coming-soon" className="group">
                    <div className="rounded-[32px] p-8 md:p-10 flex flex-col justify-end min-h-[220px] md:min-h-[260px] relative overflow-hidden bg-white border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:border-transparent active:scale-[0.98]">
                        <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 opacity-[0.03] group-hover:opacity-[0.06] group-hover:-rotate-12 transition-all duration-700 pointer-events-none">
                            <PenTool size={240} className="text-black" />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-black text-black mb-2 italic uppercase tracking-tighter">
                                Service <br /> Center
                            </h3>
                            <p className="text-sm text-gray-500 mb-6 max-w-[240px] font-medium leading-relaxed">
                                Official Apple and Samsung repairs with a 1-year
                                warranty.
                            </p>
                            <div className="flex items-center gap-2 text-black text-sm font-black uppercase tracking-widest">
                                Sign up{" "}
                                <ArrowRight
                                    size={18}
                                    className="group-hover:translate-x-2 transition-transform"
                                />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    );
}
