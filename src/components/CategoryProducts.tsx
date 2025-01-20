import {StripeProductData} from '@/types/types';
import React from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';
import HeaderText from './text/HeaderText';
import SecondaryText from './text/SecondaryText';
import {capitalizeFirstLetter} from '@/utils/util';

const CategoryProducts = ({
    productsByCategory,
}: {
    productsByCategory: Record<string, StripeProductData[]>
}) => {


    return (
        <div className="space-y-20 ">
            {Object.entries(productsByCategory).map(([category, products]) => (
                <div key={category} className="space-y-6">
                    <div className="flex items-center justify-between">
                        <HeaderText className="">{capitalizeFirstLetter(category)}</HeaderText>

                        <Link
                            href={`/${encodeURIComponent(category)}`}
                        >
                            <SecondaryText size='small' className="text-xs sm:text-lg font-medium text-primaryRed hover:text-primaryRedHover md:block">
                                Shop the collection
                                <span aria-hidden="true"> &rarr;</span>

                            </SecondaryText>
                        </Link>

                    </div>

                    {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div> */}

                    <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
                        {products.map((product) => (
                            <div className="flex-none w-[280px] md:w-auto" key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryProducts;

