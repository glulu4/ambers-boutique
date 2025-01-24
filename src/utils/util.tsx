import SecondaryText from "@/components/text/SecondaryText";
import {StripePrice} from "@/types/types";
import {Check} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function notifyItemAddedToCart() {


    // toast.success('Added to cart!', {
        
    // });

    toast.custom((t) => (
        <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-md rounded-lg flex items-center ring-1 ring-gray-300 overflow-hidden`}
        >
            {/* Left Section: Icon */}
            <div className="flex items-center justify-center p-4">
                <Check className="text-green-600 w-6 h-6" />
            </div>

            {/* Middle Section: Message */}
            <div className="flex-1 p-4">
                <SecondaryText size="small" className="text-sm font-medium text-gray-800">Added to cart</SecondaryText>
            </div>

            {/* Right Section: Action */}
            <div className="border-l border-gray-200">
                <Link
                    href="/cart"
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-primaryRed hover:text-primaryRedHover focus:outline-none focus:ring-2 focus:ring-primaryRed"
                >
                    View Cart
                </Link>
            </div>
        </div>
    ), {
        duration: 3000,
    });


    // toast.custom((t) => (
    //     <div
    //         className={`${t.visible ? 'animate-enter' : 'animate-leave'
    //             } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    //     >
    //         <div className="flex-1 w-0 p-4 " >
    //             <div className="flex" >
    //                 <div className="flex-shrink-0 pt-0.5 flex items-center justify-center" >
    //                     <Check color="#4BB543"/>

    //                 </div>
    //                 < div className="ml-3 flex-1" >
    //                     <SecondaryText className="text-sm font-medium text-gray-900 pl-5" >
    //                         Added to cart
    //                     </SecondaryText>

    //                 </div>
    //             </div>
    //         </div>
    //         < div className="flex border-l border-gray-200" >
    //             <Link
    //             href="/cart"
    //                 // onClick={() => toast.dismiss(t.id)}
    //                 className="font-body w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primaryRed hover:text-primaryRedHover focus:outline-none focus:ring-2"
    //             >
    //                 View Cart
    //             </Link>
    //         </div>
    //     </div>
    // ),{
    //     duration: 3000,
    // })
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