import {StripePrice} from "@/types/types";
import Link from "next/link";
import toast from "react-hot-toast";

export function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function notifyItemAddedToCart() {
    toast.success('Added to cart!');

    // toast.custom((t) => (
    //     <div
    //         className={`${t.visible ? 'animate-enter' : 'animate-leave'
    //             } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    //     >
    //         <div className="flex-1 w-0 p-4" >
    //             <div className="flex items-start" >
    //                 <div className="flex-shrink-0 pt-0.5" >
    //                     <img
    //                         className="h-10 w-10 rounded-full"
    //                         src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
    //                         alt=""
    //                     />
    //                 </div>
    //                 < div className="ml-3 flex-1" >
    //                     <p className="text-sm font-medium text-gray-900" >
    //                         Emilia Gates
    //                     </p>
    //                     < p className="mt-1 text-sm text-gray-500" >
    //                         Sure! 8: 30pm works great!
    //                     </p>
    //                 </div>
    //             </div>
    //         </div>
    //         < div className="flex border-l border-gray-200" >
    //             <Link
    //             href="/cart"
    //                 // onClick={() => toast.dismiss(t.id)}
    //                 className="font-secHeading w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primaryRed hover:text-primaryRedHover focus:outline-none focus:ring-2"
    //             >
    //                 Cart
    //             </Link>
    //         </div>
    //     </div>
    // ))
}



export const formatCurrency = (defaultPrice: StripePrice | null): string => {
    if (!defaultPrice) {
        return "";
    }

    const amount = defaultPrice.unit_amount;
    const currency = defaultPrice.currency;


    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
        minimumFractionDigits: 2,
    }).format(amount / 100); // Stripe amounts are in cents
};


/**
 * Takes a price in cents and divides it by 100 and returns it nicely
 */
export function formatPrice(price: number) {


    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "usd",
        minimumFractionDigits: 2,
    }).format(price / 100); // Stripe amounts are in cents
}