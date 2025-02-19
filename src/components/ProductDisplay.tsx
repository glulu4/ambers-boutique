"use client"
import {CheckIcon, QuestionMarkCircleIcon, StarIcon} from '@heroicons/react/20/solid'
import {Radio, RadioGroup} from '@headlessui/react'
import {ShieldCheckIcon} from '@heroicons/react/24/outline'
import {cn} from '@/lib/utils'
import {StripeProductData} from '@/types/types'
import {getProductPrice, getProductType} from '@/utils/stripeHelpers'
import HeaderText from './text/HeaderText'
import SecondaryText from './text/SecondaryText'
import {useCart} from '@/context/cartContext'
import {notifyItemAddedToCart} from '@/utils/util'
import Image from 'next/image'
import Head from 'next/head'





export default function ProductDisplay({product}: {product: StripeProductData}) {
    const {addItemToCart, cart, cartTotal} = useCart();


    const handleAddToCart = () => {
        addItemToCart({
            stripeData: product,
            quantity: 1,
        });

        notifyItemAddedToCart();

    };

    return (
        <>
              <Head>
        <title>{product.name} - Amber&apos;s Jewelry Boutique | Vintage Jewelry</title>
        <meta
          name="description"
          content={`Discover ${product.name}, a unique and authentic vintage Chanel piece available at Amber's Jewelry Boutique. ${product.description}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: product.name,
              description: product.description,
              image: product.images[0],
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                price: getProductPrice(product),
                availability: "https://schema.org/InStock",
              },
              brand: {
                "@type": "Brand",
                name: "Amber's Jewelry Boutique",
              },
            }),
          }}
        />
      </Head>


            <div>
                <div className=" mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    {/* Product details */}
                    <div className="lg:max-w-lg lg:self-end">
                        <nav aria-label="Breadcrumb">
                            <ol role="list" className="flex items-center space-x-2">
                                <SecondaryText>{getProductType(product)}</SecondaryText>

                            </ol>
                        </nav>

                        <div className="mt-4">
                            <HeaderText size='large'>
                                {product.name}
                            </HeaderText>
                        </div>

                        <section aria-labelledby="information-heading" className="mt-4">
                            <h2 id="information-heading" className="sr-only">
                                Product information
                            </h2>

                            <div className="flex items-center">
                                <SecondaryText className="text-lg text-gray-900 sm:text-xl">{getProductPrice(product)}</SecondaryText>


                            </div>

                            <div className="mt-4 space-y-6">
                                <SecondaryText size='large' className="">{product.description}</SecondaryText>
                            </div>

                            <div className="mt-6 flex items-center">
                                <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-green-500" />
                                <SecondaryText className="ml-2 ">In stock and ready to ship</SecondaryText>
                            </div>
                        </section>
                    </div>

                    {/* Product image */}
                    <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
                        <Image
                            width={500}
                            height={500}
                            alt={`Image of ${product.name}| Amber's Jewelry Boutique | Vintage Jewelry`}
                            src={product.images[0]}
                            className="aspect-square w-full rounded-lg object-cover" />
                    </div>

                    {/* Product form */}
                    <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
                        <section aria-labelledby="options-heading">
                            <h2 id="options-heading" className="sr-only">
                                Product options
                            </h2>

                            <form>

        
                                <div className="mt-10">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent click from propagating to the Link
                                            handleAddToCart();
                                        }}
                                        type="button"
                                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-primaryRed px-8 py-3 text-base font-medium text-white hover:bg-primaryRedHover focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                    >
                                        Add to cart
                                    </button>
                                </div>

                            </form>
                        </section>
                    </div>
                </div>
            </div>

        
        </>
    )
}
