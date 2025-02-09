
// import {getProductsByCategory} from "@/utils/stripeHelpers";
// import ProductCard from "@/components/ProductCard";
// import HeaderText from "@/components/text/HeaderText";
// import {capitalizeFirstLetter} from "@/utils/util";
// import {categories} from "@/types/categories";
// import Head from "next/head";

// // use this if testing
// // export const dynamic = "force-dynamic"; // Allow dynamic generation of pages


// export const revalidate = 300; // Revalidate every 5 min


// type Params = Promise<{category: string}>;

// interface CategoryPageProps {
//     params: Params;

// }

// export const generateStaticParams = async () => {

//     return categories.map((category) => ({
//         category, // This will match the `[category]` dynamic segment
//     }));
// };


// const CategoryPage = async ({params}: CategoryPageProps) => {
//     const {category} = await params;

//     // Dynamically fetch products for the category
//     const products = await getProductsByCategory(category);

//     if (!products){
//         return <p>Category not found</p>
//     }

//     return (
//         <div className=" py-10">

//             <Head>
//                 <title>{capitalizeFirstLetter(category)} - Amber&apos;s Boutique</title>
//                 <meta name="description" content={`Explore our collection of ${category} at Amber's Boutique.`} />
//             </Head>
//             <HeaderText size="large" className=" pb-12 text-left">
//                 {capitalizeFirstLetter(category)}s
//             </HeaderText>

//             {/* Dynamic Grid */}
//             <div className="grid grid-cols-2 sm:grid-cols-3  xl:grid-cols-4 sm:gap-6 gap-2">
//                 {products.map((product) => (
//                     <ProductCard
//                         key={product.id}
//                         product={product}
//                         className="pb-10"
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CategoryPage;



import {getProductsByCategoryPaginated} from "@/utils/stripeHelpers";
import ProductCard from "@/components/ProductCard";
import HeaderText from "@/components/text/HeaderText";
import {capitalizeFirstLetter} from "@/utils/util";
import {categories} from "@/types/categories";
import Head from "next/head";
import Link from "next/link";

export const revalidate = 300; // Revalidate every 5 min



interface CategoryPageProps {
    params: Promise<{category: string}>;
    searchParams: Promise<{page?: string}>;
}

export const generateStaticParams = async () => {
    return categories.map(category => ({category}));
};

const PER_PAGE = 20; // Adjust per your needs

const CategoryPage = async ({params, searchParams}: CategoryPageProps) => {
    const {category} = await params;
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;

    // Fetch filtered and paginated products
    const {products, totalPages} = await getProductsByCategoryPaginated(category, currentPage, PER_PAGE);

    if (!products || products.length === 0) {
        return <p>No products found in this category.</p>;
    }

    return (
        <div className="py-10">
            <Head>
                <title>{capitalizeFirstLetter(category)} - Amber&apos;s Boutique</title>
                <meta name="description" content={`Explore our collection of ${category} at Amber's Boutique.`} />
            </Head>
            <HeaderText size="large" className="pb-12 text-left">
                {capitalizeFirstLetter(category)}s
            </HeaderText>

            {/* Dynamic Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 sm:gap-6 gap-2">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} className="pb-10" />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 space-x-4">
                {currentPage > 1 && (
                    <Link href={`?page=${currentPage - 1}`} className="px-4 py-2 border font-body font-semibold bg-primaryRed rounded text-neutral-50">
                        Previous
                    </Link>
                )}
                {currentPage < totalPages && (
                    <Link href={`?page=${currentPage + 1}`} className="px-4 py-2 border font-body font-semibold bg-primaryRed rounded text-neutral-50">
                        Next
                    </Link>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
