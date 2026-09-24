import {getProductsByCategoryPaginated} from "@/utils/stripeHelpers";
import ProductCard from "@/components/ProductCard";
import HeaderText from "@/components/text/HeaderText";
import {capitalizeFirstLetter} from "@/utils/util";
import {categories, categoryIntros} from "@/types/categories";
import SecondaryText from "@/components/text/SecondaryText";
import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";

export const revalidate = 300; // Revalidate every 5 min



interface CategoryPageProps {
    params: Promise<{category: string}>;
    searchParams: Promise<{page?: string}>;
}

export const generateStaticParams = async () => {
    return categories.map(category => ({category}));
};

export async function generateMetadata({params, searchParams}: CategoryPageProps): Promise<Metadata> {
    const {category} = await params;
    const {page} = await searchParams;
    const currentPage = Number(page) || 1;
    const name = capitalizeFirstLetter(category);
    return {
        title: `Vintage Button ${name}s`,
        description: `Shop one-of-a-kind vintage ${category}s handcrafted from authentic designer buttons at Amber's Jewelry Boutique. Each piece is unique.`,
        alternates: {
            canonical: currentPage > 1 ? `/${category}?page=${currentPage}` : `/${category}`,
        },
    };
}

const PER_PAGE = 20; // Adjust per your needs

const CategoryPage = async ({params, searchParams}: CategoryPageProps) => {
    const {category} = await params;
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;

    if (!categories.includes(category)) {
        notFound();
    }

    // Fetch filtered and paginated products
    const {products, totalPages} = await getProductsByCategoryPaginated(category, currentPage, PER_PAGE);

    if (!products || products.length === 0) {
        if (currentPage > 1) notFound();
        return <p>No products found in this category.</p>;
    }

    return (
        <div className="py-10">
            <HeaderText as="h1" size="large" className="pb-6 text-left">
                Vintage {capitalizeFirstLetter(category)}s
            </HeaderText>
            <SecondaryText className="max-w-3xl pb-12">
                {categoryIntros[category]}
            </SecondaryText>

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
