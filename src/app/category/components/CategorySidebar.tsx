"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function CategorySidebar() {
    const [price, setPrice] = useState(178490);

    return (
        <aside className="w-72 sticky top-24 h-fit bg-gray-50/50 border border-gray-100 rounded-[32px] p-6">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center cursor-pointer group">
                        <h3 className="font-bold text-[15px] group-hover:text-blue-600 transition-colors">
                            Only in stock
                        </h3>
                        <ChevronDown size={18} className="text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-gray-100/50 shadow-sm">
                        <span className="text-[13px] text-gray-600">
                            In stock
                            <span className="text-gray-300 ml-1 text-[11px]">
                                [109]
                            </span>
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
                        </label>
                    </div>
                </div>

                <div className="h-[1px] bg-gray-100 w-full" />
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center cursor-pointer group">
                        <h3 className="font-bold text-[15px] group-hover:text-blue-600 transition-colors">
                            Availability in stores
                        </h3>
                        <ChevronDown size={18} className="text-gray-400" />
                    </div>
                </div>

                <div className="h-[1px] bg-gray-100 w-full" />
                <div className="flex flex-col gap-5">
                    <div className="flex justify-between items-center cursor-pointer group">
                        <h3 className="font-bold text-[15px] group-hover:text-blue-600 transition-colors">
                            Price
                        </h3>
                        <ChevronUp size={18} className="text-gray-400" />
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1 bg-white border border-gray-100 rounded-2xl px-3 py-2 shadow-sm">
                            <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">
                                From
                            </span>
                            <input
                                type="text"
                                defaultValue="12 090"
                                className="w-full outline-none text-[13px] font-bold bg-transparent"
                            />
                        </div>
                        <div className="flex-1 bg-white border border-gray-100 rounded-2xl px-3 py-2 shadow-sm">
                            <span className="text-[9px] text-gray-400 uppercase font-bold block mb-0.5">
                                To
                            </span>
                            <input
                                type="text"
                                value={price.toLocaleString()}
                                readOnly
                                className="w-full outline-none text-[13px] font-bold bg-transparent"
                            />
                        </div>
                    </div>

                    <div className="px-1">
                        <input
                            type="range"
                            min="12090"
                            max="300000"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                        />
                    </div>

                    <button className="w-full py-4 bg-white border border-gray-100 rounded-2xl font-bold text-[13px] hover:bg-black hover:text-white transition-all shadow-sm active:scale-95 mt-2">
                        Reset filters
                    </button>
                </div>
            </div>
        </aside>
    );
}
