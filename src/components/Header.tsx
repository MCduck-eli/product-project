"use client";

import {
    Menu,
    Search,
    X,
    Heart,
    ShoppingBasket,
    Scale,
    User,
    Settings,
    LogOut,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import HeroSection from "./typewritter";
import MegaMenu from "./MegaMenu";
import AuthModal from "./AuthModal";
import { supabase } from "../../lib/supabase";
import { useCartStore } from "@/app/store/use-cart-store";
import { useFavoriteStore } from "@/app/store/use-favorite-store";

function ActionIcon({
    label,
    children,
    onClick,
}: {
    label: string;
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="flex flex-col items-center gap-1 cursor-pointer text-[#111] group"
        >
            <div className="w-[20px] h-[20px] md:w-[22px] md:h-[22px]">
                {children}
            </div>
            <span className="text-[10px] md:text-[11px] text-gray-400 group-hover:text-[#111] transition-colors">
                {label}
            </span>
        </div>
    );
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSearchMobileOpen, setIsSearchMobileOpen] = useState(false);
    const [value, setValue] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    const totalItems = useCartStore((state) => state.totalItems());
    const favoritesCount = useFavoriteStore((state) => state.favorites.length);

    const ADMIN_EMAIL = "eldorabdukhalikov74@gmail.com";

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (value.trim().length > 1) {
                const { data } = await supabase
                    .from("products")
                    .select("*")
                    .ilike("name", `%${value}%`)
                    .limit(5);
                if (data) setSearchResults(data);
            } else {
                setSearchResults([]);
            }
        };

        const debounceTimer = setTimeout(fetchSearchResults, 300);
        return () => clearTimeout(debounceTimer);
    }, [value]);

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        checkUser();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            },
        );

        const handleClickOutside = (event: MouseEvent) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target as Node)
            ) {
                setIsUserMenuOpen(false);
            }
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setSearchResults([]);
                if (!value) setIsSearchMobileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            authListener.subscription.unsubscribe();
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [value]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsUserMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-4 md:px-10 py-3 md:py-3.5 gap-2 md:gap-5">
                {/* Logo */}
                <Link href="/" className="shrink-0">
                    <h1 className="text-base md:text-lg font-semibold">
                        <span className="px-1.5 md:px-2 py-1 bg-black text-white rounded-[6px] md:rounded-[8px] font-bold">
                            PRO
                        </span>
                        DUCT
                    </h1>
                </Link>

                {/* Catalog Button - Hidden on small mobile */}
                <div className="hidden sm:block">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center gap-2 bg-[#111] text-white px-3 md:px-5 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold hover:bg-[#333] transition-colors"
                    >
                        {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        <span className="hidden md:inline">Catalog</span>
                    </button>
                </div>

                {/* Search Bar */}
                <div
                    ref={searchRef}
                    className={`flex-1 md:flex items-center border relative border-gray-200 rounded-xl px-3 md:px-4 py-2 md:py-2.5 gap-2 bg-white ${isSearchMobileOpen ? "absolute inset-x-4 top-14 z-[100]" : "hidden md:flex"}`}
                >
                    {!value && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs md:text-sm text-gray-400 pointer-events-none">
                            <HeroSection />
                        </div>
                    )}
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onFocus={() => setIsSearchMobileOpen(true)}
                        className="outline-none w-full text-xs md:text-sm text-[#111] bg-transparent"
                    />
                    <Search className="text-neutral-400 shrink-0" size={18} />

                    {searchResults.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[101] overflow-hidden">
                            {searchResults.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.id}`}
                                    onClick={() => {
                                        setValue("");
                                        setSearchResults([]);
                                        setIsSearchMobileOpen(false);
                                    }}
                                    className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b last:border-none"
                                >
                                    <img
                                        src={product.image_url}
                                        alt=""
                                        className="w-10 h-10 object-contain shrink-0"
                                    />
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-xs md:text-sm font-bold truncate">
                                            {product.name}
                                        </span>
                                        <span className="text-[10px] md:text-xs text-gray-500">
                                            {product.price.toLocaleString()} $
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Action Icons */}
                <div className="flex gap-3 md:gap-7 items-center shrink-0">
                    <button
                        className="md:hidden p-2"
                        onClick={() =>
                            setIsSearchMobileOpen(!isSearchMobileOpen)
                        }
                    >
                        <Search size={22} />
                    </button>

                    <Link href="/coming-soon" className="hidden sm:block">
                        <ActionIcon label="Compare">
                            <Scale strokeWidth={1.5} />
                        </ActionIcon>
                    </Link>

                    <Link href="/favorites">
                        <ActionIcon label="Favs">
                            <div className="relative">
                                <Heart
                                    strokeWidth={1.5}
                                    className={
                                        favoritesCount > 0
                                            ? "fill-red-500 text-red-500"
                                            : ""
                                    }
                                />
                                {favoritesCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                                        {favoritesCount}
                                    </span>
                                )}
                            </div>
                        </ActionIcon>
                    </Link>

                    <Link href="/cart">
                        <ActionIcon label="Cart">
                            <div className="relative">
                                <ShoppingBasket strokeWidth={1.5} />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                        </ActionIcon>
                    </Link>

                    {user ? (
                        <div className="relative" ref={userMenuRef}>
                            <div
                                onClick={() =>
                                    setIsUserMenuOpen(!isUserMenuOpen)
                                }
                                className="w-8 h-8 md:w-9 md:h-9 bg-black text-white rounded-full flex items-center justify-center font-bold text-xs md:text-sm cursor-pointer border border-gray-200"
                            >
                                {user.email?.charAt(0).toUpperCase()}
                            </div>
                            {isUserMenuOpen && (
                                <div className="absolute right-0 top-full mt-2 w-40 md:w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-[110]">
                                    <div className="p-3 border-b text-[10px] text-gray-400 truncate">
                                        {user.email}
                                    </div>
                                    {user.email === ADMIN_EMAIL && (
                                        <Link
                                            href="/admin"
                                            className="flex items-center gap-2 p-3 text-sm hover:bg-gray-50"
                                        >
                                            <Settings size={16} /> Admin
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 p-3 text-red-500 hover:bg-red-50 text-sm rounded-b-xl"
                                    >
                                        <LogOut size={16} /> Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <ActionIcon
                            label="Login"
                            onClick={() => setIsAuthModalOpen(true)}
                        >
                            <User strokeWidth={1.5} />
                        </ActionIcon>
                    )}
                </div>
            </div>

            {isMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 top-[57px] md:top-[73px] bg-black/20"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <div className="absolute top-full left-0 right-0 z-50 bg-white shadow-xl max-h-[80vh] overflow-y-auto">
                        <MegaMenu onClose={() => setIsMenuOpen(false)} />
                    </div>
                </>
            )}

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </header>
    );
}
