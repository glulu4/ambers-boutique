import AnimatedSection from "./AnimatedSection";
import Link from "next/link";

export default function AllProductsCta() {
    return (
        <AnimatedSection>
            <div className="relative overflow-hidden rounded-2xl bg-neutral-900 px-8 py-20 text-center sm:px-16">
                {/* Subtle dot-grid texture */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                {/* Red ambient glow */}
                <div className="absolute -bottom-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-primaryRed/20 blur-3xl pointer-events-none" />

                <div className="relative z-10">
                    <p className="font-accent mb-4 text-2xl text-primaryRed">The Full Collection</p>
                    <h2 className="font-heading mb-5 text-balance text-4xl font-semibold text-white sm:text-5xl">
                        Didn&apos;t quite find what you were looking for?
                    </h2>
                    <p className="font-body mx-auto mb-10 max-w-sm text-base text-gray-400">
                        Browse our complete collection of one-of-a-kind vintage pieces.
                    </p>
                    <Link
                        href="/all-products"
                        className="font-body inline-flex items-center gap-2 rounded-full bg-primaryRed px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primaryRed/25 transition-colors duration-200 hover:bg-primaryRedHover"
                    >
                        Shop all products
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </AnimatedSection>
    );
}
