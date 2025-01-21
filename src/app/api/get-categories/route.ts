import {getCategories} from "@/utils/stripeHelpers";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    try {
        const categories = await getCategories();
        // Return the categories as JSON in a valid HTTP response
        return NextResponse.json(categories);
    } catch (error) {
        console.error("Error getting categories:", error);
        // Return an empty array or an error message as JSON
        return NextResponse.json({error: "Failed to fetch categories"}, {status: 500});
    }
}
