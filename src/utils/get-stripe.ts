import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

const stripeProm = require('stripe')

const getStripe = () => {

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!)

    
    if (!stripe){
        return null;
    }
    return stripe
//   if (!stripePromise) {
//     stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
//   }
//   return stripePromise;
};

export default getStripe;