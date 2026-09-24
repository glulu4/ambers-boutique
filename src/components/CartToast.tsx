"use client";

import Image from "next/image";
import Link from "next/link";
import toast, {type Toast} from "react-hot-toast";
import {StripeProductData} from "@/types/types";
import {getProductImg, getProductPrice} from "@/utils/stripeHelpers";
import {cn} from "@/lib/utils";

const TOAST_DURATION_MS = 3500;

function CartToast({t, product, added}: {t: Toast; product: StripeProductData; added: boolean}) {
    return (
        <div
            className={cn(
                "pointer-events-auto flex w-[22rem] max-w-[calc(100vw-2rem)] items-center gap-4 border border-neutral-200 bg-white p-3 pr-4 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.2)]",
                t.visible ? "animate-toast-in" : "animate-toast-out"
            )}
        >
            <div className="relative size-16 shrink-0 overflow-hidden bg-neutral-100">
                <Image src={getProductImg(product)} alt="" fill sizes="64px" className="object-cover" />
            </div>

            <div className="min-w-0 flex-1">
                <p className={cn(
                    "font-body text-[10px] font-medium uppercase tracking-[0.25em]",
                    added ? "text-primaryRed" : "text-neutral-500"
                )}>
                    {added ? "Added to cart" : "In your cart"}
                </p>
                <p className="mt-1 truncate font-secHeading text-base text-neutral-900">{product.name}</p>
                <p className="font-body text-sm text-neutral-500">{getProductPrice(product)}</p>
            </div>

            <Link
                href="/cart"
                onClick={() => toast.dismiss(t.id)}
                className="shrink-0 font-body text-[10px] font-medium uppercase tracking-[0.25em] text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-primaryRed hover:decoration-primaryRed"
            >
                View cart
            </Link>
        </div>
    );
}

/** Shows a toast after "Add to cart"; `added` is false when the piece was already in the cart. */
export function notifyCartUpdate(product: StripeProductData, added: boolean) {
    toast.custom((t: Toast) => <CartToast t={t} product={product} added={added} />, {
        id: `cart-${product.id}`, // repeated clicks replace the toast instead of stacking
        duration: TOAST_DURATION_MS,
    });
}
