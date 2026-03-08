"use client";

import { useCartStore } from "@/app/store/use-cart-store";
import { useState } from "react";

export default function CheckoutPage() {
    const { cart } = useCartStore();
    const [paymentMethod, setPaymentMethod] = useState("card");

    const totalPrice = cart.reduce(
        (acc, item) => acc + Number(item.price) * item.quantity,
        0,
    );

    return (
        <div className="max-w-4xl mx-auto px-10 py-16">
            <h1 className="text-4xl font-black mb-10">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col gap-6">
                    <h2 className="text-xl font-bold">Delivery Information</h2>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-4 bg-gray-50 rounded-xl outline-none border border-transparent focus:border-black"
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="w-full p-4 bg-gray-50 rounded-xl outline-none border border-transparent focus:border-black"
                    />
                    <textarea
                        placeholder="Delivery Address"
                        className="w-full p-4 bg-gray-50 rounded-xl outline-none border border-transparent focus:border-black h-32"
                    />
                </div>

                <div className="flex flex-col gap-6">
                    <h2 className="text-xl font-bold">Payment Method</h2>
                    <div className="flex flex-col gap-3">
                        {["Card (Click/Payme)", "Cash on delivery"].map(
                            (method) => (
                                <label
                                    key={method}
                                    className="flex items-center gap-4 p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-all"
                                >
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === method}
                                        onChange={() =>
                                            setPaymentMethod(method)
                                        }
                                        className="w-5 h-5 accent-black"
                                    />
                                    <span className="font-medium">
                                        {method}
                                    </span>
                                </label>
                            ),
                        )}
                    </div>

                    <div className="mt-6 p-6 bg-black text-white rounded-[32px]">
                        <div className="flex justify-between mb-4">
                            <span>Total to pay:</span>
                            <span className="font-bold text-xl">
                                {totalPrice.toLocaleString()} $
                            </span>
                        </div>
                        <button className="w-full bg-[#F5A623] text-black py-4 rounded-2xl font-bold hover:opacity-90 transition-all">
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
