import CategoryProducts from "@/components/CategoryProducts";
import HeroSection from "@/components/landing/HeroSection";
import HeaderText from "@/components/text/HeaderText";
import SecondaryText from "@/components/text/SecondaryText";
import {StripeProductData, StripeProductList} from "@/types/types";
import {getCategories, getProductPerCategory} from "@/utils/stripeHelpers";



const Page = async () => {

  const productsByCategory: Record<string, StripeProductData[]> = await getProductPerCategory();


  

  return (
    <div className="container mx-auto mb-10">

      <HeroSection />

      <div className="py-20 md:py-48">
        <CategoryProducts productsByCategory={productsByCategory}/>
      </div>


    </div>
  );
};

export default Page;
