import Image from "next/image";
import Link from "next/link";
import HeaderText from "../text/HeaderText";
import SecondaryText from "../text/SecondaryText";

const HeroSection = () => {
    return (
        <section className="flex flex-col-reverse lg:flex-row items-center justify-center lg:items-start lg:justify-between gap-10 lg:gap-16 max-h-fit">

            {/* Desktop text column — staggered entrance */}
            <div className="hidden lg:flex flex-col flex-1 lg:max-w-md space-y-8 h-webkit-fill justify-around">
                <div className="animate-fade-in-left">
                    <HeaderText size="large" className="text-black leading-tight">
                        Unique and <br />
                        Authentic Vintage <br />
                        Jewelry
                    </HeaderText>
                </div>

                <div className="animate-fade-in-left" style={{animationDelay: "180ms"}}>
                    <SecondaryText size="large" className="max-w-2xl">
                        We take pride in transforming vintage buttons into timeless
                        pieces of jewelry. Each button carries its own unique history,
                        which we carefully preserve while crafting them into stunning
                        earrings, necklaces, bracelets, and pins.
                    </SecondaryText>
                </div>

                <div className="animate-fade-in-left" style={{animationDelay: "340ms"}}>
                    <Link
                        href="/all-products"
                        className="group inline-flex items-center gap-2 font-body text-sm font-semibold tracking-wide text-primaryRed transition-colors duration-200 hover:text-primaryRedHover"
                    >
                        Explore the collection
                        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                </div>
            </div>

            {/* Image */}
            <div className="relative w-full sm:max-w-xl lg:max-w-2xl h-[70vh] lg:h-webkit-fill flex items-center justify-center animate-fade-in">
                <Image
                    src="/images/header-image.jpg"
                    alt="Vintage Jewelry"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="rounded-xl object-cover"
                />

                {/* Mobile dark overlay */}
                <div className="absolute inset-0 rounded-xl bg-black/35 backdrop-blur-[1px] lg:hidden" />

                {/* Mobile centered text */}
                <div className="absolute inset-0 flex items-center justify-center px-6 lg:hidden">
                    <div className="flex flex-col items-center text-center animate-fade-in-up">
                        <HeaderText size="large" className="text-white font-semibold mb-5">
                            Unique and <br />
                            <span className="italic">Authentic</span>{" "}
                            Vintage <span className="italic">Designer</span> Jewelry
                        </HeaderText>
                        <Link
                            href="/all-products"
                            className="font-body text-sm font-semibold text-white/80 transition-colors duration-200 hover:text-white"
                        >
                            Explore the collection →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
