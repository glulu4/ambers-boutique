import AllProductsCta from "@/components/AllProductsCta";
import CategoryProducts from "@/components/CategoryProducts";
import HeroSection from "@/components/landing/HeroSection";
import OurProcess from "@/components/landing/OurProcess";
import {config} from "@/config";

import {StripeProductData, StripeProductList} from "@/types/types";
import {getProductPerCategory} from "@/utils/stripeHelpers";
import Head from "next/head";
const Page = async () => {

  const productsByCategory: Record<string, StripeProductData[]> = await getProductPerCategory();

  return (
    <>

      <Head>
        <title>{config.name.name} | {config.name.metadata.description}</title>
      </Head>
      <div className="container mx-auto mb-10 space-y-14">

        <HeroSection />

        <div className="pt-16">

          <CategoryProducts productsByCategory={productsByCategory} />
        </div>

        <OurProcess />

        <div className=" mt-20 rounded-sm">
          <AllProductsCta />
        </div>


      </div>
    </>

  );
};

export default Page;
