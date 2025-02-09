import {LineItem, StripePaymentLinkResponseObj, StripeProductData, StripeProductList} from "@/types/types";
import {getShippingRateId, getStripe} from "./getStripe";
import {capitalizeFirstLetter, formatCurrency} from "./util";
import {get} from "http";



export async function getAllProductsPaginated(perPage:number, cursor?: string): Promise<{products: StripeProductData[], nextCursor?: string}> {
  const stripe = getStripe();
  if (!stripe) throw new Error("Stripe object is null");

  // Call Stripe API to get products
  const response = await stripe.products.list({
    limit: perPage, // Fetch 20 products at a time
    expand: ["data.default_price"],
    starting_after: cursor || undefined, // First call doesn't supply cursor
  });

  // Get the last product's ID to use as the next cursor
  const nextCursor = response.has_more ? response.data[response.data.length - 1].id : undefined;

  return {
    products: response.data,
    nextCursor,
  };
}

// export async function getAllProductsPaginated(cursor?: string): Promise<StripeProductData[]> {
//   const stripe = getStripe();
//   if (!stripe) throw new Error("Stripe object is null");

//   let allProducts: StripeProductData[] = [];
//   let hasMore = true;
//   let startingAfter:string = cursor || "";
  

//   while (hasMore) {
//     const productList = await stripe.products.list({
//       expand: ["data.default_price"],
//       limit: 100, // Stripe's max limit per request
//       starting_after: startingAfter || "", // Pagination cursor
//     });

//     allProducts = [...allProducts, ...productList.data];
//     hasMore = productList.has_more;

//     // Move cursor forward
//     if (hasMore) {
//       startingAfter = productList.data[productList.data.length - 1].id;
//     }
//   }

//   return allProducts;
// }



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

export async function getAllProducts(): Promise<StripeProductData[]> {
  try {
    const stripe = getStripe();
    if (!stripe) throw new Error("Stripe object is null");

    let allProducts: StripeProductData[] = [];
    let hasMore = true;
    let startingAfter: string | undefined = undefined;

    while (hasMore) {
      const productList: StripeProductList = await stripe.products.list({
        expand: ["data.default_price"],
        limit: 100,
        starting_after: startingAfter, // Use the last product ID for pagination
      });

      allProducts = [...allProducts, ...productList.data];
      hasMore = productList.has_more;

      if (hasMore) {
        startingAfter = productList.data[productList.data.length - 1].id; // Get last product ID
      }
    }

    return allProducts;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

export async function getProductsByCategory(category:string):Promise<StripeProductData[]> {

  const productsByCategory: Record<string, StripeProductData[]> = {};
  
  try {
    const stripe = getStripe();
    if (!stripe) throw new Error("Stripe object is null");
    // const productList: StripeProductList = await stripe.products.list({
    //   expand: ['data.default_price'],
    //   limit: 100,
    // });
    // const products: StripeProductData[]  = productList.data;
    const products: StripeProductData[] = await getAllProducts();


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

export async function getProductsByCategoryPaginated(category: string, page: number = 1, perPage: number = 20): Promise<{products: StripeProductData[], totalPages: number}> {
  const stripe = getStripe();
  if (!stripe) throw new Error("Stripe object is null");

  // Fetch all products at once
  const allProducts: StripeProductData[] = await getAllProducts();

  // Filter only products matching the requested category
  const filteredProducts = allProducts.filter((product) => product.metadata.type === category);

  // Paginate manually
  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const paginatedProducts = filteredProducts.slice((page - 1) * perPage, page * perPage);

  return {
    products: paginatedProducts,
    totalPages,
  };
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



/**
 * 
 * @returns Map of category -> first 3 items
 */
export async function getProductPerCategory() {

  const productsByCategory: Record<string, StripeProductData[]> = {};
  
  try {
    const stripe = getStripe();
    if (!stripe) throw new Error("Stripe object is null");

    // const productList: StripeProductList = await stripe.products.list({
    //   expand: ['data.default_price'],
    //   limit: 100,
    // });
    // const products: StripeProductData[]  = productList.data;
    const products: StripeProductData[] = await getAllProducts();


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