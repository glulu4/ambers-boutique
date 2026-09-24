"use client"
import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {useCart} from '@/context/cartContext'
import {LineItem, shipping} from '@/types/types'
import {getProductHref, getProductImg, getProductPrice, getProductType} from '@/utils/stripeHelpers'
import {formatPrice} from '@/utils/util'

const CHECKOUT_ERROR = "We couldn't start checkout. Please try again.";

export default function Page() {

    const {cart, isLoading, removeItemFromCart, getCartPrice, getLineItems} = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutError, setCheckoutError] = useState("");

    const subtotal = getCartPrice();
    const total = subtotal + shipping.decimal;

    async function fetchPaymentLink(): Promise<string> {
        const items: LineItem[] = getLineItems();

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

        const data = await response.json();
        if (!response.ok || !data.url) {
            throw new Error(data.error || "Failed to fetch payment link");
        }
        return data.url;
    }

    async function goToCheckout() {
        setCheckoutError("");
        setIsCheckingOut(true);
        try {
            const paymentUrl = await fetchPaymentLink();
            window.location.assign(paymentUrl);
        } catch (error) {
            console.error("Checkout error:", error);
            setCheckoutError(CHECKOUT_ERROR);
            setIsCheckingOut(false);
        }
    }

    return (
        <div className="pb-10 pt-8 sm:pt-12">
            <p className="font-accent text-2xl text-primaryRed">Your selection</p>
            <h1 className="mt-1 font-heading text-5xl font-semibold leading-tight text-neutral-900 sm:text-6xl">
                Shopping Cart
            </h1>

            {/* Wait for the saved cart to load so the empty state doesn't flash */}
            {isLoading ? null : cart.length === 0 ? (
                <div className="mt-12 border-t border-neutral-200 pt-12 animate-fade-in-up">
                    <p className="font-heading text-3xl text-neutral-900">Your cart is empty.</p>
                    <p className="mt-3 max-w-md font-body text-neutral-600">
                        Every piece is one of a kind. Find yours before someone else does.
                    </p>
                    <Link
                        href="/all-products"
                        className="group mt-8 inline-flex items-center gap-3 bg-neutral-900 px-10 py-4 font-body text-xs font-medium uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:bg-primaryRed"
                    >
                        Shop vintage jewelry
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                </div>
            ) : (
                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-16">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>

                        <ul role="list" className="divide-y divide-neutral-200 border-y border-neutral-200">
                            {cart.map((cartItem) => {
                                const product = cartItem.stripeData;
                                return (
                                    <li key={product.id} className="flex gap-5 py-6 sm:gap-8 sm:py-8 animate-fade-in-up">
                                        <Link href={getProductHref(product)} className="relative size-28 shrink-0 overflow-hidden bg-neutral-100 sm:size-40">
                                            <Image
                                                alt={product.name}
                                                src={getProductImg(product)}
                                                fill
                                                sizes="(min-width: 640px) 160px, 112px"
                                                className="object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                        </Link>

                                        <div className="flex min-w-0 flex-1 flex-col">
                                            <p className="font-body text-[10px] font-medium uppercase tracking-[0.25em] text-neutral-500">
                                                {getProductType(product)}
                                            </p>
                                            <Link
                                                href={getProductHref(product)}
                                                className="mt-1 font-secHeading text-lg leading-snug text-neutral-900 transition-colors hover:text-primaryRed sm:text-xl"
                                            >
                                                {product.name}
                                            </Link>
                                            <p className="mt-1 font-body text-neutral-600">{getProductPrice(product)}</p>

                                            <div className="mt-auto flex items-center justify-between pt-4">
                                                <p className="font-accent text-lg text-primaryRed">One of a kind</p>
                                                <button
                                                    onClick={() => removeItemFromCart(product.id)}
                                                    type="button"
                                                    className="font-body text-[10px] font-medium uppercase tracking-[0.25em] text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-primaryRed hover:decoration-primaryRed"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>

                    {/* Order summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-12 bg-cream px-6 py-8 sm:px-8 lg:col-span-5 lg:mt-0"
                    >
                        <h2 id="summary-heading" className="font-heading text-3xl text-neutral-900">
                            Order summary
                        </h2>

                        <dl className="mt-8 space-y-4 font-body">
                            <div className="flex items-center justify-between">
                                <dt className="text-neutral-600">Subtotal</dt>
                                <dd className="text-neutral-900">{formatPrice(subtotal)}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-neutral-600">Shipping</dt>
                                <dd className="text-neutral-900">{shipping.display}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-neutral-300 pt-4">
                                <dt className="font-medium text-neutral-900">Total</dt>
                                <dd className="font-heading text-2xl text-neutral-900">{formatPrice(total)}</dd>
                            </div>
                        </dl>
                        <p className="mt-2 font-body text-xs text-neutral-500">Taxes calculated at checkout.</p>

                        {checkoutError && (
                            <p className="mt-6 font-body text-sm text-primaryRed" role="alert">{checkoutError}</p>
                        )}

                        <button
                            onClick={goToCheckout}
                            disabled={isCheckingOut}
                            type="button"
                            className="group mt-8 inline-flex w-full items-center justify-center gap-3 bg-neutral-900 px-8 py-4 font-body text-xs font-medium uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:bg-primaryRed disabled:opacity-60"
                        >
                            {isCheckingOut ? "Redirecting…" : "Checkout"}
                            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </button>
                        <p className="mt-4 text-center font-body text-xs text-neutral-500">Secure checkout with Stripe</p>
                    </section>
                </div>
            )}
        </div>
    )
}
