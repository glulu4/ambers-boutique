import ProductCard from "@/components/ProductCard";
import {StripeProductList} from "@/types/types";

async function fetchProducts(): Promise<StripeProductList> {

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

const Page = async () => {



  const products: StripeProductList = await fetchProducts();

  console.log("Data: ", products);
  

  return (
    <div className="container mx-auto px-5 mb-10">
      <div>
        <h1 className="text-3xl">
          Products
        </h1>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.data.map((prod, index) => (
          <ProductCard product={prod} key={index}/>
        ))}
      </div>

    </div>
  );
};

export default Page;
