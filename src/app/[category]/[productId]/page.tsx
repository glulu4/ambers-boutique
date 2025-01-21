// // import {getProductById} from "@/utils/stripeHelpers";
// // import {StripeProductData} from "@/types/types";
// // import ProductDisplay from "@/components/ProductDisplay";

// // export const dynamic = "force-dynamic"; // Allow dynamic generation of pages

// // const ProductPage = async ({params}: {params: {category: string; productId: string}}) => {
// //     const {productId} = await params;
    
// //     const product: StripeProductData | undefined = await getProductById(productId);

// //     if (!product) {
// //         return <div>Product not found</div>;
// //     }

// //     return (
// //         <div>
// //             <ProductDisplay product={product}/>
// //         </div>
// //     );
// // };

// // export default ProductPage;
// import {getProductById} from "@/utils/stripeHelpers";
// import {StripeProductData} from "@/types/types";
// import ProductDisplay from "@/components/ProductDisplay";

// export const dynamic = "force-dynamic"; // Allow dynamic generation of pages

// interface ProductPageProps {
//     params: {
//         category: string;
//         productId: string;
//     };
// }

// const ProductPage = async ({params}: ProductPageProps) => {
//     const {productId} = params;

//     // Fetch the product using the productId
//     const product: StripeProductData | undefined = await getProductById(productId);

//     if (!product) {
//         return <div>Product not found</div>;
//     }

//     return (
//         <div>
//             <ProductDisplay product={product} />
//         </div>
//     );
// };

// export default ProductPage;
type Params = Promise<{category: string; productId: string}>;

interface ProductPageProps {
    params: Params;

}

import {getProductById} from "@/utils/stripeHelpers";
import {StripeProductData} from "@/types/types";
import ProductDisplay from "@/components/ProductDisplay";

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
            <ProductDisplay product={product} />
        </div>
    );
};

export default ProductPage;
