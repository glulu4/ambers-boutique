
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

