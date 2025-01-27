"use client"
import HeaderText from '@/components/text/HeaderText'
import SecondaryText from '@/components/text/SecondaryText'
import {useCart} from '@/context/cartContext'
import {LineItem, shipping, StripePaymentLinkResponseObj} from '@/types/types'
import {createPaymentLink, getProductHref, getProductImg, getProductPrice} from '@/utils/stripeHelpers'
import {formatCurrency, formatPrice} from '@/utils/util'
import {ChevronDownIcon} from '@heroicons/react/16/solid'
import {CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon} from '@heroicons/react/20/solid'
import Head from 'next/head'
import Image from 'next/image'
import {useRouter} from "next/navigation";
import toast from 'react-hot-toast'

export default function Page() {

    const {addItemToCart, cart, updateItemQuantity, removeItemFromCart, getCartPrice, getLineItems} = useCart();


    const subtotal = getCartPrice();
    const total = subtotal + shipping.decimal;

    async function fetchPaymentLink() {
        try {
            const items: LineItem[] = getLineItems();
            console.log("calling api with :", items);

            const response = await fetch("/api/get-link", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items,
                    successUrl: `${window.location.origin}/success`, // Redirect after payment success
                    cancelUrl: window.location.href,
                }),

            });

            console.log("response: ", response);
            

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch payment link");
            }

            const data = await response.json();

            // Access the URL from the response data structure
            const paymentUrl = data.url;
            return paymentUrl;

        } catch (error) {
            console.log("Error: ", error);
            throw error;
        }
    }

    async function goToCheckout() {
        try {

            if (cart.length === 0){
                toast.error("Cart is empty!")
                return;
            }
            
            const paymentUrl = await fetchPaymentLink();
            if (paymentUrl) {                
                window.open(paymentUrl, "_self");
            } else {
                alert("There was an error during checkout");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("There was an error during checkout");
        }
    }

    return (
        <div className="">
            <Head>
                <title>Shopping Cart - Amber&apos;s Boutique</title>
                <meta name="description" content="Review the items in your shopping cart and proceed to checkout at Amber's Boutique. Discover our unique and authentic vintage Chanel jewelry collection." />
                <meta property="og:title" content="Shopping Cart - Amber's Boutique" />
                <meta property="og:description" content="Review the items in your shopping cart and proceed to checkout at Amber's Boutique. Discover our unique and authentic vintage Chanel jewelry collection." />
            </Head>
            <div className="pt-20">
                <HeaderText size='large' className="">
                    Shopping Cart
                </HeaderText>
                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>

                        <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                            {cart.map((cartItem, productIdx) => (
                                <li key={productIdx} className="flex py-6 sm:py-10">
                                    <div className="shrink-0">
                                        <Image
                                            alt="Chanel Button Jewelry"
                                            src={getProductImg(cartItem.stripeData)}
                                            className="size-24 rounded-md object-cover sm:size-48"
                                            width={100}
                                            height={100}
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                            <div>
                                                <div className="flex justify-between">
                                                    <SecondaryText>
                                                        <a href={getProductHref(cartItem.stripeData)} className="font-medium text-gray-700 hover:text-gray-800">

                                                            {cartItem.stripeData.name}
                                                        </a>
                                                    </SecondaryText>
                                                </div>
                                                {/* <div className="mt-1 flex text-sm">
                                                    <p className="text-gray-500">{product.color}</p>
                                                    {product.size ? (
                                                        <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>
                                                    ) : null}
                                                </div> */}
                                                <SecondaryText size='small' >{getProductPrice(cartItem.stripeData)}</SecondaryText>
                                            </div>

                                            <div className="mt-4 sm:mt-0 sm:pr-9">
                                                <div className="grid w-full max-w-16 grid-cols-1">
                                                    <select
                                                        value={cartItem.quantity}
                                                        onChange={(event) => {
                                                            const newQnty:string = event.target.value;
                                                            updateItemQuantity(cartItem.stripeData.id, Number(newQnty))

                                                        }}
                                                        name={`quantity-${productIdx}`}
                                                        aria-label={`Quantity, ${cartItem.stripeData.name}`}
                                                        className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    >
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                        <option value={3}>3</option>
                                                        <option value={4}>4</option>
                                                        <option value={5}>5</option>
                                                        <option value={6}>6</option>
                                                        <option value={7}>7</option>
                                                        <option value={8}>8</option>
                                                    </select>
                                                    <ChevronDownIcon
                                                        aria-hidden="true"
                                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                    />
                                                </div>

                                                <div className="absolute right-0 top-0">
                                                    <button 
                                                        onClick={() => removeItemFromCart(cartItem.stripeData.id)}
                                                    type="button" 
                                                    className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                                                    >
                                                        <span className="sr-only">Remove</span>
                                                        <XMarkIcon aria-hidden="true" className="size-6" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                                            {true ? (
                                                <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-green-500" />
                                            ) : (
                                                <ClockIcon aria-hidden="true" className="size-5 shrink-0 text-gray-300" />
                                            )}

                                            <span>In Stock</span>
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Order summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                    >
                        <HeaderText size='small' id="summary-heading">
                            Order summary
                        </HeaderText>

                        <dl className="mt-6 space-y-4">
                            <div className="flex md:text-md text-lg items-center justify-between">
                                <dt className=" text-gray-600 font-body">Subtotal</dt>
                                <dd className=" font-body font-medium text-gray-900">{formatPrice(subtotal)}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex md:text-md text-lg items-center text-gray-600">
                                    <span className=" text-gray-600 font-body">Shipping estimate</span>
                                    <a href="#" className="ml-2 shrink-0 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Learn more about how shipping is calculated</span>
                                        <QuestionMarkCircleIcon aria-hidden="true" className="size-5" />
                                    </a>
                                </dt>
                                <dd className="md:text-md text-lg font-body font-medium text-gray-900">{shipping.display}</dd>
                            </div>

                            {/* INSERT TAX STUFF HERE */}

                            {/* <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex text-sm text-gray-600">
                                    <span>Tax estimate</span>
                                    <a href="#" className="ml-2 shrink-0 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Learn more about how tax is calculated</span>
                                        <QuestionMarkCircleIcon aria-hidden="true" className="size-5" />
                                    </a>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">$8.32</dd>
                            </div> */}
                            <div className="flex md:text-md text-lg font-body items-center justify-between border-t border-gray-200 pt-4">
                                <dt className=" font-medium text-gray-900">Order total</dt>
                                <dd className=" font-medium text-gray-900">{formatPrice(total)}</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <button
                                onClick={(e) => {
                                    goToCheckout(); // Trigger the checkout function
                                }}
                                type="button"
                                className="w-full rounded-md border border-transparent bg-primaryRed px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primaryRedHover focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                                Checkout
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
