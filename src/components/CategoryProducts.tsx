import {StripeProductData} from "@/types/types";
import React from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import HeaderText from "./text/HeaderText";
import {capitalizeFirstLetter} from "@/utils/util";
import AnimatedSection from "./AnimatedSection";

const CategoryProducts = ({
    productsByCategory,
}: {
    productsByCategory: Record<string, StripeProductData[]>;
}) => {
    return (
        <div className="space-y-20 pt-6 sm:pt-24 md:pt-32 lg:pt-40">
            {/* Section header */}
            <div>
                <p className="font-accent text-xl text-primaryRed mb-2">Our Collection</p>
                <HeaderText size="large">Shop Our Products</HeaderText>
                <div className="mt-4 h-px w-14 bg-primaryRed" />
            </div>

            {Object.entries(productsByCategory).map(([category, products], index) => (
                <AnimatedSection key={category} delay={index * 80}>
                    <div className="space-y-6">
                        {/* Category header */}
                        <div className="flex items-center justify-between">
                            <HeaderText>{capitalizeFirstLetter(category)}s</HeaderText>
                            <Link
                                href={`/${encodeURIComponent(category)}`}
                                className="group flex items-center gap-1 font-body text-xs font-medium text-primaryRed transition-colors duration-200 hover:text-primaryRedHover sm:text-base"
                            >
                                Shop the collection
                                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>
                        </div>

                        {/* Product grid */}
                        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
                            {products.map((product) => (
                                <div className="flex-none w-[260px] md:w-auto" key={product.id}>
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
};

export default CategoryProducts;
