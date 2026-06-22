import AnimatedSection from "../AnimatedSection";
import HeaderText from "../text/HeaderText";

const steps = [
    {
        number: "01",
        title: "Source",
        description:
            "We search the world for authentic vintage buttons and pendants, each carrying its own unique history, character, and charm.",
    },
    {
        number: "02",
        title: "Restore",
        description:
            "Every piece is carefully cleaned and restored by hand, preserving its original beauty while preparing it for its new life as jewelry.",
    },
    {
        number: "03",
        title: "Create",
        description:
            "With precision and care we craft each item into a timeless piece — vintage history transformed into wearable art.",
    },
];

const OurProcess = () => {
    return (
        <div className="border-t border-gray-100 py-24">
            <AnimatedSection>
                <div className="mb-16">
                    <p className="font-accent text-xl text-primaryRed mb-3">How it&apos;s made</p>
                    <HeaderText size="large">Our Process</HeaderText>
                    <div className="mt-4 h-px w-14 bg-primaryRed" />
                </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                {steps.map((step, i) => (
                    <AnimatedSection key={step.number} delay={i * 120}>
                        <div className="flex flex-col gap-4">
                            <span className="font-body text-6xl font-bold leading-none text-gray-100 select-none">
                                {step.number}
                            </span>
                            <div className="h-px w-10 bg-primaryRed" />
                            <h3 className="font-heading text-2xl font-semibold">{step.title}</h3>
                            <p className="font-body leading-relaxed text-gray-600">{step.description}</p>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>
    );
};

export default OurProcess;
