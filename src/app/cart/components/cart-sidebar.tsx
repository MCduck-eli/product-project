"use client";

import { useCartStore } from "@/app/store/use-cart-store";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
    const { cart } = useCartStore();
    const router = useRouter();

    const totalPrice = cart.reduce(
        (acc, item) => acc + Number(item.price) * item.quantity,
        0,
    );

    const handleCheckout = () => {
        if (cart.length > 0) {
            router.push("/checkout");
        }
    };

    return (
        <aside className="w-full lg:w-[400px] h-fit bg-white border border-gray-100 rounded-[32px] p-8 sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order details</h2>

            <div className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between items-end">
                    <span className="text-gray-400 text-sm">
                        {cart.length} goods worth
                    </span>
                    <span className="font-bold">
                        {totalPrice.toLocaleString()} $
                    </span>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-black">
                        {totalPrice.toLocaleString()} $
                    </span>
                </div>

                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Promo code"
                        className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 outline-none text-sm"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <button
                    onClick={handleCheckout}
                    className="w-full bg-black text-white py-5 rounded-2xl font-bold hover:bg-zinc-800 transition-all active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    disabled={cart.length === 0}
                >
                    Proceed to checkout
                </button>
                <button className="w-full bg-gray-100 text-black py-5 rounded-2xl font-bold hover:bg-gray-200 transition-all">
                    By installments or on credit
                </button>
            </div>
        </aside>
    );
}
