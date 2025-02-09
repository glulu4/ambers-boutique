
// import {getAllProducts} from "@/utils/stripeHelpers";
// import ProductCard from "@/components/ProductCard";
// import HeaderText from "@/components/text/HeaderText";
// import {StripeProductData} from "@/types/types";
// import Head from "next/head";
// import {config} from "@/config";



// // export const dynamic = "force-dynamic";
// export const revalidate = 300; // Revalidate every 5 minutes
// const Page = async () => {

//     // Dynamically fetch products for the category
//     const products: StripeProductData[] = await getAllProducts();

//     if (!products) {
//         return <p>Category not found</p>
//     }

//     return (
//         <>
//             <Head>
//                 <title>{config.name.name} | {config.name.metadata.description}</title>
//             </Head>

//             <div className=" py-10">
//                 <HeaderText size="large" className=" pb-12 text-left">
//                     All Products
//                 </HeaderText>

//                 {/* Dynamic Grid */}
//                 <div className="grid grid-cols-2 sm:grid-cols-3  xl:grid-cols-4 sm:gap-6 gap-2">
//                     {products.map((product) => (
//                         <ProductCard
//                             key={product.id}
//                             product={product}
//                             className="pb-10"
//                         />
//                     ))}
//                 </div>
//             </div>
//         </>

//     );
// };

// export default Page;


import {getAllProductsPaginated} from "@/utils/stripeHelpers";
import ProductCard from "@/components/ProductCard";
import HeaderText from "@/components/text/HeaderText";
import Head from "next/head";
import {config} from "@/config";
import Link from "next/link";

export const revalidate = 300; // Revalidate every 5 minutes
const PER_PAGE = 20;

const Page = async ({searchParams}: {searchParams: {cursor?: string}}) => {

    // Fetch all products

    const cursor = searchParams.cursor;

    const {products, nextCursor} = await getAllProductsPaginated( PER_PAGE ,cursor);

    return (
        <>
            <Head>
                <title>{config.name.name} | {config.name.metadata.description}</title>
            </Head>

            <div className="py-10">
                <HeaderText size="large" className="pb-12 text-left">
                    All Products
                </HeaderText>

                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 sm:gap-6 gap-2">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} className="pb-10" />
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-8 space-x-4">
                    {cursor  && (
                        <Link href={`?cursor=${cursor}`} className="px-4 py-2 font-body font-semibold bg-primaryRed rounded text-neutral-50">
                            Previous
                        </Link>
                    )}
                    {nextCursor && (
                        <Link href={`?cursor=${nextCursor}`} className="px-4 py-2 font-body font-semibold bg-primaryRed rounded text-neutral-50">
                            Next
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default Page;
