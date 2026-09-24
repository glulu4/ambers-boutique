type Params = Promise<{category: string; productId: string}>;

interface ProductPageProps {
    params: Params;

}

import {getProductById, getProductHref, getProductPrice} from "@/utils/stripeHelpers";
import {StripeProductData} from "@/types/types";
import ProductDisplay from "@/components/ProductDisplay";
import type {Metadata} from "next";
import {notFound, permanentRedirect} from "next/navigation";

// export const dynamic = "force-dynamic"; // Allow dynamic generation of pages

function getProductDescription(product: StripeProductData): string {
    return product.description ||
        `${product.name}, one-of-a-kind jewelry handcrafted from authentic vintage buttons. ${getProductPrice(product)}.`;
}

export async function generateMetadata({params}: ProductPageProps): Promise<Metadata> {
    const {productId} = await params;
    const product = await getProductById(productId);

    if (!product) {
        notFound();
    }

    const description = getProductDescription(product);
    const href = getProductHref(product);
    return {
        title: product.name,
        description,
        alternates: {canonical: href},
        openGraph: {
            title: `${product.name} - Amber's Boutique`,
            description,
            url: href,
            type: "website",
            images: product.images?.[0] ? [product.images[0]] : undefined,
        },
    };
}

const ProductPage = async ({params}: ProductPageProps) => {
    const resolvedParams = await params; // Await the params if it's a Promise
    const {category, productId} = resolvedParams;

    const product: StripeProductData | undefined = await getProductById(productId);

    if (!product) {
        notFound();
    }

    // Serve each product at a single URL: /{its category}/{id}
    if (product.metadata.type !== category) {
        permanentRedirect(getProductHref(product));
    }

    return (
        <div>
            <ProductDisplay product={product} description={getProductDescription(product)} />
        </div>
    );
};

export default ProductPage;
