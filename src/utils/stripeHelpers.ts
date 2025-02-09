import {LineItem, StripePaymentLinkResponseObj, StripeProductData, StripeProductList} from "@/types/types";
import {getShippingRateId, getStripe} from "./getStripe";
import {capitalizeFirstLetter, formatCurrency} from "./util";
import {get} from "http";

export async function createSessionLink(lineItems: LineItem[], successUrl:string, cancelUrl:string): Promise<string> {
  try {
    const stripe = getStripe();
    if (!stripe) throw new Error("Stripe object is null");

    const shippingRate = getShippingRateId(); // Get your shipping rate ID

    const session = await stripe.checkout.sessions.create({
      success_url: successUrl,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: 'payment',
      cancel_url: cancelUrl,   // Redirect here if canceled
      shipping_options: [
        {
          shipping_rate: shippingRate, // Use your predefined shipping rate ID
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["US", "CA"], // Update for your allowed countries
      },
      automatic_tax: {
        enabled: true, // Enable automatic tax calculations
      },
    });

    return session.url;

  } catch (error) {
    console.log("Error getting session url: ", error);
    throw error;
  }
}

export async function createPaymentLink(lineItems: LineItem[]): Promise<StripePaymentLinkResponseObj> {
  try {
    const stripe = getStripe();
    if (!stripe) throw new Error("Stripe object is null");

    console.log("in helper");
    
    const paymentLink: StripePaymentLinkResponseObj = await stripe.paymentLinks.create({
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB"], // Specify the countries where shipping is available
      },
      automatic_tax: {
        enabled: true,
      },


    });
    console.log("returning: ", paymentLink.url);
    
    return paymentLink;

  } catch (error) {
    console.log("Error: ", error);
    return {} as StripePaymentLinkResponseObj
  }
}

export async function getProductsByCategory(category:string):Promise<StripeProductData[]> {

  const productsByCategory: Record<string, StripeProductData[]> = {};
  
  try {
    const stripe = getStripe();
    if (!stripe) throw new Error("Stripe object is null");
    const productList: StripeProductList = await stripe.products.list({
      expand: ['data.default_price'],
      limit: 100,
    });
    const products: StripeProductData[]  = productList.data;

    for (const product of products){

      // these are set in the stripe dashboard
      const productType:string = product.metadata.type;

      if (productsByCategory[productType]){

        productsByCategory[productType].push(product)
      }
      else{
        productsByCategory[productType] = [product]
      }
    }

    return productsByCategory[category];




  } catch (error) {
    console.log("Error: ", error);
    return []
  }

  
}

export async function getProductById(id: string): Promise<StripeProductData | undefined> {

  try {
    const stripe = getStripe();
    if (!stripe) throw new Error("Stripe object is null");

    const productList = await stripe.products.list({
      expand: ['data.default_price'],
      ids:[id],
      limit:1
    })

    const products: StripeProductData[] = productList.data;
    return products[0];
  } catch (error) {
    console.log("error getting prod by id: ", error);
    
    
  }
  
}

export async function getCategories(): Promise<string[]> {
  try {
    const stripe = getStripe();
    if (!stripe) throw new Error("Stripe object is null");

    // Fetch all products from Stripe
    const productList: StripeProductList = await stripe.products.list({
      expand: ["data.default_price"],
      limit: 100,
    });

    const products: StripeProductData[] = productList.data;

    // Use a Set to store unique categories
    const categories = new Set<string>();

    for (const product of products) {
      const productType: string = product.metadata.type;
      if (productType) {
        categories.add(productType);
      }
    }

    // Convert the Set to an array and return
    return Array.from(categories);

  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}



export async function fetchAllProducts(): Promise<StripeProductList> {

  try {
    const stripe = getStripe();
    if (!stripe) throw new Error("Stripe object is null");

    const products: StripeProductList = await stripe.products.list({
      expand: ['data.default_price'],
      limit: 100,
    });

    return products;
  } catch (error) {
    console.log("Error: ", error);
  
    return {} as StripeProductList
  }


  
}


/**
 * 
 * @returns Map of category -> first 3 items
 */
export async function getProductPerCategory() {

  const productsByCategory: Record<string, StripeProductData[]> = {};
  
  try {
    const stripe = getStripe();
    if (!stripe) throw new Error("Stripe object is null");

    const productList: StripeProductList = await stripe.products.list({
      expand: ['data.default_price'],
      limit: 100,
    });
    const products: StripeProductData[]  = productList.data;

    for (const product of products){

      // these are set in the stripe dashboard
      const productType:string = product.metadata.type;

      if (productsByCategory[productType]){

        // only store 3 items per category
        if (productsByCategory[productType].length === 3) 
          continue;

        productsByCategory[productType].push(product)
      }
      else{
        productsByCategory[productType] = [product]
      }
    }

    return productsByCategory;




  } catch (error) {
    console.log("Error: ", error);
    return {}
  }

  
}

export function getProductType(product: StripeProductData):string{
  return capitalizeFirstLetter(product.metadata.type);
}

export function getProductPrice(product: StripeProductData):string{
  return formatCurrency(product.default_price)
}

export function getProductHref(product: StripeProductData):string{
  return `/${product.metadata.type}/${product.id}`
}

export function getProductImg(product: StripeProductData): string{
  return product.images[0]
}