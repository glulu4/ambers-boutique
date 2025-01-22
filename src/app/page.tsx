import AllProductsCta from "@/components/AllProductsCta";
import CategoryProducts from "@/components/CategoryProducts";
import HeroSection from "@/components/landing/HeroSection";
import OurStory from "@/components/OurStory";
import HeaderText from "@/components/text/HeaderText";
import SecondaryText from "@/components/text/SecondaryText";
import Thanks from "@/components/Thanks";
import {StripeProductData, StripeProductList} from "@/types/types";
import {getCategories, getProductPerCategory} from "@/utils/stripeHelpers";



const Page = async () => {

  const productsByCategory: Record<string, StripeProductData[]> = await getProductPerCategory();


  

  return (
    <div className="container mx-auto mb-10 space-y-14">

      <HeroSection />

      <OurStory/>

      <div >
        
        <CategoryProducts productsByCategory={productsByCategory}/>
      </div>

      <div className=" mt-20 rounded-sm">
        <AllProductsCta/>
      </div>


    </div>
  );
};

export default Page;
