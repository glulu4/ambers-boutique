
import {fetchAllProducts, getProductsByCategory} from "@/utils/stripeHelpers";
import ProductCard from "@/components/ProductCard";
import HeaderText from "@/components/text/HeaderText";
import {capitalizeFirstLetter} from "@/utils/util";
import {categories} from "@/types/categories";
import {StripeProductList} from "@/types/types";

// export const dynamic = "force-dynamic"; // Allow dynamic generation of pages


// type Params = Promise<{category: string}>;

// interface CategoryPageProps {
//     params: Params;

// }

// export const generateStaticParams = async () => {

//     return categories.map((category) => ({
//         category, // This will match the `[category]` dynamic segment
//     }));
// };


const Page = async () => {

    // Dynamically fetch products for the category
    const products: StripeProductList = await fetchAllProducts();

    if (!products) {
        return <p>Category not found</p>
    }

    return (
        <div className=" py-10">
            <HeaderText size="large" className=" pb-12 text-left">
                All Products
            </HeaderText>

            {/* Dynamic Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3  xl:grid-cols-4 sm:gap-6 gap-2">
                {products.data.map((product) => (
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

export default Page;
