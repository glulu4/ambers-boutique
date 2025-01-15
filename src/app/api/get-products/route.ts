// /app/api/products/route.ts
import {StripeProductList} from '@/types/types';
import { NextResponse } from 'next/server';

// const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export async function GET() {
  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!)

    if (!stripe) throw new Error("Stripe object is null");
    
    // Fetch products from Stripe
    const products:StripeProductList = await stripe.products.list({ expand: ['data.default_price'] });



    return products;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
