import {StripeProductData, StripeProductList, StripeProductResponse} from "@/types/types";
import {getStripe} from "./getStripe";
import {log} from "util";
import {capitalizeFirstLetter, formatCurrency} from "./util";

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
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!)

    if (!stripe) throw new Error("Stripe object is null");
    const products: StripeProductList = await stripe.products.list({expand: ['data.default_price']});

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
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!)
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