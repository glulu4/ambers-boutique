import AllProductsCta from "@/components/AllProductsCta";
import CategoryProducts from "@/components/CategoryProducts";
import HeroSection from "@/components/landing/HeroSection";
import OurProcess from "@/components/landing/OurProcess";
import {config} from "@/config";

import {StripeProductData} from "@/types/types";
import {getStripe} from "@/utils/getStripe";
import {getAllProducts, getProductPerCategory} from "@/utils/stripeHelpers";
import {get} from "http";
import Head from "next/head";

export const revalidate = 43200;

const Page = async () => {
  const productsByCategory: Record<string, StripeProductData[]> = await getProductPerCategory();



  return (
    <>
      <Head>
        <title>{config.name.name} | {config.name.metadata.description}</title>
      </Head>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10 space-y-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Category Products */}
        <div className="pt-20 sm:pt-24">
          <CategoryProducts productsByCategory={productsByCategory} />
        </div>

        {/* Our Process Section */}
        <OurProcess />

        {/* All Products CTA Section */}
        <div className="mt-20">
          <AllProductsCta />
        </div>
      </div>
    </>
  );
};

export default Page;
