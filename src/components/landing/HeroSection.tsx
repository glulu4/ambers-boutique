
import Image from "next/image";
import HeaderText from "../text/HeaderText";
import SecondaryText from "../text/SecondaryText";

const HeroSection = () => {
    return (
        <section className="flex flex-col-reverse lg:flex-row items-center justify-center lg:items-start lg:justify-between gap-10 lg:gap-16 max-h-fit">
            <div className="hidden flex-[0.8] lg:flex max-w-lg lg:max-w-none leading-10 flex-col h-webkit-fill justify-around">

                <HeaderText size="large" className=" leading-10 text-black ">
                    Unique and <br/>
                   Authentic
                    Vintage <br />Chanel Jewelry
                </HeaderText>

                <SecondaryText size="large" className="pt-12 sm:pt-24">
                    We take pride in
                    transforming vintage
                    Chanel buttons into timeless
                    pieces of jewelry. Each button
                    carries its own unique history,
                    which we carefully preserve while
                    crafting them into stunning earrings,
                    necklaces, bracelets, and pins.
                    By upcycling these iconic designs,
                    we not only celebrate the legacy
                    of Chanel but also contribute to
                    sustainable fashion. Our vintage Chanel jewelry
                    pieces are perfect for those who appreciate luxury,
                    authenticity, and one-of-a-kind accessories that tell a story.
                </SecondaryText>

            </div>


            <div className="relative w-full sm:max-w-xl lg:max-w-2xl h-webkit-fill flex items-center justify-center">
                <Image
                    src="/images/header-image.jpg"
                    alt="Vintage Chanel Jewelry" 
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                />
                
                {/* Overlay for better text visibility on mobile only */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm lg:hidden" />


                <div className="absolute inset-0 flex items-center justify-center px-4 lg:hidden">
                    <div className="max-w-lg flex flex-col justify-center text-center">
                        <HeaderText size="large" className="text-white mb-6 font-semibold">
                            Unique and <br />
                            <span className="italic">Authentic</span> <br />
                            Vintage <span className="italic">Designer</span> Jewellery
                        </HeaderText>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;