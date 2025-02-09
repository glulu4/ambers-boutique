
import Image from "next/image";
import HeaderText from "../text/HeaderText";
import SecondaryText from "../text/SecondaryText";

const HeroSection = () => {
    return (
        <section className="flex flex-col-reverse lg:flex-row items-center justify-center lg:items-start lg:justify-between gap-10 lg:gap-16 max-h-fit">



                {/* Text Content */}
                <div className="flex flex-col flex-1 lg:max-w-md space-y-6 lg:space-y-8 h-webkit-fill justify-around">
                    <div className="hidden lg:block">
                        <HeaderText size="large" className="text-black leading-tight">
                            Unique and <br />
                            Authentic Vintage <br />
                            Jewelry
                        </HeaderText>
                    </div>

                    <div className="hidden lg:block">
                        <SecondaryText size="large" className="max-w-2xl">
                            We take pride in transforming vintage buttons into timeless
                            pieces of jewelry. Each button carries its own unique history,
                            which we carefully preserve while crafting them into stunning earrings,
                            necklaces, bracelets, and pins. Our vintage jewelry
                            pieces are perfect for those who appreciate luxury,
                            authenticity, and one-of-a-kind accessories that tell a story.
                        </SecondaryText>
                    </div>
                </div>


            <div className="relative w-full sm:max-w-xl lg:max-w-2xl h-webkit-fill flex items-center justify-center">
                <Image
                    src="/images/header-image.jpg"
                    alt="Vintage Jewelry" 
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
                            Vintage <span className="italic">Designer</span> Jewelry
                        </HeaderText>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
