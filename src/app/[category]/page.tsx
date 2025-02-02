
import {getProductsByCategory} from "@/utils/stripeHelpers";
import ProductCard from "@/components/ProductCard";
import HeaderText from "@/components/text/HeaderText";
import {capitalizeFirstLetter} from "@/utils/util";
import {categories} from "@/types/categories";
import Head from "next/head";

export const dynamic = "force-dynamic"; // Allow dynamic generation of pages

// export const revalidate = 86400; 

type Params = Promise<{category: string}>;

interface CategoryPageProps {
    params: Params;

}

export const generateStaticParams = async () => {

    return categories.map((category) => ({
        category, // This will match the `[category]` dynamic segment
    }));
};


const CategoryPage = async ({params}: CategoryPageProps) => {
    const {category} = await params;

    // Dynamically fetch products for the category
    const products = await getProductsByCategory(category);

    if (!products){
        return <p>Category not found</p>
    }

    return (
        <div className=" py-10">

            <Head>
                <title>{capitalizeFirstLetter(category)} - Amber&apos;s Boutique</title>
                <meta name="description" content={`Explore our collection of ${category} at Amber's Boutique.`} />
            </Head>
            <HeaderText size="large" className=" pb-12 text-left">
                {capitalizeFirstLetter(category)}&apos;s
            </HeaderText>

            {/* Dynamic Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3  xl:grid-cols-4 sm:gap-6 gap-2">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        className="pb-10"
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
