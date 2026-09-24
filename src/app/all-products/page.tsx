
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


import {getAllProducts} from "@/utils/stripeHelpers";
import ProductCard from "@/components/ProductCard";
import HeaderText from "@/components/text/HeaderText";
import SecondaryText from "@/components/text/SecondaryText";
import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";

export const revalidate = 300; // Revalidate every 5 minutes
const PER_PAGE = 20;

interface PageProps {
    searchParams: Promise<{page?: string}>;
}

export async function generateMetadata({searchParams}: PageProps): Promise<Metadata> {
    const {page} = await searchParams;
    const currentPage = Number(page) || 1;
    return {
        title: "All Vintage Jewelry",
        description: "Browse the full collection of unique, authentic vintage jewelry at Amber's Jewelry Boutique: earrings, necklaces, bracelets, rings and pins made from vintage buttons.",
        alternates: {
            canonical: currentPage > 1 ? `/all-products?page=${currentPage}` : "/all-products",
        },
    };
}

const Page = async ({searchParams}: PageProps) => {

    const {page} = await searchParams;
    const currentPage = Number(page) || 1;

    const allProducts = await getAllProducts();
    const totalPages = Math.ceil(allProducts.length / PER_PAGE);
    const products = allProducts.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

    if (currentPage > 1 && products.length === 0) {
        notFound();
    }

    return (
        <>
            <div className="py-10">
                <HeaderText as="h1" size="large" className="pb-6 text-left">
                    All Vintage Jewelry
                </HeaderText>
                <SecondaryText className="max-w-3xl pb-12">
                    Browse our full collection of vintage jewelry, handcrafted from authentic designer buttons. From earrings and necklaces to bracelets, rings, and pins, every piece starts with a single vintage button chosen for its history and character, so no two are ever alike.
                </SecondaryText>

                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 sm:gap-6 gap-2">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} className="pb-10" />
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-8 space-x-4">
                    {currentPage > 1 && (
                        <Link href={`?page=${currentPage - 1}`} className="px-4 py-2 font-body font-semibold bg-primaryRed rounded text-neutral-50">
                            Previous
                        </Link>
                    )}
                    {currentPage < totalPages && (
                        <Link href={`?page=${currentPage + 1}`} className="px-4 py-2 font-body font-semibold bg-primaryRed rounded text-neutral-50">
                            Next
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default Page;
