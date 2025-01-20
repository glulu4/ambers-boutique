import {StripePrice, StripeProductData} from "@/types/types";
import {formatCurrency} from "@/utils/util";
import {ShoppingCart} from "lucide-react";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
    product: StripeProductData;
    className?:string;
}

export default function ProductCard({product, className}: ProductCardProps) {


    return (
        <div className={`group relative ${className}`}>
            {/* Image Container */}
            <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-200">
                    <img
                        alt={product.name}
                        src={product.images[0]}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                {/* Shopping Cart Button */}
                    <button
                    
                    className="hidden sm:absolute sm:flex sm:flex-row sm:justify-center sm:items-center sm:gap-2 sm:bottom-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:bg-primaryRed sm:text-white sm:text-sm sm:font-medium sm:py-2 sm:px-4 sm:rounded sm:w-5/6 sm:opacity-0 group-hover:sm:opacity-100 sm:transition-opacity sm:duration-300"
                    >
                    
                        <ShoppingCart size={20} />
                    Add to cart
                    </button>
            </div>

            {/* Product Info */}
            <div className="flex flex-row justify-between items-center">
                <div className="mt-4 flex justify-between flex-col gap-2">
                    <div>
                        <h3 className="text-lg text-gray-700 font-semibold">
                            <Link href={`/${product.metadata.type}/${product.id}`}>
                                <span aria-hidden="true" className="absolute inset-0" />
                                {product.name}
                            </Link>
                        </h3>
                    </div>
                    <p className="text-md font-medium text-gray-900">
                        {formatCurrency(product.default_price)}
                    </p>
                </div>

            </div>

        </div>
    );
}
