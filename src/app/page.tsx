import AllProductsCta from "@/components/AllProductsCta";
import CategoryProducts from "@/components/CategoryProducts";
import HeroSection from "@/components/landing/HeroSection";
import OurProcess from "@/components/landing/OurProcess";

import {StripeProductData} from "@/types/types";
import {getProductPerCategory} from "@/utils/stripeHelpers";

export const revalidate = 43200;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["OnlineStore", "JewelryStore"],
  "name": "Amber's Jewelry Boutique",
  "url": "https://www.ambersjewelryboutique.com",
  "description": "Specializing in artisanal repurposed vintage jewelry crafted from sustainable materials and designer vintage elements. Each piece is uniquely transformed into contemporary wearable art.",
  "brand": {
    "@type": "Brand",
    "name": "Amber's Jewelry Boutique",
    "slogan": "Transforming vintage treasures into modern masterpieces"
  },
  "keywords": [
    "repurposed jewelry", "vintage jewelry", "recycled jewelry",
    "upcycled jewelry", "sustainable jewelry", "vintage button jewelry",
    "eco-friendly jewelry", "handmade jewelry", "artisan jewelry",
    "designer button jewelry"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Repurposed Vintage Jewelry Collection",
    "itemListElement": [
      { "@type": "OfferCatalog", "name": "Vintage Button Jewelry", "description": "Elegant jewelry pieces crafted from authentic vintage designer buttons" },
      { "@type": "OfferCatalog", "name": "Upcycled Vintage Pieces", "description": "Contemporary jewelry designs created from carefully sourced vintage materials" }
    ]
  },
  "specialty": ["Repurposed vintage jewelry", "Sustainable jewelry design", "Vintage button transformation", "Custom jewelry pieces"],
  "potentialAction": { "@type": "SearchAction", "target": "https://www.ambersjewelryboutique.com/search?q={search_term_string}", "query-input": "required name=search_term_string" },
  "areaServed": { "@type": "Country", "name": "United States" },
  "priceRange": "$$",
  "paymentAccepted": ["Credit Card", "PayPal"],
  "openingHours": "Mo-Su",
  "sameAs": ["https://www.instagram.com/ambersjewelry.boutique/"]
};

const Page = async () => {
  const productsByCategory: Record<string, StripeProductData[]> = await getProductPerCategory();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
