"use client"
import React, {useEffect} from "react";
import Link from "next/link";
import HeaderText from "@/components/text/HeaderText";
import SecondaryText from "@/components/text/SecondaryText";
import {Gem} from "lucide-react";
import {useCart} from "@/context/cartContext";

export default function SuccessPage() {


    const {clearCart} = useCart();


    useEffect(() => {
        clearCart();
    }, [])
    return (
        <div className="flex flex-col min-h-screen">
            {/* Main Content */}
            <main className="flex-grow flex items-start pt-20 justify-center">
                <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-lg w-full">
                    {/* Success Icon */}
                    <div className="flex items-center justify-center bg-primaryRed rounded-full h-24 w-24 mx-auto mb-6">
                        <Gem size={50} color="white"/>
                    </div>

                    {/* Success Message */}
                    <HeaderText size="large" className="mb-4 text-primaryRed">
                        Thank You!
                    </HeaderText>
                    <SecondaryText size="medium" className="mb-6 text-gray-600">
                        Your order has been successfully placed. You will receive an email
                        confirmation shortly.
                    </SecondaryText>

                    {/* Back to Home Button */}
                    <Link href="/">
                        <button className="inline-block font-body bg-primaryRed text-white px-6 py-3 rounded-lg text-sm font-medium shadow-md hover:bg-primaryRedHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryRed">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </main>


        </div>
    );
}
