
import {getProductsByCategory} from "@/utils/stripeHelpers";
import ProductCard from "@/components/ProductCard";
import HeaderText from "@/components/text/HeaderText";
import {capitalizeFirstLetter} from "@/utils/util";
import {categories} from "@/types/categories";

export const dynamic = "force-dynamic"; // Allow dynamic generation of pages


export const generateStaticParams = async () => {
    // Fetch all categories
    // const categories = await getCategories();

    // Generate an array of params objects for each category
    return categories.map((category) => ({
        category, // This will match the `[category]` dynamic segment
    }));
};


const CategoryPage = async ({params}: {params: {category: string}}) => {
    const {category} = await params;

    // Dynamically fetch products for the category
    const products = await getProductsByCategory(category);

    if (!products){
        return <p>Category not found</p>
    }

    return (
        <div className=" py-10">
            <HeaderText size="large" className=" pb-12 text-left">
                {capitalizeFirstLetter(category)}
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
