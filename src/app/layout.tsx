import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "CM Store — Официальный магазин Apple и Samsung",
    description: "Купить iPhone, MacBook, Apple Watch в Краснодаре",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
            <body className="font-manrope bg-white text-[#111]">
                <TopBar />
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
