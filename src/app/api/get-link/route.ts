// import {LineItem} from "@/types/types";
// import {createPaymentLink} from "@/utils/stripeHelpers";
// import {NextRequest, NextResponse} from "next/server";

// export async function POST(request: NextRequest) {
//     try {

        
//         const body = await request.json();
//         console.log("body: ", body);
        
//         const {items} = body;

//         console.log("items: ", items);
        

//         if (!items || !Array.isArray(items)) {
//             return NextResponse.json(
//                 {error: "Invalid or missing items array"},
//                 {status: 400}
//             );
//         }

//         // Create the payment link
//         const link = await createPaymentLink(items);

//         // Return the payment link
//         console.log("logging reated link");
        
//         return NextResponse.json({url: link.url});
//     } catch (error) {
//         console.error("Error retrieving payment link:", error);

//         // Return an error response
//         return NextResponse.json(
//             {error: "Failed to create payment link"},
//             {status: 500}
//         );
//     }
// }
import {NextRequest, NextResponse} from "next/server";
import {createPaymentLink, createSessionLink} from "@/utils/stripeHelpers";


export async function POST(request: NextRequest) {
    try {
        // Check if the request has a body
        const contentLength = request.headers.get("content-length");
        if (!contentLength || parseInt(contentLength) === 0) {
            return NextResponse.json(
                {error: "Request body is empty"},
                {status: 400}
            );
        }
        const body = await request.json();

        const {items, successUrl, cancelUrl} = body;
        if (!items || !Array.isArray(items)) {
            return NextResponse.json(
                {error: "Invalid or missing 'items' in request body"},
                {status: 400}
            );
        }

        // Create payment link
        const link = await createSessionLink(items, successUrl, cancelUrl);

        return NextResponse.json({url: link}, {status: 200});
    } catch (error) {
        console.error("Error retrieving payment link:", error);
        return NextResponse.json(
            {error: "Failed to create payment link"},
            {status: 500}
        );
    }
}

// export async function POST(request: NextRequest) {
//     try {
//         // Check if the request has a body
//         const contentLength = request.headers.get("content-length");
//         if (!contentLength || parseInt(contentLength) === 0) {
//             return NextResponse.json(
//                 {error: "Request body is empty"},
//                 {status: 400}
//             );
//         }

//         const body = await request.json();
//         console.log("body: ", body);

//         const {items} = body;
//         if (!items || !Array.isArray(items)) {
//             return NextResponse.json(
//                 {error: "Invalid or missing 'items' in request body"},
//                 {status: 400}
//             );
//         }

//         // Create payment link
//         const link = await createPaymentLink(items);
//         console.log("Got link: ", link.url);
        
//         return NextResponse.json({url: link}, {status: 200});
//     } catch (error) {
//         console.error("Error retrieving payment link:", error);
//         return NextResponse.json(
//             {error: "Failed to create payment link"},
//             {status: 500}
//         );
//     }
// }
