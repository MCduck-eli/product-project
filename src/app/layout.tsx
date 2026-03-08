import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "PRO-duct — Official store Apple и Samsung",
    description: "Buy iPhone, MacBook, Apple Watch in Tashkent",
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
