
import Image from "next/image";
import HeaderText from "../text/HeaderText";
import SecondaryText from "../text/SecondaryText";

const HeroSection = () => {
    return (
        <section className="flex flex-col-reverse lg:flex-row items-start justify-between gap-10 lg:gap-16 max-h-fit">
            <div className="hidden flex-[0.8] lg:flex max-w-lg lg:max-w-none leading-10 flex-col h-webkit-fill justify-around">

                <HeaderText size="large" className=" leading-10 text-black ">
                    Unique and <br/>
                   Authentic
                    Vintage <br />Designer Jewelry
                </HeaderText>

                <SecondaryText size="large" className="">
                    We take pride in transforming vintage Chanel buttons into timeless pieces of jewelry. Each button carries its own unique history, which we carefully preserve while crafting them into stunning earrings, necklaces, bracelets, and pins. By upcycling these iconic designs, we not only celebrate the legacy of Chanel but also contribute to sustainable fashion. Our pieces are perfect for those who appreciate luxury, authenticity, and one-of-a-kind accessories that tell a story.
                </SecondaryText>
                {/* <a
                    href="#shop"
                    className="text-xl font-body font-medium text-red-700 underline hover:text-gray-700"
                >
                    Shop Now →
                </a> */}
            </div>

            {/* Image Container */}
            <div className="relative w-full  sm:max-w-xl lg:max-w-2xl h-webkit-fill ">
                <Image
                    src="/images/header-image.jpg"
                    alt="Vintage Jewellery"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                />
                
                {/* Overlay for better text visibility on mobile only */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm lg:hidden" />
                {/* Absolute positioned text for mobile only */}
                <div className="absolute inset-0 flex items-center px-4 lg:hidden">
                    <div className="max-w-lg flex flex-col justify-around h-webkit-fill text-center">
                        <HeaderText size="large" className=" text-neutral-200 mb-6 font-semibold">
                            Unique and <br />
                            <span className="italic">Authentic</span> <br />
                            Vintage <span className="italic">Designer</span> Jewellery
                        </HeaderText>
                        {/* <a
                            href="#shop"
                            className="text-xl font-body font-medium text-red-600 underline"
                        >
                            Shop Now →
                        </a> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;