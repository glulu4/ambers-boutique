type Params = Promise<{category: string; productId: string}>;

interface ProductPageProps {
    params: Params;

}

import {getProductById} from "@/utils/stripeHelpers";
import {StripeProductData} from "@/types/types";
import ProductDisplay from "@/components/ProductDisplay";
import type {Metadata} from "next";

// export const dynamic = "force-dynamic"; // Allow dynamic generation of pages

export async function generateMetadata({params}: ProductPageProps): Promise<Metadata> {
    const {productId} = await params;
    const product = await getProductById(productId);

    if (!product) {
        return {title: "Product not found"};
    }

    const description = product.description || "";
    return {
        title: product.name,
        description,
        openGraph: {
            title: `${product.name} - Amber's Boutique`,
            description,
            type: "website",
            images: product.images?.[0] ? [product.images[0]] : undefined,
        },
    };
}

const ProductPage = async ({params}: ProductPageProps) => {
    const resolvedParams = await params; // Await the params if it's a Promise
    const {productId} = resolvedParams;

    const product: StripeProductData | undefined = await getProductById(productId);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <ProductDisplay product={product} />
        </div>
    );
};

export default ProductPage;
