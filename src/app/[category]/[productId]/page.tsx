import {getProductById, getProductPrice} from "@/utils/stripeHelpers";
import HeaderText from "@/components/text/HeaderText";
import SecondaryText from "@/components/text/SecondaryText";
import {formatCurrency} from "@/utils/util";
import {StripeProductData, StripeProductResponse} from "@/types/types";
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
        // <div className="container mx-auto py-10">
        //     {/* Product Image */}
        //     <div className="flex flex-col lg:flex-row items-center gap-8">
        //         <div className="relative w-full lg:w-1/2 h-[400px]">
        //             <img
        //                 src={product.images[0]}
        //                 alt={product.name}
        //                 className="object-cover w-full h-full rounded-md"
        //             />
        //         </div>

        //         {/* Product Info */}
        //         <div className="flex-1 space-y-4">
        //             <HeaderText size="large">{product.name}</HeaderText>
        //             <SecondaryText size="medium">{product.description}</SecondaryText>
        //             <p className="text-lg font-semibold text-gray-900">
        //                 {getProductPrice(product)}
        //             </p>
        //             <button className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700">
        //                 Add to Cart
        //             </button>
        //         </div>
        //     </div>
        // </div>
    );
};

export default ProductPage;
