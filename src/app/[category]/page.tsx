
// import {getProductsByCategory} from "@/utils/stripeHelpers";
// import ProductCard from "@/components/ProductCard";
// import HeaderText from "@/components/text/HeaderText";
// import {capitalizeFirstLetter} from "@/utils/util";

// export const dynamic = "force-dynamic"; // Allow dynamic generation of pages

// const CategoryPage = async ({params}: {params: {category: string}}) => {
//     const {category} = await params;

//     // Dynamically fetch products for the category
//     const products = await getProductsByCategory(category);

//     return (
//         <div className="container mx-auto py-10">
//             <HeaderText size="large" className="mb-6 pb-12">{capitalizeFirstLetter(category)}</HeaderText>
//             {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">

//                 {products.map((product) => (
//                     <ProductCard key={product.id} product={product} className="pb-10" />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CategoryPage;
import {getProductsByCategory} from "@/utils/stripeHelpers";
import ProductCard from "@/components/ProductCard";
import HeaderText from "@/components/text/HeaderText";
import {capitalizeFirstLetter} from "@/utils/util";

export const dynamic = "force-dynamic"; // Allow dynamic generation of pages

const CategoryPage = async ({params}: {params: {category: string}}) => {
    const {category} = await params;

    // Dynamically fetch products for the category
    const products = await getProductsByCategory(category);

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
