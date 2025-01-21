import {StripePrice} from "@/types/types";

export function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
export function formatPrice(price:number){


    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "usd",
        minimumFractionDigits: 2,
    }).format(price / 100); // Stripe amounts are in cents
}