"use client";

import {useCart} from "@/context/cartContext";
import {StripeProductData} from "@/types/types";
import {getProductHref, getProductImg, getProductPrice} from "@/utils/stripeHelpers";
import {notifyCartUpdate} from "@/components/CartToast";
import {ShoppingBag} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";

interface ProductCardProps {
    product: StripeProductData;
    className?: string;
}

export default function ProductCard({product, className}: ProductCardProps) {
    const {addItemToCart} = useCart();
    const [imgLoaded, setImgLoaded] = useState(false);

    const handleAddToCart = () => {
        notifyCartUpdate(product, addItemToCart(product));
    };

    return (
        <div className={`group ${className ?? ""}`}>
            {/* Image container */}
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 ring-1 ring-black/5 shadow-sm transition-shadow duration-300 group-hover:shadow-md">

                {/* Skeleton shimmer while loading */}
                {!imgLoaded && (
                    <div className="absolute inset-0 skeleton-shimmer" />
                )}

                <Link href={getProductHref(product)}>
                    <Image
                        alt={product.name}
                        width={800}
                        height={800}
                        src={getProductImg(product)}
                        onLoad={() => setImgLoaded(true)}
                        className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
                            imgLoaded ? "opacity-100" : "opacity-0"
                        }`}
                    />
                </Link>

                {/* Add to cart — desktop slide-up ghost button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart();
                    }}
                    className="absolute bottom-3 left-1/2 hidden w-[85%] -translate-x-1/2 translate-y-2 items-center justify-center gap-2 bg-white/90 px-4 py-2.5 font-body text-[10px] font-medium uppercase tracking-[0.25em] text-neutral-900 opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-neutral-900 hover:text-white sm:flex group-hover:translate-y-0 group-hover:opacity-100"
                >
                    <ShoppingBag size={13} strokeWidth={1.5} />
                    Add to cart
                </button>
            </div>

            {/* Product info */}
            <div className="mt-3 flex flex-col gap-0.5">
                <p className="line-clamp-2 font-body text-sm font-semibold leading-snug text-gray-800 sm:text-base">
                    {product.name}
                </p>
                <p className="font-body text-sm font-medium text-primaryRed">
                    {getProductPrice(product)}
                </p>
            </div>

            {/* Add to cart — mobile always-visible button */}
            <button
                onClick={handleAddToCart}
                className="mt-2 flex w-full items-center justify-center gap-2 border border-neutral-300 bg-white px-4 py-2.5 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-900 transition-all duration-150 active:scale-[0.97] active:bg-neutral-900 active:text-white sm:hidden"
            >
                <ShoppingBag size={12} strokeWidth={1.5} />
                Add to cart
            </button>
        </div>
    );
}
