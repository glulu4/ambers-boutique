import {StripeProductData} from '@/types/types';
import React from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';
import HeaderText from './text/HeaderText';
import SecondaryText from './text/SecondaryText';
import {capitalizeFirstLetter} from '@/utils/util';


export const revalidate = 300; // Revalidate every 5 min


const CategoryProducts = ({
    productsByCategory,
}: {
    productsByCategory: Record<string, StripeProductData[]>
}) => {


    return (
        <div className="space-y-20 pt-6 sm:pt-24 md:pt-32 lg:pt-40 ">
            <HeaderText size='large' className='pb-10'>
                Shop Our Products
            </HeaderText>
            {Object.entries(productsByCategory).map(([category, products]) => (
                <div key={category} className="space-y-6">
                    <div className="flex items-center justify-between">
                        <HeaderText className="">{capitalizeFirstLetter(category)}s</HeaderText>

                        <Link
                            href={`/${encodeURIComponent(category)}`}
                        >
                            <SecondaryText size='small' className="text-xs sm:text-lg font-medium text-primaryRed hover:text-primaryRedHover md:block">
                                Shop the collection
                                <span aria-hidden="true"> &rarr;</span>

                            </SecondaryText>
                        </Link>

                    </div>

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

