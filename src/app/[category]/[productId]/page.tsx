import {getProductById} from "@/utils/stripeHelpers";
import {StripeProductData} from "@/types/types";
import ProductDisplay from "@/components/ProductDisplay";

export const dynamic = "force-dynamic"; // Allow dynamic generation of pages

const ProductPage = async ({params}: {params: {category: string; productId: string}}) => {
    const {productId} = await params;
    
    const product: StripeProductData | undefined = await getProductById(productId);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <ProductDisplay product={product}/>
        </div>
    );
};

export default ProductPage;
