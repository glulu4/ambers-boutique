type Params = Promise<{category: string; productId: string}>;

interface ProductPageProps {
    params: Params;

}

import {getProductById} from "@/utils/stripeHelpers";
import {StripeProductData} from "@/types/types";
import ProductDisplay from "@/components/ProductDisplay";
import Head from "next/head";

// export const dynamic = "force-dynamic"; // Allow dynamic generation of pages

const ProductPage = async ({params}: ProductPageProps) => {
    const resolvedParams = await params; // Await the params if it's a Promise
    const {productId} = resolvedParams;

    const product: StripeProductData | undefined = await getProductById(productId);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <Head>
                <title>{product.name} - Amber&apos;s Boutique</title>
                <meta name="description" content={product.description || ""} />
                <meta property="og:title" content={`${product.name} - Amber's Boutique`} />
                <meta property="og:description" content={product.description || ""} />
                <meta property="og:image" content={product.images[0] || ""} />
                <meta property="og:type" content="product" />
            </Head>
            <ProductDisplay product={product} />
        </div>
    );
};

export default ProductPage;
