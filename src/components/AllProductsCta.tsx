import HeaderText from "./text/HeaderText";
import SecondaryText from "./text/SecondaryText";

export default function AllProductsCta() {
    return (
        <div className="" style={{width: "100%"}}>
            <div  className="px-6 py-12 sm:px-6 sm:py-16 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <HeaderText className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        Didn&apos;t quite find what you were looking for
                    </HeaderText>

                    <div className="mt-10  flex items-center justify-center gap-x-6">
                        <a
                            href="/all-products"
                            className="font-body text-xl rounded-md bg-primaryRed px-3.5 py-2.5 m-10  font-semibold text-white shadow-sm hover:bg-primaryRedHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            Shop all products
                        </a>

                    </div>
                </div>
            </div>
        </div>
    )
}
