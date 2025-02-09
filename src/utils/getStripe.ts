// export function getStripe(){

//     const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!)
//     return stripe;

// } 

export function getStripe() {
    const stripeSecretKey = process.env.MODE === "live"
        ? process.env.STRIPE_LIVE_SECRET_KEY  // Use live mode key
        : process.env.STRIPE_TEST_SECRET_KEY; // Use test mode key

    if (!stripeSecretKey) {
        throw new Error("Stripe API key is missing. Check your environment variables.");
    }

    const stripe = require('stripe')(stripeSecretKey);
    return stripe;
}


export function getShippingRateId() {
    const shippingRate = process.env.MODE === "live"
        ? process.env.STRIPE_LIVE_SHIPPING_RATE  // Use live mode key
        : process.env.STRIPE_TEST_SHIPPING_RATE; // Use test mode key

    return shippingRate;
}