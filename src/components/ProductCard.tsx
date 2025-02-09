
"use client";

import {useCart} from "@/context/cartContext";
import {StripeProductData} from "@/types/types";
import {getProductHref, getProductImg, getProductPrice} from "@/utils/stripeHelpers";
import {formatCurrency, notifyItemAddedToCart} from "@/utils/util";
import {ShoppingCart} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
    product: StripeProductData;
    className?: string;
}

export default function ProductCard({product, className}: ProductCardProps) {
    const {addItemToCart, cart, cartTotal} = useCart();
    

    const handleAddToCart = () => {
        addItemToCart({
            stripeData: product,
            quantity: 1,
        });

        notifyItemAddedToCart();


    };

    return (
        <div className={`group relative ${className}`}>
            {/* Image Container */}
            <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-100">
                <Link href={getProductHref(product)}>
                

                <Image
                    alt={product.name}
                        width={800}
                        height={800}
                    src={getProductImg(product)}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                </Link>

                {/* Shopping Cart Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent click from propagating to the Link
                        handleAddToCart();
                    }}
                    className="hidden z-50 sm:hover:bg-primaryRedHover sm:absolute sm:flex sm:flex-row sm:justify-center sm:items-center sm:gap-2 sm:bottom-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:bg-primaryRed sm:text-white sm:text-sm sm:font-medium sm:py-2 sm:px-4 sm:rounded sm:w-5/6 sm:opacity-0 group-hover:sm:opacity-100 sm:transition-opacity sm:duration-300"
                >
                    <ShoppingCart size={20} />
                    Add to cart
                </button>
            </div>

            {/* Product Info */}
            <div className="flex flex-row justify-between items-center">
                <div className="mt-4 flex flex-col gap-2">
                    <h3 className="text-lg text-gray-700 font-semibold">
                         {/* <span aria-hidden="true" className="absolute inset-0" /> */}

                            {product.name}
                    </h3>
                    <p className="text-md font-medium text-gray-900">
                        {getProductPrice(product)}
                    </p>
                </div>
            </div>
        </div>
    );
}
